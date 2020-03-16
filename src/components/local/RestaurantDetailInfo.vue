<template>
  <v-layout
    column
    class="browser-height container grid-list-xl layout flex"
  >
    <v-flex xs8>
      <v-layout class="text-xs-center">
        <material-card class="v-card-profile">
          <v-flex>
            <h2>{{ restaurantInfo.name }}</h2>
          </v-flex>
          <v-card-text>
            <h6 class="category text-gray font-weight-thin mb-3">
              BLANK SPACE
            </h6>
            <h4 class="card-title font-weight-light">
              {{ restaurantInfo.load_address }}
            </h4>
            <p class="card-description font-weight-light">
              <span>{{ restaurantInfo.review_amount }}</span>
              <span>{{ restaurantInfo.rating }}</span>
            </p>
            <v-btn
              outlined
              color="white"
              round
              class="font-weight-light"
              :disabled="isLogined"
              @click="reviewModalOpen()"
            >
              리뷰 쓰기
            </v-btn>
            <v-btn
              color="success"
              round
              class="font-weight-light"
              :disabled="disableBtn(userData)"
              @click="newRecruitmentModalOpen(restaurantInfo)"
            >
              모집글 쓰기
            </v-btn>
          </v-card-text>
        </material-card>
      </v-layout>
      <v-flex xs12>
        <img-slide />            <!-- ADD Imag-slide vue  -->
      </v-flex>
      <material-card
        title="리뷰"
        paging-btn
        @update="updateData"
      >
        <div
          v-if="loading"
          class="loading"
        >
          Loading...
        </div>
        <div v-if="status">
          <review-list
            :items="reviews"
          />        <!-- ADD review list -->
        </div>
      </material-card>
    </v-flex>
    <v-flex xs8>
      <review-modal :restaurant-id="restaurantInfo.restaurant_id" />       <!-- ADD review modal -->
    </v-flex>
    <v-flex xs8>
      <new-recruitment-modal />       <!-- ADD new recruitment modal -->
    </v-flex>
  </v-layout>
</template>
<script>
import ImgSlide from '@/components/local/ImagesSlide.vue'
import ReviewModal from '@/components/local/ReviewModal.vue'
import NewRecruitmentModal from '@/components/local/NewRecruitmentModal.vue'
import ReviewList from '@/components/local/list/ReviewList.vue'
import { restful } from '../../api'
import { urls } from '../../api/requestUrl.js'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  components: {
    'img-slide': ImgSlide,
    'review-modal': ReviewModal,
    'new-recruitment-modal': NewRecruitmentModal,
    'review-list': ReviewList
  },
  props: {
    restaurantInfo: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      userData: {
        type: Array,
        default: null
      },
      reviews: [],
      loading: false,
      status: false,
      reviewListLinks: []
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  created () {
    this.loading = true
    this.fetchData()
    this.loginCheck()
    this.loading = false
    this.status = true
  },
  methods: {
    loginCheck () {
      if (this.userInfo !== null && this.userInfo !== undefined) {
        this.todayUserFetch()
      }
    },
    todayUserFetch () {
      var localDateTime = moment().format('YYYY-MM-DDT00:00:01')
      urls.userRecord.data.localDateTime = localDateTime
      restful
        .fetch(urls.userRecord.method, '/api/member/' + this.userInfo.user.member_id + '/recruitment', urls.userRecord.data)
        .then(data => {
          this.userData = data
        })
        .finally(() => { })
    },
    disableBtn (userData) {
      if (this.userInfo === null || this.userInfo === undefined) return true
      else if (userData.length >= 1) return true
      else return false
    },
    isLogined () {
      return (this.userInfo === null || this.userInfo === undefined)
    },
    reviewModalOpen () {
      if (this.userInfo !== null && this.userInfo !== undefined) {
        this.$store.commit('TOGGLE_REVIEW_MODAL_FLAGE', true)
      }
    },
    newRecruitmentModalOpen (restaurantInfo) {
      if (this.userInfo !== null && this.userInfo !== undefined) {
        this.$router.push({ name: 'RestaurantInfo', params: { RestaurantInfo: restaurantInfo } })
        this.$store.commit('TOGGLE_NEW_RECRUITMENT_MODAL_FLAGE', true)
      }
    },
    fetchData () {
      urls.reviews.data.restaurantId = this.restaurantInfo.restaurant_id
      urls.reviews.data.page = 0
      urls.reviews.data.size = 7
      restful
        .fetch(urls.reviews.method, urls.reviews.path, urls.reviews.data)
        .then(data => {
          console.log('reviews page:')
          console.log(data)
          console.log(data.content)
          console.log(typeof data.content)
          this.reviews = data.content
          this.reviewListLinks = data.links
        })
        .finally(() => {
          urls.reviews.data.restaurantId = null
          urls.reviews.data.page = 0
          urls.reviews.data.size = 5
        })
    },
    updateData (link) {
      for (let i = 0; i < this.reviewListLinks.length; ++i) {
        if (this.reviewListLinks[i].rel === link) {
          restful
            .fetchWithoutData(urls.reviews.method, this.reviewListLinks[i].href, '')
            .then(data => {
              this.reviews = data.content
              this.reviewListLinks = data.links
            })
          break
        }
      }
    }
  }
}
</script>

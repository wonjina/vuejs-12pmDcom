<template>
  <v-layout
    column
    class="browser-height container grid-list-xl layout flex"
  >
    <v-flex xs8>
      <v-layout class="text-xs-center">
        <material-card
          class="v-card-profile"
          @update="updateData"
        >
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
              :disabled="isLogined()"
              @click="reviewModalOpen()"
            >
              리뷰 쓰기
            </v-btn>
            <v-btn
              color="success"
              round
              class="font-weight-light"
              :disabled="disableBtn(userData)"
              @click="newRecruitmentModalOpen()"
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
        :prev-btn="prevBtn"
        :next-btn="nextBtn"
        @update="updateData"
      >
        <div
          v-if="loading"
          class="loading"
        >
          Loading...
        </div>
        <div v-else>
          <review-list
            :items="reviews"
          />        <!-- ADD review list -->
        </div>
      </material-card>
    </v-flex>
    <v-flex xs8>
      <review-modal
        :restaurant-id="restaurantInfo.restaurant_id"
        @updatedReview="reviewsFetchData"
      />       <!-- ADD review modal -->
    </v-flex>
    <v-flex xs8>
      <new-recruitment-modal
        :restaurant-id="restaurantInfo.restaurant_id"
      />       <!-- ADD new recruitment modal -->
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
      reviewListLinks: [],
      prevBtn: false,
      nextBtn: false
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  watch: {
    resListLinks (val) {
      this.prevBtn = false
      this.nextBtn = false
      for (let i = 0; i < this.reviewListLinks.length; ++i) {
        if (this.reviewListLinks[i].rel === 'prev') {
          this.prevBtn = true
        } else if (this.reviewListLinks[i].rel === 'next') {
          this.nextBtn = true
        }
      }
    }
  },
  created () {
    this.reviewsFetchData()
    this.loginCheck()
  },
  methods: {
    loginCheck () {
      if (this.userInfo !== null && this.userInfo !== undefined) {
        this.todayUserFetchData()
      }
    },
    todayUserFetchData () {
      this.loading = true
      var localDateTime = moment().format('YYYY-MM-DDT00:00:01')
      urls.userRecord.data.localDateTime = localDateTime
      var memberId = this.userInfo.user.member_id
      restful.getRequest(urls.userRecord.method, urls.DOMAIN + '/api/member/' + memberId + '/recruitment', urls.userRecord.data)
        .then(result => {
          this.userData = result.data.response.content
        })
        .finally(() => {
          this.loading = false
          urls.userRecord.data.localDateTime = null
        })
    },
    reviewsFetchData () {
      this.loading = true
      urls.reviews.data.restaurantId = this.restaurantInfo.restaurant_id
      console.log(urls.reviews.data)
      restful
        .getRequest(urls.reviews.method, urls.DOMAIN + urls.reviews.path, urls.reviews.data)
        .then(result => {
          console.log('review')
          console.log(result)
          this.reviews = result.data.response.content
          this.reviewListLinks = result.data.response.links
        })
        .catch(result => {
        })
        .finally(() => {
          urls.reviews.data.restaurantId = null
          this.loading = false
        })
    },
    disableBtn (userData) {
      if (this.userInfo === null || this.userInfo === undefined) return true
      else if (userData.length >= 1) return true
      else return false
    },
    isLogined () {
      console.log(this.userInfo)
      console.log(this.userInfo === null)
      if (this.userInfo === null || this.userInfo === undefined) {
        return true
      } else {
        return false
      }
    },
    reviewModalOpen () {
      if (this.userInfo !== null && this.userInfo !== undefined) {
        this.$store.commit('TOGGLE_REVIEW_MODAL_FLAGE', true)
      }
    },
    newRecruitmentModalOpen () {
      if (this.userInfo !== null && this.userInfo !== undefined) {
        this.$store.commit('TOGGLE_NEW_RECRUITMENT_MODAL_FLAGE', true)
      }
    },
    updateData (link) {
      for (let i = 0; i < this.reviewListLinks.length; ++i) {
        if (this.reviewListLinks[i].rel === link) {
          restful
            .getRequest(urls.reviews.method, this.reviewListLinks[i].href + '&restaurantId=' + this.$route.params.id)
            .then(result => {
              this.reviews = result.data.response.content
              this.reviewListLinks = result.data.response.links
            })
          break
        }
      }
    }
  }
}
</script>

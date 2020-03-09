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
              {{ restaurantInfo.category }}
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
        slice-btn
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
      <review-modal />       <!-- ADD review modal -->
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
      reviews: {
        type: Array,
        default: null
      },
      loading: false,
      status: false
    }
  },
  created () {
    this.loading = true
    this.todayUserFetch()
    this.fetchData()
    this.loading = false
    this.status = true
  },
  methods: {
    todayUserFetch () {
      var localDateTime = moment().format('YYYY-MM-DDT00:00:01')
      urls.userRecord.data.localDateTime = localDateTime
      var memberId = 7
      restful
        .fetch(urls.userRecord.method, '/api/member/' + memberId + '/recruitment', urls.userRecord.data)
        .then(data => {
          console.log(data)
          this.userData = data
        })
        .finally(() => { })
    },
    disableBtn (userData) {
      if (userData.length >= 1) return true
      else return false
    },
    reviewModalOpen () {
      this.$store.commit('TOGGLE_REVIEW_MODAL_FLAGE', true)
    },
    newRecruitmentModalOpen (restaurantInfo) {
      this.$router.push({ name: 'RestaurantInfo', params: { RestaurantInfo: restaurantInfo } })
      this.$store.commit('TOGGLE_NEW_RECRUITMENT_MODAL_FLAGE', true)
    },
    fetchData () {
      urls.reviews.data.restaurantId = this.restaurantInfo.restaurant_id
      restful
        .fetch(urls.reviews.method, urls.reviews.path, urls.reviews.data)
        .then(data => {
          this.reviews = data
        })
        .finally(() => {
          urls.reviews.data.restaurantId = null
        })
    }
  }
}
</script>

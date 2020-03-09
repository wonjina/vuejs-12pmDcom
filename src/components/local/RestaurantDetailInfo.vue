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
      reviews: {
        type: Array,
        default: null
      },
      loading: false,
      status: false,
      headers: [
        {
          sortable: false,
          text: 'Name',
          value: 'name'
        },
        {
          sortable: false,
          text: 'Country',
          value: 'country'
        },
        {
          sortable: false,
          text: 'City',
          value: 'city'
        },
        {
          sortable: false,
          text: 'Salary',
          value: 'salary',
          align: 'right'
        }
      ]
    }
  },
  created () {
    this.loading = true
    this.fetchData()
    this.loading = false
    this.status = true
  },
  methods: {
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

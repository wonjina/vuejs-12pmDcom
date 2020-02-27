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
  </v-layout>
</template>
<script>
import ImgSlide from '@/components/local/ImagesSlide.vue'
import ReviewModal from '@/components/local/ReviewModal.vue'
import ReviewList from '@/components/local/list/ReviewList.vue'
import { restful } from '../../api'
import { urls } from '../../api/requestUrl.js'

export default {
  components: {
    'img-slide': ImgSlide,
    'review-modal': ReviewModal,
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
        type: Object,
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
    console.log('detail page->' + this.status + this.loading + this.restaurantInfo.restaurant_id)
    this.loading = true
    console.log('detail page->' + this.status + this.loading)
    this.fetchData()
    this.loading = false
    this.status = true
  },
  methods: {
    reviewModalOpen () {
      this.$store.commit('TOGGLE_REVIEW_MODAL_FLAGE', true)
    },
    fetchData () {
      console.log('fetch data start')
      urls.reviews.data.restaurantId = this.restaurantInfo.restaurant_id
      restful
        .fetch(urls.reviews.method, urls.reviews.path, urls.reviews.data)
        .then(data => {
          console.log('detail page->')
          console.log(data)
          this.reviews = data
        })
        .finally(() => { })
    }
  }
}
</script>

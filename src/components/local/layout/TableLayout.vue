<template>
  <v-flex>
    <v-layout class="custom-margin">
      <v-flex
        class="custom-padding"
        sm6
        xs12
        md6
        lg4
      >
        <material-card
          :active-class="color"
          flat
          full-width
          title="Top Review 5"
        >
          <div
            v-if="loading"
            class="loading"
          >
            Loading...
          </div>
          <div v-if="status">
            <restaurant-list
              link-btn
              :items="topReviewRestaurants"
            />    <!-- Add restaurant table.vue -->
          </div>
        </material-card>
      </v-flex>
      <v-flex
        class="custom-padding"
        sm6
        xs12
        md6
        lg4
      >
        <material-card
          :active-class="color"
          flat
          full-width
          title="Top Rating 5"
        >
          <div
            v-if="loading"
            class="loading"
          >
            Loading...
          </div>
          <div v-if="status">
            <restaurant-list
              link-btn
              :items="topRatingRestaurants"
            />    <!-- Add restaurant table.vue -->
          </div>
        </material-card>
      </v-flex>
      <v-flex
        class="custom-padding"
        sm6
        xs12
        md6
        lg4
      >
        <material-card
          :active-class="color"
          flat
          full-width
          title="Today 모집글"
          @fetchData="recruitBoardFetchData"
        >
          <div
            v-if="loading"
            class="loading"
          >
            Loading...
          </div>
          <div v-if="status">
            <recruit-board-list
              link-btn
              :items="recruitBoard"
            />
          </div>
        </material-card>
      </v-flex>
    </v-layout>
  </v-flex>
</template>
<script>
import TodayRecruitBoard from '@/components/local/list/TodayRecruitBoardList.vue'
import RestaurantList from '@/components/local/list/RestaurantList.vue'
import { restful } from '../../../api'
import { urls } from '../../../api/requestUrl.js'
import moment from 'moment'
import {
  mapState
} from 'vuex'
export default {
  components: {
    'recruit-board-list': TodayRecruitBoard,
    'restaurant-list': RestaurantList
  },
  data () {
    return {
      topRatingRestaurants: [],
      topReviewRestaurants: [],
      recruitBoard: [],
      loading: false,
      status: false,
      paramsRes: {
        page: 0,
        size: 5,
        sortField: null
      }
    }
  },
  computed: {
    ...mapState('app', ['color']),
    color () {
      return this.$store.state.app.color
    }
  },
  created () {
    this.loading = true
    this.topRatingRestaurantFetchData()
    this.topReviewRestaurantFetchData()
    this.recruitBoardFetchData()
    this.loading = false
    this.status = true
  },
  methods: {
    topRatingRestaurantFetchData () {
      this.paramsRes.sortField = 'rating'
      // restful.fetch(urls.restaurants.method, urls.restaurants.path, urls.restaurants.data)
      restful.getRequest(urls.restaurants.method, urls.DOMAIN + urls.restaurants.path, this.paramsRes)
        .then(result => {
          this.topRatingRestaurants = result.data.response.content
        })
        .finally(() => {
          this.paramsRes.sortField = null
        })
    },
    topReviewRestaurantFetchData () {
      urls.restaurants.data.sortField = 'review'
      restful.getRequest(urls.restaurants.method, urls.DOMAIN + urls.restaurants.path, urls.restaurants.data)
        .then(result => {
          this.topReviewRestaurants = result.data.response.content
        })
        .finally(() => {
          this.paramsRes.sortField = null
        })
    },
    recruitBoardFetchData () {
      var localDateTime = moment().format('YYYY-MM-DDT00:00:01')
      urls.recruitBoard.data.localDateTime = localDateTime
      restful
        .getRequest(urls.recruitBoard.method, urls.DOMAIN + urls.recruitBoard.path, urls.recruitBoard.data)
        .then(result => {
          this.recruitBoard = result.data.response.content
        })
        .finally(() => { })
    }
  }
}
</script>
<style>
.custom-margin {
    margin: 35px!important;
}
</style>

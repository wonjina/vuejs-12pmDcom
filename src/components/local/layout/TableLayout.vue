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
          refresh
          title="Top Review 5"
          @fetchData1="restaurantFetchData"
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
              :items="restaurants"
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
          refresh
          title="Top Review 5"
          @fetchData1="restaurantFetchData"
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
              :items="restaurants"
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
          refresh
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
      restaurants: [],
      recruitBoard: [],
      loading: false,
      status: false
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
    this.restaurantFetchData()
    this.recruitBoardFetchData()
    this.loading = false
    this.status = true
  },
  methods: {
    restaurantFetchData () {
      this.setParamsData(0, 5)
      // restful.fetch(urls.restaurants.method, urls.restaurants.path, urls.restaurants.data)
      restful.getRequest(urls.restaurants.method, urls.DOMAIN + urls.restaurants.path, urls.restaurants.data)
        .then(result => {
          this.restaurants = result.data.response.content
        })
        .finally(() => {
          this.setParamsData(0, 7)
        })
    },
    setParamsData (page, size) {
      urls.restaurants.data.page = page
      urls.restaurants.data.size = size
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

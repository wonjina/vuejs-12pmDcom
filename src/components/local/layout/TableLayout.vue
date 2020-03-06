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
            />    <!-- Add restaurant table.vue -->
          </div>
        </material-card>
      </v-flex>
    </v-layout>
  </v-flex>
</template>
<script>
import RecruitBoard from '@/components/local/list/RecruitBoardList.vue'
import RestaurantList from '@/components/local/list/RestaurantList.vue'
import { restful } from '../../../api'
import { urls } from '../../../api/requestUrl.js'
import moment from 'moment'
import {
  mapState
} from 'vuex'
export default {
  components: {
    'recruit-board-list': RecruitBoard,
    'restaurant-list': RestaurantList
  },
  data () {
    return {
      restaurants: {
        type: Array,
        default: []
      },
      recruitBoard: {
        type: Array,
        default: null
      },
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
      restful
        .fetch(urls.restaurants.method, urls.restaurants.path, null)
        .then(data => {
          console.log('tableLayout : restaurantFetach data ->')
          console.log(data)
          this.restaurants = data
        })
        .finally(() => { })
    },
    recruitBoardFetchData () {
      var localDateTime = moment().format('YYYY-MM-DDT00:00:01')
      urls.recruitBoard.data.localDateTime = localDateTime
      restful
        .fetch(urls.recruitBoard.method, urls.recruitBoard.path, urls.recruitBoard.data)
        .then(data => {
          console.log('tableLayout : recruitBoardFetch data ->')
          console.log(data)
          this.recruitBoard = data.content
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

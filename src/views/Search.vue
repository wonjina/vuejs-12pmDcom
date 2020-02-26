<template>
  <v-container fluid>
    <v-layout class="browser-height">
      <material-card
        flat
        full-width
        paging-btn
      >
        <div
          v-if="loading"
          class="loading"
        >
          Loading...
        </div>
        <div v-if="status">
          <table-list
            link-btn
            :items="restaurantList"
          />    <!-- Add restaurant table.vue  -->
        </div>
      </material-card>
      <div class="custom-width">
        <naver-map />  <!-- Add Map.vue -->
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import NaverMap from '@/components/local/NaverMap.vue'
import TableList from '@/components/local/list/TableList.vue'
import { restful } from '../api'
import { urls } from '../api/requestUrl.js'
export default {
  components: {
    'naver-map': NaverMap,
    'table-list': TableList
  },
  props: {
    keyword: {
      type: Object,
      default: () => ([])
    }
  },
  data () {
    return {
      restaurantList: {
        type: Array,
        default: null
      },
      loading: false,
      status: false
    }
  },
  created () {
    this.keyword = this.$route.params.keyword
    console.log('search=')
    console.log(this.keyword)
    this.error = this.post = null
    this.loading = true
    this.fetchData()
    this.loading = false
    this.status = true
  },
  methods: {
    fetchData () {
      restful
        .fetch(urls.restaurantList.method, urls.restaurantList.path, this.keyword)
        .then(data => {
          this.restaurantList = data
        })
        .finally(() => { })
    }
  }
}
</script>

<style>
.mapouter {
  text-align:right;
  height:95%;
  width:100%;
  position: absolute;
}
.gmap_canvas {
  overflow:hidden;
  background:none!important;
  height:100%;
  width:100%;
}
.browser-height {
  height: 90vh;
}
.scroll {
  overflow:scroll;
}
.text-center {
  text-align: center!important;
}
.custom-width {
    width: 100%;
}
</style>

<template>
  <div>
    <v-container fluid>
      <v-layout
        column
        class="container grid-list-xl layout flex"
      >
        <main-banner-component /> <!--Add Main banner.vue  -->
        <table-layout />          <!--Add table layout.vue  -->
        <material-card
          title="카테고리 검색"
        >
          <categories-list /> <!--Add categories List.vue  -->
          <recruit-board-list/>
        </material-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import MainBanner from '@/components/local/MainBanner.vue'
import TableLayout from '@/components/local/layout/TableLayout.vue'
import Categories from '@/components/local/list/CategoriesList.vue'
import { restful } from '../api'
import { urls } from '../api/requestUrl.js'
import {
  mapState
} from 'vuex'

export default {
  components: {
    'main-banner-component': MainBanner,
    'table-layout': TableLayout,
    'categories-list': Categories
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('app', ['color']),
    color () {
      return this.$store.state.app.color
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    complete (index) {
      this.list[index] = !this.list[index]
    },
    fetchData () {
      restful
        .fetch(urls.hiworksUser.method, urls.hiworksUser.path)
        .then(data => {
          console.log('main page -> login & user info get')
          console.log(data)
        })
        .finally(() => { })
    }
  }
}
</script>
<style>
</style>

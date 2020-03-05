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
          <recruit-board-list
            :items="recruitBoard"
          />
        </material-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import MainBanner from '@/components/local/MainBanner.vue'
import TableLayout from '@/components/local/layout/TableLayout.vue'
import Categories from '@/components/local/list/CategoriesList.vue'
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
    console.log('main--------')
    console.log(this.$sessionStorage.get('hiowrksJwtToken'))
    console.log(this.$route)
  },
  methods: {
    complete (index) {
      this.list[index] = !this.list[index]
    }
  }
}
</script>
<style>
</style>

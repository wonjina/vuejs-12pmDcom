<template>
  <div>
    <v-container fluid>
      <v-layout
        column
        class="container grid-list-xl layout flex"
      >
        <main-banner-component /> <!--Add Main banner.vue  -->
        <table-layout />          <!--Add table layout.vue  -->
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import MainBanner from '@/components/local/MainBanner.vue'
import TableLayout from '@/components/local/layout/TableLayout.vue'
import {
  mapState
} from 'vuex'

export default {
  components: {
    'main-banner-component': MainBanner,
    'table-layout': TableLayout
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

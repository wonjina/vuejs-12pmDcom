<template>
  <div>
    <v-tooltip
      v-for="(category,index) in categories"
      :key="category+index"
      top
      content-class="top"
      class="custom-padding"
    >
      <v-btn
        slot="activator"
        outline
        @click="moveSearchPage(category)"
      >
        <v-icon dark>
          {{ category }}
        </v-icon>
      </v-btn>
    </v-tooltip>
  </div>
</template>
<script>
import { restful } from '../../../api'
import { urls } from '../../../api/requestUrl.js'

export default {
  data () {
    return {
      categories: [],
      keyword: {
        type: Object,
        default: null
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      restful
        .fetch(urls.categories.method, urls.categories.path)
        .then(data => {
          this.categories = data.categories
        })
        .finally(() => { })
    },
    moveSearchPage (category) {
      this.$router.push({ name: 'SearchRestaurant', query: { restaurantCategory: category } })
    }
  }
}
</script>
<style>
</style>

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
      >
        <v-icon dark>
          {{ category.categoryName }}
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
      categories: [
        '중국집',
        '한식',
        '일식',
        '베트남',
        '프랑스'
      ]
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
        .finally(() => {

        })
    }
  }
}
</script>
<style>
</style>

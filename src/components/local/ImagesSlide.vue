<template>
  <v-carousel
    hide-delimiters
    height="300px"
    class="custom-size"
  >
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.restaurantImgUrl"
    />
  </v-carousel>
</template>
<script>
import { restful } from '../../api'
import { urls } from '../../api/requestUrl.js'

export default {
  name: 'Carousel',
  data () {
    return {
      items: [],
      resListLinks: []
    }
  },
  created () {
    this.restaurantId = this.$route.params.id
    this.restaurantImgFetchData()
  },
  methods: {
    restaurantImgFetchData () {
      this.setParamsData(0, 10)
      console.log(this.items.url)
      restful.getRequest(urls.restaurantImgs.method, urls.DOMAIN + urls.restaurantImgs.path + '/' + this.restaurantId, urls.restaurantImgs.data)
        .then(result => {
          this.items = result.data.response.content
        })
        .finally(() => {
          this.loading = false
        })
    },
    setParamsData (page, size) {
      urls.restaurantImgs.data.page = page
      urls.restaurantImgs.data.size = size
    }
  }
}
</script>

<style>
.custom-size {
    margin-top:20px;
}
</style>

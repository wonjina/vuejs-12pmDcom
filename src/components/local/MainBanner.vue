<template>
  <v-carousel
    height="300px"
    width="700px"
  >
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      class="fullSizeImg"
      :src="item.restaurantImgUrl"
      reverse-transition="fade-transition"
      @click="moveDetailPage(item.restaurantId)"
    />
  </v-carousel>
</template>
<script>
import { restful } from '../../api'
import { urls } from '../../api/requestUrl.js'

export default {
  data () {
    return {
      items: []
    }
  },
  created () {
    this.getResImgFetchData()
  },
  methods: {
    getResImgFetchData () {
      urls.restaurantImgs.data.restaurantId = this.$route.params.id
      restful.getRequest(urls.restaurantImgs.method, urls.DOMAIN + urls.restaurantImgs.path, urls.restaurantImgs.data)
        .then(result => {
          this.items = result.data.response.content
        })
        .finally(() => {
          urls.restaurantImgs.data.restaurantId = null
        })
    },
    moveDetailPage (restaurantId) {
      this.$router.push({ name: 'RestaurantInfo', params: { id: restaurantId } })
    }
  }
}
</script>
<style>
.fullSizeImg {
  width: auto;
  height: 100%;
}
</style>

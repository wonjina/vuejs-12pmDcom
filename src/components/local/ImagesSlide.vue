<template>
  <div class="card-carousel-wrapper">
    <div
      :disabled="atHeadOfList"
      class="card-carousel--nav__left"
      @click="moveCarousel(-1)"
    />
    <div class="card-carousel">
      <div class="card-carousel--overflow-container">
        <div
          :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}"
          class="card-carousel-cards"
        >
          <div
            v-for="(item, index) in items"
            :key="index"
            class="card-carousel--card"
          >
            <img
              class="fullSizeImg"
              :src="item.restaurantImgUrl"
            >
          </div>
        </div>
      </div>
    </div>
    <div
      :disabled="atEndOfList"
      class="card-carousel--nav__right"
      @click="moveCarousel(1)"
    />
  </div>
</template>
<script>
import '@/styles/local/slide.scss'
import { restful } from '../../api'
import { urls } from '../../api/requestUrl.js'

export default {
  name: 'Carousel',
  data () {
    return {
      currentOffset: 0,
      windowSize: 1,
      paginationFactor: 220,
      items: []
    }
  },
  computed: {
    atEndOfList () {
      return this.currentOffset <= (this.paginationFactor * -1) * (this.items.length - this.windowSize)
    },
    atHeadOfList () {
      return this.currentOffset === 0
    }
  },
  created () {
    this.getResImgFetchData()
  },
  methods: {
    moveCarousel (direction) {
      // Find a more elegant way to express the :style. consider using props to make it truly generic
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor
      }
    },
    getResImgFetchData () {
      urls.restaurantImgs.data.restaurantId = this.$route.params.id
      restful.getRequest(urls.restaurantImgs.method, urls.DOMAIN + urls.restaurantImgs.path, urls.restaurantImgs.data)
        .then(result => {
          this.items = result.data.response.content
        })
        .finally(() => {
          urls.restaurantImgs.data.restaurantId = null
        })
    }
  }
}
</script>
<style>
.fullSizeImg {
  width: 100%;
  height: auto;
  width: 200px;
  height: 150px;
}
</style>

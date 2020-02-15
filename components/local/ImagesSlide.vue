<template>
  <div class="card-carousel-wrapper">
    <div
      :disabled="atHeadOfList"
      class="card-carousel--nav__left"
      @click="moveCarousel(-1)"/>
    <div class="card-carousel">
      <div class="card-carousel--overflow-container">
        <div
          :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}"
          class="card-carousel-cards">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="card-carousel--card">
            <img src="https://placehold.it/200x200">
          </div>
        </div>
      </div>
    </div>
    <div
      :disabled="atEndOfList"
      class="card-carousel--nav__right"
      @click="moveCarousel(1)"/>
  </div>
</template>
<script>
import '@/styles/local/slide.scss'
export default {
  name: 'Carousel',
  data () {
    return {
      currentOffset: 0,
      windowSize: 3,
      paginationFactor: 220,
      items: [
        { name: 'Kin Khao1',
          tag: ['Thai']
        },
        { name: 'Kin Khao2',
          tag: ['Thai2']
        },
        { name: 'Kin Khao3',
          tag: ['Thai3']
        },
        { name: 'Kin Khao4',
          tag: ['Thai4']
        },
        { name: 'Kin Khao4',
          tag: ['Thai4']
        },
        { name: 'Kin Khao4',
          tag: ['Thai4']
        },
        { name: 'Kin Khao4',
          tag: ['Thai4']
        },
        { name: 'Kin Khao4',
          tag: ['Thai4']
        },
        { name: 'Kin Khao4',
          tag: ['Thai4']
        },
        { name: 'Kin Khao4',
          tag: ['Thai4']
        },
        { name: 'Kin Khao4',
          tag: ['Thai4']
        }
      ]
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
  methods: {
    moveCarousel (direction) {
      // Find a more elegant way to express the :style. consider using props to make it truly generic
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor
      }
    }
  }
}
</script>

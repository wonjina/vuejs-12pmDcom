<template>
  <v-carousel height="600px">
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    />
  </v-carousel>
</template>
<script>
export default {
  data () {
    return {
      items: [
        {
          src: '/banner/main/a.jpg'
        },
        {
          src: '/banner/main/b.jpg'
        },
        {
          src: '/banner/main/e.jpg'
        },
        {
          src: '/banner/main/d.jpg'
        },
        {
          src: '/banner/main/f.jpg'
        },
        {
          src: '/banner/main/g.jpg'
        },
        {
          src: '/banner/main/h.jpg'
        },
        {
          src: '/banner/main/i.jpeg'
        },
        {
          src: '/banner/main/k.jpg'
        },
        {
          src: '/banner/main/j.jpg'
        }
      ]
    }
  }
}
</script>
<style>
</style>

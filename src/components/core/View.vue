<template>
  <v-content>
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view :key="this.$route.fullPath + this.$route.query" />
      </v-fade-transition>
    </div>
    <core-footer />
  </v-content>
</template>

<script>
export default {
  metaInfo () {
    return {
      title: '12PM.com'
    }
  }
}
</script>
<style>
.container{
  max-width:100%!important
}
</style>

<template>
  <v-content>
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
    <core-footer v-if="$route.name !== 'Search' && $route.name !== 'RestaurantInfo'" />
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

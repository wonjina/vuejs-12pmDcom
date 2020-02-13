<template>
  <v-container fluid>
    <v-layout class="browser-height">
      <v-flex
        sm6
        xs12
        md6
        lg5
        class="scroll"
      >
        <restaurant-table />    <!-- Add restaurant table.vue -->
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="15"
            :total-visible="6"
          />
        </div>
      </v-flex>
      <div class="custom-width">
        <naver-map />  <!-- Add Map.vue -->
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import NaverMap from '@/components/local/NaverMap.vue'
import RestaurantTable from '@/components/local/list/RestaurantTable.vue'

export default {
  components: {
    'naver-map': NaverMap,
    'restaurant-table': RestaurantTable
  },
  data () {
    return {
      page: 1
    }
  }
}
</script>

<style>
.mapouter {
  text-align:right;
  height:95%;
  width:100%;
  position: absolute;
}
.gmap_canvas {
  overflow:hidden;
  background:none!important;
  height:100%;
  width:100%;
}
.browser-height {
  height: 90vh;
}
.scroll {
  overflow:scroll;
}
.text-center {
  text-align: center!important;
}
.custom-width {
    width: 75%;
}
</style>

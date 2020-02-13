<template>
  <material-card>
    <div
      slot="header"
    >
      <div class="title font-weight-light mb-2">
        카테고리 검색
      </div>
    </div>

    <v-layout
      align-center
      wrap
      class="custom-margin"
    >
      <slot />
    </v-layout>
  </material-card>
</template>
<script>
export default {
}
</script>

<style>
.custom-margin {
   margin: auto!important;
}
.custom-padding {
   padding: 7px;
}
</style>

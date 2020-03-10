<template>
  <v-flex xs8>
    <v-layout class="text-xs-center">
      <material-card class="v-card-profile">
        <v-flex>
          <h2>{{ restaurantInfo.name }}</h2>
        </v-flex>
        <v-card-text>
          <h6 class="category text-gray font-weight-thin mb-3">
            {{ restaurantInfo.category }}
          </h6>
          <h4 class="card-title font-weight-light">
            {{ restaurantInfo.load_address }}
          </h4>
          <p class="card-description font-weight-light">
            <span>{{ restaurantInfo.review_amount }}</span>
            <span>{{ restaurantInfo.rating }}</span>
          </p>
          <v-btn
            outlined
            color="white"
            round
            class="font-weight-light"
            @click="reviewModalOpen()"
          >
            리뷰 쓰기
          </v-btn>
          <v-btn
            color="success"
            round
            class="font-weight-light"
            :disabled="disableBtn(userData)"
            @click="newRecruitmentModalOpen(restaurantInfo)"
          >
            모집글 쓰기
          </v-btn>
        </v-card-text>
      </material-card>
    </v-layout>
  </v-flex>
</template>
<script>
export default {
  props: {
    restaurantInfo: {
      type: Object,
      default: null
    }
  }
}
</script>

<template>
  <v-dialog
    v-model="reviewModalFlage"
    persistent
    width="35%"
  >
    <v-card
      class="elevation-16 mx-auto"
    >
      <v-card-title
        class="headline"
        primary-title
      >
        리뷰 쓰기
      </v-card-title>
      <v-card-text>
        <v-textarea
          solo
          label="리뷰"
        />
      </v-card-text>
      <v-divider />
      <div class="text-xs-center">
        <v-rating v-model="rating" />
      </div>
      <v-card-actions class="justify-space-between">
        <v-btn
          color="black"
          flat
          @click.prevent="TOGGLE_REVIEW_MODAL_FLAGE(false)"
        >
          No Thanks
        </v-btn>
        <v-btn
          color="primary"
          flat
          @click.prevent="TOGGLE_REVIEW_MODAL_FLAGE(false)"
        >
          Rate Now
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState,
  mapMutations } from 'vuex'

export default {
  data: () => ({
    rating: 1
  }),
  computed: {
    ...mapState([
      'reviewModalFlage'
    ]),
    items () {
      return this.$t('Layout.View.items')
    }
  },
  methods: {
    ...mapMutations([
      'TOGGLE_REVIEW_MODAL_FLAGE'
    ])
  }
}
</script>

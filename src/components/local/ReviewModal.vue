<template>
  <v-row justify="center">
    <v-dialog
      v-model="reviewModalFlage"
      persistent
      width="35%">
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
          <v-col
            cols="12"
            md="6">
            <v-textarea
              solo
              name="input-7-4"
              label="리뷰"
            />
          </v-col>
        </v-card-text>
        <v-divider/>
        <div class="text-xs-center">
          <v-rating
            v-model="rating"
            color="yellow darken-3"
            background-color="grey darken-1"
            empty-icon="$vuetify.icons.ratingFull"
            half-increments
            hover
          />
        </div>
        <file-upload/>
        <v-card-actions class="justify-space-between">
          <v-btn
            color="black"
            flat
            @click.prevent="TOGGLE_REVIEW_MODAL_FLAGE(false)">No Thanks</v-btn>
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
  </v-row>
</template>
<script>
import FileUpload from '@/components/local/FileUpload.vue'
import { mapState,
  mapMutations } from 'vuex'

export default {
  components: {
    'file-upload': FileUpload
  },
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

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
          v-model="reviewComment"
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
          @click.prevent="newReview"
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
import { restful } from '../../api'
import { urls } from '../../api/requestUrl.js'
import { exceptionHandler } from '../../api/exceptionHandler.js'
import store from '@/store'
import swal from 'sweetalert'

export default {
  props: {
    restaurantId: {
      type: Number,
      default: null
    }
  },
  data: () => ({
    rating: 1,
    reviewComment: null
  }),
  computed: {
    ...mapState([
      'reviewModalFlage', 'userInfo'
    ]),
    items () {
      return this.$t('Layout.View.items')
    }
  },
  created () {
  },
  methods: {
    ...mapMutations([
      'TOGGLE_REVIEW_MODAL_FLAGE'
    ]),
    newReview () {
      console.log(this.userInfo)
      urls.newReviews.data.restaurantId = this.restaurantId
      urls.newReviews.data.comment = this.reviewComment
      urls.newReviews.data.rating = this.rating
      urls.newReviews.data.memberId = this.userInfo.user.member_id

      restful
        .postRequest(urls.newReviews.method, urls.DOMAIN + urls.newReviews.path, urls.newReviews.data)
        .then(data => {
          swal({
            icon: 'success'
          })
            .then(() => {
              store.state.reviewModalFlage = false
              this.$emit('updatedReview')
            })
        })
        .catch(result => {
          exceptionHandler.catch(result)
        })
        .finally(() => {
          urls.reviews.data.restaurantId = null
          this.rating = 1
          this.reviewComment = null
        })
    }
  }
}
</script>

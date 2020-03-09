<template>
  <v-row justify="center">
    <v-dialog
      v-model="newRecruitmentModalFlage"
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
          새 모집글
        </v-card-title>
        <v-card-text>
          <v-col
            cols="12"
            md="3"
          >
            <v-textarea
              v-model="post"
              label="TEXT"
              rows="1"
            />
          </v-col>
        </v-card-text>
        <div class="text-xs-center">
          <v-overflow-btn
            v-model="maxNum"
            :items="dropdown_num"
            label="참여 인원 수"
          />
        </div>
        <file-upload />
        <v-card-actions class="justify-space-between">
          <v-btn
            color="black"
            flat
            @click.prevent="TOGGLE_NEW_RECRUITMENT_MODAL_FLAGE(false)"
          >
            취소
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click="addNewRecruitment()"
          >
            등록
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapState,
  mapMutations } from 'vuex'
import { restful } from '../../api'
import { urls } from '../../api/requestUrl.js'

export default {
  data () {
    return {
      dropdown_num: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      restaurantInfo: {
        type: Object,
        default: null
      }
    }
  },
  computed: {
    ...mapState([
      'newRecruitmentModalFlage'
    ]),
    items () {
      return this.$t('Layout.View.items')
    }
  },
  created () {
    this.restaurantInfo = this.$route.params.restaurantInfo
  },
  methods: {
    ...mapMutations([
      'TOGGLE_NEW_RECRUITMENT_MODAL_FLAGE'
    ]),
    addNewRecruitment () {
      restful
        .fetch(urls.newRecruitment.method, urls.newRecruitment.path, {
          memberId: 7,
          restaurantId: this.restaurantInfo.restaurant_id,
          subject: this.post,
          maxNumber: this.maxNum
        })
        .then(function (data) {
          // close
        })
        .finally(() => { })
    }
  }
}
</script>

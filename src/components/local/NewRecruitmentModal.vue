<template>
  <v-row justify="center">
    <v-dialog
      v-model="newRecruitmentModalFlage"
      persistent
      width="30%"
    >
      <v-card
        class="elevation-16 mx-auto"
        cols="12"
        md="3"
      >
        <v-card-title
          class="headline"
          primary-title
        >
          새 모집글
        </v-card-title>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-card-text>
            <v-text-field
              v-model="subjectText"
              :counter="30"
              :rules="subjectRules"
              label="제목"
              required
            />
            <v-select
              v-model="maxNum"
              :items="dropdownNum"
              :rules="[v => !!v || '최대 인원 수를 선택하세요.']"
              label="최대 인원 수"
              required
            />
          </v-card-text>
          <v-card-actions class="justify-space-between">
            <v-btn
              color="black"
              flat
              @click.prevent="TOGGLE_NEW_RECRUITMENT_MODAL_FLAGE(false)"
            >
              취소
            </v-btn>
            <v-btn
              :disabled="disable(subjectText, maxNum)"
              color="primary"
              flat
              class="mr-4"
              @click="addNewRecruitment"
            >
              등록
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapState,
  mapMutations } from 'vuex'
import { restful } from '../../api'
import { urls } from '../../api/requestUrl.js'
import swal from 'sweetalert'

export default {
  data () {
    return {
      valid: true,
      subjectText: '',
      subjectRules: [
        v => !!v || '제목을 작성해 주세요.',
        v => (v && v.length >= 5) || '5글자 이상 입력하세요.'
      ],
      maxNum: null,
      dropdownNum: [2, 3, 4, 5, 6, 7, 8, 9, 10],
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
    disable (subjectText, maxNum) {
      if (subjectText === '' || subjectText.length < 5) return true
      else if (maxNum === null) return true
      else return false
    },
    addNewRecruitment () {
      restful
        .dataFetch(urls.newRecruitment.method, urls.newRecruitment.path, {
          memberId: 7,
          restaurantId: this.restaurantInfo.restaurant_id,
          subject: this.subjectText,
          maxNumber: this.maxNum
        })
        .then(function (data) {
          console.log(data)
          swal({
            title: '등록되었습니다.',
            icon: 'success'
          })
            .then(() => {
              location.href = '/recruitBoard'
            })
        })
        .finally(() => { })
    }
  }
}
</script>

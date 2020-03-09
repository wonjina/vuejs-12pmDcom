<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        md12
      >
        <material-card
          title="모집글"
          class="mx-5 mb-5"
        >
          <div
            v-if="loading"
            class="loading"
          >
            Loading...
          </div>
          <h5>제목: {{ recruitBoard.boardSubject }}</h5>
          <p>음식점: {{ recruitBoard.restaurantName }}</p>
          <p>
            참여인원:
            <v-chip
              :color="getColor(recruitBoard.countMember, recruitBoard.maxNumber)"
              dark
            >
              {{ recruitBoard.countMember }}/{{ recruitBoard.maxNumber }}
            </v-chip>
          </p>
          <p>
            <v-chip
              v-for="joinMember in recruitBoard.joinMembers"
              :key="joinMember"
              dark
            >
              <v-avatar left>
                <v-icon>mdi-account-circle</v-icon>
              </v-avatar>
              {{ joinMember.name }} ({{ joinMember.department }})
            </v-chip>
          </p>
          <v-btn
            outlined
            color="success"
            round
            class="font-weight-light"
            type="submit"
            :disabled="disableBtn(recruitBoard, userData)"
            @click="addMember()"
          >
            참여하기
          </v-btn>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { restful } from '../api'
import { urls } from '../api/requestUrl.js'
import swal from 'sweetalert'
import moment from 'moment'

export default {
  data () {
    return {
      recruitBoard: {
        type: Object,
        default: null
      },
      userData: {
        type: Array,
        default: null
      }
    }
  },
  created () {
    this.recruitBoard = this.$route.params.recruitBoardInfo
    this.todayUserFetch()
  },
  methods: {
    getColor (countMember, maxNumber) {
      if (maxNumber - countMember === 0) return 'red'
      else if (maxNumber - countMember === 1) return 'orange'
      else return 'green'
    },
    todayUserFetch () {
      var localDateTime = moment().format('YYYY-MM-DDT00:00:01')
      urls.userRecord.data.localDateTime = localDateTime
      var memberId = 7
      restful
        .fetch(urls.userRecord.method, '/api/member/' + memberId + '/recruitment', urls.userRecord.data)
        .then(data => {
          console.log(data)
          this.userData = data
        })
        .finally(() => { })
    },
    disableBtn (recruitBoard, userData) {
      var today = moment().format('YYYY-MM-DDT00:00:01')
      if (today > recruitBoard.boardDate) return swal('참여 불가', '지난 모집글은 참여가 불가능합니다.', 'error')
      else if (userData.length >= 1) return swal('현재 참여중인 모집글이 존재합니다.', '사용자 페이지를 확인하세요.', 'warning')
      else if (recruitBoard.maxNumber - recruitBoard.countMember === 0) return true
      else return false
    },
    addMember () {
      var boardId = this.recruitBoard.boardId
      var memberId = 7
      restful
        .fetch('post', ('/api/boards/recruitment/' + boardId + '/members/' + memberId))
        .then(data => {
          swal('참여되었습니다.', this.recruitBoard.restaurantName, 'success')
          history.back()
        })
        .finally(() => { })
    }
  }
}
</script>

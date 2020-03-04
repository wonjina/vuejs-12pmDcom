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
            @click="addMember()"
          >
            참여하기
          </v-btn>
          <v-btn
            outlined
            color="red"
            dark
            round
            class="font-weight-light"
            type="submit"
            @click="deleteMember()"
          >
            취소하기
          </v-btn>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { restful } from '../api'
// import { urls } from '../api/requestUrl.js'
import swal from 'sweetalert'

export default {
  data () {
    return {
      recruitBoard: {
        type: Object,
        default: null
      }
    }
  },
  created () {
    this.recruitBoard = this.$route.params.recruitBoardInfo
  },
  methods: {
    getColor (countMember, maxNumber) {
      if (maxNumber - countMember === 0) return 'red'
      else if (maxNumber - countMember === 1) return 'orange'
      else return 'green'
    },
    addMember () {
      console.log('addMember')
      var boardId = this.recruitBoard.boardId
      console.log(this.recruitBoard.boardId)
      var memberId = 7
      restful
        .fetch('post', ('/api/boards/recruitment/' + boardId + '/members/' + memberId))
        .then(data => {
          console.log(data)
        })
        .finally(() => { })
      swal('참여되었습니다.', this.recruitBoard.restaurantName, 'success')
      history.back()
    },
    deleteMember () {
      console.log('deleteMember')
      var boardId = this.recruitBoard.boardId
      var memberId = 7
      restful
        .fetch('delete', ('/api/boards/recruitment/' + boardId + '/members/' + memberId))
        .then(data => {
          console.log(data)
        })
        .finally(() => { })
      swal('취소되었습니다.', this.recruitBoard.restaurantName, 'success')
      history.back()
    }
  }
}
</script>

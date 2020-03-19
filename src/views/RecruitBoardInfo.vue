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
          class="mx-5 mb-3"
        >
          <div
            v-if="loading"
            class="loading"
          >
            Loading...
          </div>
          <div v-else>
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
                v-for="(joinMember , idx) in recruitBoard.joinMembers"
                :key="idx"
                dark
              >
                <v-avatar left>
                  <v-icon>mdi-account-circle</v-icon>
                </v-avatar>
                {{ joinMember.name }}
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
          </div>
        </material-card>
        <GmapMap
          :options="mapOptions"
          :center="{lat: recruitBoard.locationX, lng: recruitBoard.locationY}"
          :zoom="15"
          map-type-id="roadmap"
          class="custom-width2"
        >
          <GmapMarker
            :position="{lat: recruitBoard.locationX, lng: recruitBoard.locationY}"
          />
        </GmapMap>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { restful } from '../api'
import { urls } from '../api/requestUrl.js'
import swal from 'sweetalert'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      recruitBoard: [],
      userData: [],
      mapOptions: {
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false
      },
      loading: false
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  created () {
    this.boardId = this.$route.params.id
    this.detailBoardFetchData()
    this.todayUserFetchData()
  },
  methods: {
    todayUserFetchData () {
      this.loading = true
      var localDateTime = moment().format('YYYY-MM-DDT00:00:01')
      urls.userRecord.data.localDateTime = localDateTime
      var memberId = this.userInfo.user.member_id
      restful.getRequest(urls.userRecord.method, urls.DOMAIN + '/api/member/' + memberId + '/recruitment', urls.userRecord.data)
        .then(result => {
          this.userData = result.data.response.content
          this.resListLinks = result.data.response.links
        })
        .finally(() => {
          this.loading = false
        })
    },
    detailBoardFetchData () {
      this.loading = true
      restful.getRequest(urls.recruitBoard.method, urls.DOMAIN + urls.recruitBoard.path + '/' + this.boardId)
        .then(result => {
          this.recruitBoard = result.data.response
        })
        .finally(() => {
          this.loading = false
        })
    },
    disableBtn (recruitBoard, userData) {
      var today = moment().format('YYYY-MM-DDT00:00:01')
      if (today > recruitBoard.boardDate) {
        swal('참여 불가', '지난 모집글은 참여가 불가능합니다.', 'error')
        return true
      } else if (userData.length >= 1) {
        swal('현재 참여중인 모집글이 존재합니다.', '사용자 페이지를 확인하세요.', 'warning')
        return true
      } else if (recruitBoard.maxNumber - recruitBoard.countMember === 0) return true
      else return false
    },
    addMember () {
      var boardId = this.recruitBoard.boardId
      var memberId = this.userInfo.user.member_id
      restful.getRequest(urls.joinRecruitment.method, urls.DOMAIN + urls.joinRecruitment.path + '/' + boardId + '/members/' + memberId)
        .then(result => {
          swal({
            title: '참여되었습니다.',
            icon: 'success'
          })
            .then(() => {
              location.href = '/RecruitBoard'
            })
        })
        .finally(() => {
        })
    },
    getColor (countMember, maxNumber) {
      if (maxNumber - countMember === 0) return 'red'
      else if (maxNumber - countMember === 1) return 'orange'
      else return 'green'
    }
  }
}
</script>

<style>
.mapouter {
  text-align:right;
  height:50%;
  width:100%;
  position: absolute;
}
.gmap_canvas {
  overflow:hidden;
  background:none!important;
  height:50%;
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
.custom-width2 {
    margin-left:50px;
    margin-right:50px;
    height: 50%;
    width: 93%;
}
</style>

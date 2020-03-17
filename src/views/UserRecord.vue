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
        <v-card
          class="mx-5 mb-5"
          center
        >
          <v-card-text>
            <div />
            <h4 class="font-weight-medium">
              <v-chip
                color="green darken-3"
                label
                dark
              >
                {{ moment().format('MM월 DD일') }}
              </v-chip>
              참여 예정 모집글
            </h4>
            <div />
            <div class="text--primary">
              <user-today-record
                :items="userRecord"
              />
            </div>
          </v-card-text>
        </v-card>
        <material-card
          class="mx-5 mb-5"
          title="나의 참여 기록"
          paging-btn
          @update="updateData"
        >
          <div
            v-if="loading"
            class="loading"
          >
            Loading...
          </div>
          <div v-else>
            <user-record-list
              :items="userRecordList"
            />
          </div>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UserRecordList from '@/components/local/list/UserRecordList.vue'
import UserTodayRecord from '@/components/local/UserTodayRecord.vue'
import { restful } from '../api'
import { urls } from '../api/requestUrl.js'
import { mapState } from 'vuex'
import moment from 'moment'
import swal from 'sweetalert'

export default {
  components: {
    'user-record-list': UserRecordList,
    'user-today-record': UserTodayRecord
  },
  data () {
    return {
      userRecord: [],
      userRecordList: [],
      resListLinks: {
        type: Array,
        default: null
      },
      loading: false,
      status: false
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  created () {
    this.loginCheck()
  },
  methods: {
    moment: function () {
      return moment()
    },
    loginCheck () {
      if (this.userInfo === null || this.userInfo === undefined) {
        swal({
          title: '로그인 후 이용 가능합니다.',
          icon: 'error'
        })
          .then(() => {
            history.back()
          })
      } else {
        this.todayUserFetchData()
        this.userFetchData()
      }
    },
    todayUserFetchData () {
      this.loading = true
      var localDateTime = moment().format('YYYY-MM-DDT00:00:01')
      urls.userRecord.data.localDateTime = localDateTime
      var memberId = this.userInfo.user.member_id
      restful.getRequest(urls.userRecord.method, urls.DOMAIN + '/api/member/' + memberId + '/recruitment', urls.userRecord.data)
        .then(result => {
          this.userRecord = result.data.response.content
          this.resListLinks = result.data.response.links
        })
        .finally(() => {
          this.loading = false
        })
    },
    userFetchData () {
      this.loading = true
      var memberId = this.userInfo.user.member_id
      restful.getRequest(urls.userRecord.method, urls.DOMAIN + '/api/member/' + memberId + '/recruitment')
        .then(result => {
          this.userRecordList = result.data.response.content
          this.resListLinks = result.data.response.links
        })
        .finally(() => {
          this.loading = false
        })
    },
    updateData (link) {
      for (let i = 0; i < this.resListLinks.length; ++i) {
        if (this.resListLinks[i].rel === link) {
          restful
            .fetchWithoutData(urls.recruitBoard.method, this.resListLinks[i].href, '')
            .then(data => {
              this.recruitBoard = data.content
              this.resListLinks = data.links
            })
          break
        }
      }
    }
  }
}
</script>

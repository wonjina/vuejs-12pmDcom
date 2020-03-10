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
        >
          <div
            v-if="loading"
            class="loading"
          >
            Loading...
          </div>
          <div v-if="status">
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
      userRecord: {
        type: Array,
        default: null
      },
      userRecordList: {
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
    this.loading = true
    this.loginCheck()
    this.todayUserFetch()
    this.userFetch()
    this.loading = false
    this.status = true
  },
  methods: {
    moment: function () {
      return moment()
    },
    loginCheck () {
      if (this.userInfo === null) {
        swal({
          title: '로그인 후 이용 가능합니다.',
          icon: 'error'
        })
          .then(() => {
            history.back()
          })
      }
    },
    todayUserFetch () {
      var localDateTime = moment().format('YYYY-MM-DDT00:00:01')
      urls.userRecord.data.localDateTime = localDateTime
      var memberId = this.userInfo.user.member_id
      restful
        .fetch(urls.userRecord.method, '/api/member/' + memberId + '/recruitment', urls.userRecord.data)
        .then(data => {
          this.userRecord = data
        })
        .finally(() => { })
    },
    userFetch () {
      var memberId = this.userInfo.user.member_id
      restful
        .fetch(urls.userRecord.method, '/api/member/' + memberId + '/recruitment')
        .then(data => {
          this.userRecordList = data
        })
        .finally(() => { })
    }
  }
}
</script>

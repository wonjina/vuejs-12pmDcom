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
          class="mx-auto"
          center
        >
          <v-card-text>
            <div />
            <h3>({{ moment().format('MM월 DD일') }}) 참여 예정 모집글</h3>
            <div />
            <div class="text--primary">
              <user-today-record
                :items="userRecord"
              />
            </div>
          </v-card-text>
        </v-card>
        <material-card
          title="나의 기록"
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
import moment from 'moment'

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

  created () {
    this.loading = true
    this.todayUserFetch()
    this.userFetch()
    this.loading = false
    this.status = true
  },
  methods: {
    moment: function () {
      return moment()
    },
    todayUserFetch () {
      var localDateTime = moment().format('YYYY-MM-DDT00:00:01')
      urls.userRecord.data.localDateTime = localDateTime
      var memberId = 7
      restful
        .fetch(urls.userRecord.method, '/api/member/' + memberId + '/recruitment', urls.userRecord.data)
        .then(data => {
          this.userRecord = data
        })
        .finally(() => { })
    },
    userFetch () {
      var memberId = 7
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

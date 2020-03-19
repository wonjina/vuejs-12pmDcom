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
import { mapState } from 'vuex'
import UserRecordList from '@/components/local/list/UserRecordList.vue'
import UserTodayRecord from '@/components/local/UserTodayRecord.vue'
import { restful } from '../api'
import { urls } from '../api/requestUrl.js'
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
      boardListLinks: [],
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
    if (this.userInfo === null || this.userInfo === undefined) {
      swal({
        title: '로그인이 필요합니다.',
        icon: 'error'
      })
      this.$router.push({ name: 'main' })
    }
    this.todayUserFetchData()
    this.userFetchData(urls.DOMAIN + '/api/member/' + this.userInfo.user.member_id + '/recruitment', urls.userRecord.data)
  },
  methods: {
    moment: function () {
      return moment()
    },
    todayUserFetchData () {
      this.loading = true
      urls.todayRecord.data.localDateTime = moment().format('YYYY-MM-DDT00:00:01')
      var memberId = this.userInfo.user.member_id
      restful.getRequest(urls.todayRecord.method, urls.DOMAIN + '/api/member/' + memberId + '/recruitment', urls.todayRecord.data)
        .then(result => {
          this.userRecord = result.data.response.content
        })
        .finally(() => {
          this.loading = false
          urls.todayRecord.data.localDateTime = null
        })
    },
    userFetchData (url, data) {
      this.loading = true
      this.setParamsData(0, 4, null)
      restful.getRequest(urls.userRecord.method, url, data)
        .then(result => {
          this.userRecordList = result.data.response.content
          this.boardListLinks = result.data.response.links
        })
        .finally(() => {
          this.setParamsData(0, 5, null)
          this.loading = false
        })
    },
    updateData (link) {
      for (let i = 0; i < this.boardListLinks.length; ++i) {
        if (this.boardListLinks[i].rel === link) {
          this.userFetchData(this.boardListLinks[i].href)
          break
        }
      }
    },
    setParamsData (page, size, localDateTime) {
      urls.userRecord.data.page = page
      urls.userRecord.data.size = size
      urls.userRecord.data.localDateTime = localDateTime
    }
  }
}
</script>

<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
    >
      <template
        slot="items"
        slot-scope="{ item }"
      >
        <td>{{ item.restaurantName }}</td>
        <td>{{ item.boardSubject }}</td>
        <td>
          <v-chip
            v-for="(joinMember , idx) in item.joinMembers"
            :key="idx"
            dark
            outline
          >
            {{ joinMember.name }}
          </v-chip>
        </td>
        <td
          v-if="linkBtn"
          class="text-xs-right"
        >
          <v-btn
            outlined
            color="red"
            dark
            round
            class="font-weight-light"
            type="submit"
            @click="deleteMember(item.boardId)"
          >
            취소하기
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        현재 참여 중인 모집글이 없습니다.
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { restful } from '../../api'
import { urls } from '../../api/requestUrl.js'
import swal from 'sweetalert'
import { mapState } from 'vuex'

export default {
  props: {
    items: {
      type: Array,
      default: null
    },
    linkBtn: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      headers: [
        {
          sortable: false,
          text: '음식점',
          value: 'restaurantName'
        },
        {
          sortable: false,
          text: '제목',
          value: 'boardSubject'
        },
        {
          sortable: false,
          text: '참여 예정 멤버',
          value: 'joinMembers'
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    deleteMember (boardId) {
      var memberId = this.userInfo.user.member_id
      restful.getRequest(urls.leaveRecruitment.method, urls.DOMAIN + urls.leaveRecruitment.path + '/' + boardId + '/members/' + memberId)
        .then(result => {
          swal({
            title: '취소되었습니다.',
            icon: 'success'
          })
            .then(() => {
              location.href = '/recruitBoard'
            })
        })
        .finally(() => {
        })
    }
  }
}
</script>

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
            v-for="joinMember in item.joinMembers"
            :key="joinMember"
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
            @click="deleteMember(item.boardId, item.restaurantName)"
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
import swal from 'sweetalert'
import { mapState } from 'vuex'

export default {
  props: {
    items: {
      type: Object,
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
    deleteMember (boardId, restaurantName) {
      var memberId = this.userInfo.user.member_id
      restful
        .fetch('delete', ('/api/boards/recruitment/' + boardId + '/members/' + memberId))
        .then(data => {
          swal({
            title: '취소되었습니다.',
            icon: 'success'
          })
            .then(() => {
              location.href = '/userRecord'
            })
        })
        .finally(() => { })
    }
  }
}
</script>

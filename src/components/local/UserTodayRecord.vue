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
    </v-data-table>
  </div>
</template>

<script>
import { restful } from '../../api'
import swal from 'sweetalert'

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
  methods: {
    deleteMember (boardId, restaurantName) {
      var memberId = 7
      restful
        .fetch('delete', ('/api/boards/recruitment/' + boardId + '/members/' + memberId))
        .then(data => {
          swal('취소되었습니다.', restaurantName, 'success')
          history.go(0)
        })
        .finally(() => { })
    }
  }
}
</script>

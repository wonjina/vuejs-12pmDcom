<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="dateFormat"
      hide-actions
    >
      <template
        slot="items"
        slot-scope="{ item }"
      >
        <td>{{ item.boardDate }}</td>
        <td>{{ item.restaurantName }}</td>
        <td>{{ item.boardSubject }}</td>
        <td>
          <v-chip
            :color="getColor(item)"
            dark
          >
            {{ item.countMember }}/{{ item.maxNumber }}
          </v-chip>
        </td>
        <td
          v-if="linkBtn"
          class="text-xs-right"
        >
          <v-btn
            slot="activator"
            class="v-btn--simple"
            color="success"
            icon
            @click="moveRecruitBoardInfo(item)"
          >
            <v-icon color="primary">
              mdi-arrow-right-bold
            </v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from 'moment'
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
      default: false
    }
  },
  data () {
    return {
      headers: [
        {
          sortable: false,
          text: '날짜',
          value: 'boardDate'
        },
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
          text: '인원',
          value: 'countMember'
        }
      ],
      today: null
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ]),
    dateFormat () {
      return this.items.map((board) => {
        board.boardDate = this.$moment(board.boardDate).format('YYYY-MM-DD')
        return board
      })
    }
  },
  created () {
    this.today = moment().format('YYYY-MM-DD')
  },
  methods: {
    getColor (item) {
      console.log(item.boardDate)
      console.log(this.today)
      if (this.today > item.boardDate) {
        return 'gray'
      } else if (item.maxNumber - item.countMember === 0) {
        return 'red'
      } else if (item.maxNumber - item.countMember === 1) {
        return 'orange'
      } else {
        return 'green'
      }
    },
    moveRecruitBoardInfo (recruitBoard) {
      if (this.userInfo !== null && this.userInfo !== undefined) {
        this.$router.push({ name: 'RecruitBoardInfo', params: { id: recruitBoard.boardId, recruitBoardInfo: recruitBoard } })
      } else {
        swal({
          title: '로그인 후 이용 가능합니다.',
          icon: 'error'
        })
      }
    }
  }
}
</script>

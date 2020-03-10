<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :pagination.sync="pagination"
      item-key="items.key"
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
      pagination: {
        sortBy: 'boardDate',
        descending: true,
        rowsPerPage: 25
      },
      headers: [
        {
          sortable: true,
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
      ]
    }
  },
  created () { },
  methods: {
    getColor (item) {
      var today = moment().format('YYYY-MM-DDT00:00:01')
      if (today > item.boardDate) return 'gray'
      else if (item.maxNumber - item.countMember === 0) return 'red'
      else if (item.maxNumber - item.countMember === 1) return 'orange'
      else return 'green'
    },
    moveRecruitBoardInfo (recruitBoard) {
      this.$router.push({ name: 'RecruitBoardInfo', params: { recruitBoardInfo: recruitBoard.boardId } })
    }
  }
}
</script>

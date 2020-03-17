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
      <template slot="no-data">
        오늘 작성된 모집글이 없습니다.
      </template>
    </v-data-table>
  </div>
</template>

<script>

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
          text: '음식점',
          value: 'restaurantName'
        },
        {
          sortable: false,
          text: '제목',
          value: 'boardSubject'
        },
        {
          sortable: true,
          text: '인원',
          value: 'countMember'
        }
      ]
    }
  },
  created () { },
  methods: {
    getColor (item) {
      if (item.maxNumber - item.countMember === 0) return 'red'
      else if (item.maxNumber - item.countMember === 1) return 'orange'
      else return 'green'
    },
    moveRecruitBoardInfo (recruitBoard) {
      this.$router.push({ name: 'RecruitBoardInfo', params: { id: recruitBoard.boardId, recruitBoardInfo: recruitBoard } })
    }
  }
}
</script>

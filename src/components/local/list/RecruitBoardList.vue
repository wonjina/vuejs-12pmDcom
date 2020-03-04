<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
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
            :color="getColor(item.countMember, item.maxNumber)"
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
    getColor (countMember, maxNumber) {
      if (maxNumber - countMember === 0) return 'red'
      else if (maxNumber - countMember === 1) return 'orange'
      else return 'green'
    },
    moveRecruitBoardInfo (recruitBoard) {
      this.$router.push({ name: 'RecruitBoardInfo', params: { recruitBoardInfo: recruitBoard } })
    }
  }
}
</script>

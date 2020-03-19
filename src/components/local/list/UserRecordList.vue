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
            v-for="(joinMember , idx) in item.joinMembers"
            :key="idx"
            dark
            outline
          >
            {{ joinMember.name }}
          </v-chip>
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
          text: '참여 멤버',
          value: 'joinMembers'
        }
      ]
    }
  },
  computed: {
    dateFormat () {
      return this.items.map((item) => {
        item.boardDate = this.$moment(item.boardDate).format('YYYY-MM-DD')
        return item
      })
    }
  }
}
</script>

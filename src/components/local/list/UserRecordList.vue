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
            v-for="joinMember in item.joinMembers"
            :key="joinMember"
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
  created () { },
  methods: {
  }
}
</script>

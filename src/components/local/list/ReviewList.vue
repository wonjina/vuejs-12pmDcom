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
        <td>{{ item.comment }}</td>
        <td>{{ item.rating }}</td>
        <td>{{ item.dateTime }}</td>
        <td>{{ item.department }}</td>
        <td>{{ item.writer }}</td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Object,
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
          text: '커맨트',
          value: 'Comment'
        },
        {
          sortable: false,
          text: '평점',
          value: 'rating'
        },
        {
          sortable: false,
          text: '작성일',
          value: 'date'
        },
        {
          sortable: false,
          text: '부서',
          value: 'department'
        },
        {
          sortable: false,
          text: '작성자',
          value: 'writer'
        }
      ]
    }
  }
}
</script>

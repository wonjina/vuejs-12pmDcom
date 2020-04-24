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
        <td v-if="true">
          {{ item.comment }}
        </td>
        <td v-else>
          {{ item.rating }}
        </td>
        <td class="customFontSize">
          {{ item.date }}
        </td>
        <td class="customFontSize">
          {{ item.writer }}
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
      default: false
    }
  },
  data () {
    return {
      headers: [
        {
          sortable: false,
          text: '커맨트'
        },
        {
          sortable: false,
          text: '평점'
        },
        {
          sortable: false,
          text: '작성일'
        },
        {
          sortable: false,
          text: '작성자'
        }
      ]
    }
  },
  computed: {
    dateFormat () {
      return this.items.map((item) => {
        item.date = this.$moment(item.date).format('YYYY-MM-DD')
        return item
      })
    }
  }
}
</script>
<style>
.customFontSize {
  font-size: 1em!important;
}
</style>

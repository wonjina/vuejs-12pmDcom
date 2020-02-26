<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items.slice(0, 20)"
      hide-actions
    >
      <template
        slot="items"
        slot-scope="{ item }"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.category }}</td>
        <td>{{ item.rating }}</td>
        <td
          v-if="linkBtn"
          class="text-xs-right"
        >
          <v-btn
            slot="activator"
            class="v-btn--simple"
            color="success"
            icon
            @click="moveRestaurantInfo(item)"
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
      default: false
    }
  },
  data () {
    return {
      headers: [
        {
          sortable: false,
          text: '가게이름',
          value: 'Name'
        },
        {
          sortable: false,
          text: '리뷰',
          value: 'Review'
        },
        {
          sortable: false,
          text: '평점',
          value: 'Star'
        }
      ]
    }
  },
  created () { },
  methods: {
    moveRestaurantInfo (restaurant) {
      this.$router.push({ name: 'RestaurantInfo', params: { restaurantInfo: restaurant } })
    }
  }
}
</script>

<template>
  <v-flex>
    <v-layout class="custom-margin">
      <v-flex
        class="custom-padding"
        sm6
        xs12
        md6
        lg4
      >
        <material-card
          :active-class="color"
          flat
          full-width
          title="Top Review 5"
        >
          <restaurant-table />    <!-- Add restaurant table.vue -->
        </material-card>
      </v-flex>
      <v-flex
        class="custom-padding"
        sm6
        xs12
        md6
        lg4
      >
        <material-card
          :active-class="color"
          flat
          full-width
          title="Top Review 5"
        >
          <restaurant-table />    <!-- Add restaurant table.vue -->
        </material-card>
      </v-flex>
      <v-flex
        class="custom-padding"
        sm6
        xs12
        md6
        lg4
      >
        <material-card
          :active-class="color"
          flat
          title="Top Review 5"
        >
          <v-data-table
            :headers="headers"
            :items="items.slice(0, 7)"
            hide-actions
          >
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.review }}</td>
              <td>{{ item.star }}</td>
              <td class="text-xs-right">
                <v-btn
                  slot="activator"
                  class="v-btn--simple"
                  color="success"
                  icon
                >
                  <v-icon color="primary">
                    mdi-arrow-right-bold
                  </v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-flex>
</template>
<script>

import RestaurantTable from '@/components/local/list/RestaurantTable.vue'

import {
  mapState
} from 'vuex'

export default {
  components: {
    'restaurant-table': RestaurantTable
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
      ],
      items: [
        {
          name: 'Dakota Rice',
          review: '344',
          star: '3.1',
          url: ''
        },
        {
          name: 'Dakota Rice',
          review: '344',
          star: '3.1',
          url: ''
        }, {
          name: 'Dakota Rice',
          review: '344',
          star: '3.1',
          url: ''
        }, {
          name: 'Dakota Rice',
          review: '344',
          star: '3.1',
          url: ''
        }, {
          name: 'Dakota Rice',
          review: '344',
          star: '3.1',
          url: ''
        }
      ]
    }
  },
  computed: {
    ...mapState('app', ['color']),
    color () {
      return this.$store.state.app.color
    }
  }
}
</script>
<style>
.custom-margin {
    margin: 35px!important;
}
</style>

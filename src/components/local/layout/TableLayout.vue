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
          refresh
          title="Top Review 5"
          @fetchData="fetchData"
        >
          <div
            v-if="loading"
            class="loading"
          >
            Loading...
          </div>
          <div v-if="status">
            <table-list
              link-btn
              :items="restaurants"
            />    <!-- Add restaurant table.vue -->
          </div>
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
          refresh
          title="Top Review 5"
          @fetchData="fetchData"
        >
          <div
            v-if="loading"
            class="loading"
          >
            Loading...
          </div>
          <div v-if="status">
            <table-list
              link-btn
              :items="restaurants"
            />    <!-- Add restaurant table.vue -->
          </div>
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
import TableList from '@/components/local/list/TableList.vue'
import { restful } from '../../../api'
import { urls } from '../../../api/requestUrl.js'
import {
  mapState
} from 'vuex'
export default {
  components: {
    'table-list': TableList
  },
  data () {
    return {
      restaurants: {
        type: Array,
        default: null
      },
      loading: false,
      status: false,
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
  },
  created () {
    this.loading = true
    this.fetchData()
    this.loading = false
    this.status = true
  },
  methods: {
    fetchData () {
      console.log('fetchData start...')
      restful
        .fetch(urls.restaurantList.method, urls.restaurantList.path)
        .then(data => {
          this.restaurants = data
        })
        .finally(() => { })
    }
  }
}
</script>
<style>
.custom-margin {
    margin: 35px!important;
}
</style>

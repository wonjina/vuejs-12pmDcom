<template>
  <v-container fluid>
    <v-layout class="browser-height">
      <v-flex
        sm6
        xs12
        md6
        lg3
        class="scroll"
      >
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
            <td>{{ item.review }}</td>
            <td>{{ item.star }}</td>
            <td class="text-xs-right">
              <v-btn
                slot="activator"
                class="v-btn--simple"
                color="success"
                icon
              >
                <v-icon color="primary">mdi-arrow-right-bold</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="15"
            :total-visible="6"
          />
        </div>
      </v-flex>
      <map-component/>  <!-- Add Map.vue -->
    </v-layout>
  </v-container>
</template>

<script>
import Map from '@/components/local/Map.vue'

export default {
  components: {
    'map-component': Map
  },
  data () {
    return {
      page: 1,
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
          name: 'Dakota Ric08e',
          review: '344',
          star: '3.1',
          url: ''
        }, {
          name: 'Dakota Ric09e',
          review: '344',
          star: '3.1',
          url: ''
        }, {
          name: 'Dakota Ric00e',
          review: '344',
          star: '3.1',
          url: ''
        }, {
          name: 'Dakota Ric0e',
          review: '344',
          star: '3.1',
          url: ''
        }, {
          name: 'Dakota Ric9e',
          review: '344',
          star: '3.1',
          url: ''
        }, {
          name: 'Dakota Ric8e',
          review: '344',
          star: '3.1',
          url: ''
        }, {
          name: 'Dakota Ric7e',
          review: '344',
          star: '3.1',
          url: ''
        }, {
          name: 'Dakota Ric6e',
          review: '344',
          star: '3.1',
          url: ''
        }, {
          name: 'Dakota Ric5e',
          review: '344',
          star: '3.1',
          url: ''
        }, {
          name: 'Dakota Rice4',
          review: '344',
          star: '3.1',
          url: ''
        }, {
          name: 'Dakota Rice3',
          review: '344',
          star: '3.1',
          url: ''
        }, {
          name: 'Dakota Rice2',
          review: '344',
          star: '3.1',
          url: ''
        }, {
          name: 'Dakota Ric1e',
          review: '344',
          star: '3.1',
          url: ''
        }
      ]
    }
  }
}
</script>

<style>
.mapouter {
  text-align:right;
  height:95%;
  width:100%;
  position: absolute;
}
.gmap_canvas {
  overflow:hidden;
  background:none!important;
  height:100%;
  width:100%;
}
.browser-height {
  height: 90vh;
}
.scroll {
  overflow:scroll;
}
.text-center {
  text-align: center!important;
}
</style>

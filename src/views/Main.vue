<template>
  <div>
    <v-container fluid>
      <v-layout column>
        <main-banner-component/> <!--Add Main banner.vue  -->
        <v-flex>
          <v-layout
            column
            class="container grid-list-xl layout flex">
            <v-flex xs8>
              <v-layout>
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
                            <v-icon color="primary">mdi-arrow-right-bold</v-icon>
                          </v-btn>
                        </td>
                      </template>
                    </v-data-table>
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
                            <v-icon color="primary">mdi-arrow-right-bold</v-icon>
                          </v-btn>
                        </td>
                      </template>
                    </v-data-table>
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
                            <v-icon color="primary">mdi-arrow-right-bold</v-icon>
                          </v-btn>
                        </td>
                      </template>
                    </v-data-table>
                  </material-card>
                </v-flex>
              </v-layout>
              <categories-component/>   <!--Add BlockArrangeList.vue  -->
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

import BlockArrangeList from '@/components/local/BlockArrangeList.vue'
import MainBanner from '@/components/local/MainBanner.vue'
import {
  mapState
} from 'vuex'

export default {
  components: {
    'categories-component': BlockArrangeList,
    'main-banner-component': MainBanner
  },
  data () {
    return {
      dailySalesChart: {
        data: {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
            [12, 17, 7, 17, 23, 18, 38]
          ]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dataCompletedTasksChart: {
        data: {
          labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
          series: [
            [230, 750, 450, 300, 280, 240, 200, 190]
          ]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {
        data: {
          labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

          ]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0]
              }
            }
          }]
        ]
      },
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
      ],
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false
      }
    }
  },
  computed: {
    ...mapState('app', ['image', 'color']),
    color () {
      return this.$store.state.app.color
    }
  },
  methods: {
    complete (index) {
      this.list[index] = !this.list[index]
    }
  }
}
</script>
<style>
#core-view {
  padding-bottom: 100px;
}
</style>

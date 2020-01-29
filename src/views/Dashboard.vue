<template>
  <div>
    <v-container fluid>
      <v-layout column>
        <v-layout class="theme--light v-sheet container">
          <v-flex>
            <div class="display-2 text-xs-center">
              <h2>Target : 12:00 PM</h2>
              <h2>NOW : 11:00 AM</h2>
            </div>
          </v-flex>
        </v-layout>
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
                    color="green"
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
                    color="green"
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
                    color="green"
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
              </v-layout>
              <material-card color="green">
                <div
                  slot="header"
                >
                  <div class="title font-weight-light mb-2">카테고리 검색</div>
                </div>

                <v-layout
                  align-center
                  wrap
                >
                  <v-tooltip
                    v-for="(icon,index) in icons"
                    :key="icon+index"
                    top
                    content-class="top">
                    <v-btn
                      slot="activator"
                    >
                      <img
                        src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
                        style="height: 50px; width: 50px;"
                      >
                    </v-btn>
                    <span>{{ icon }}</span>
                  </v-tooltip>
                </v-layout>
              </material-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
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
      icons: [
        '중국집',
        '한식',
        '돈까스',
        '카페',
        '기타',
        '일식',
        '베트남',
        '프랑스',
        'mdi-backup-restore',
        'mdi-badminton',
        'mdi-access-point-network',
        'mdi-account',
        'mdi-account-alert',
        'mdi-account-box',
        'mdi-account-box-multiple',
        'mdi-backburger',
        'mdi-backspace',
        'mdi-backup-restore',
        'mdi-access-point-network',
        'mdi-account',
        'mdi-account-alert',
        'mdi-account-box',
        'mdi-account-box-multiple',
        'mdi-backburger',
        'mdi-backspace',
        'mdi-backup-restore'
      ],
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false
      }
    }
  },
  methods: {
    complete (index) {
      this.list[index] = !this.list[index]
    }
  }
}
</script>

<style lang="scss">
  .custom-padding{
    padding: 10px;
  }
</style>

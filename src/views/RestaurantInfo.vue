<template>
  <v-container fluid>
    <v-layout>
      <v-flex
        sm6
        xs12
        md6
        lg3
        class="scroll"
      >
        <v-layout
          column
          class="container grid-list-xl layout flex">
          <v-flex xs8>
            <v-layout>
              <material-card class="v-card-profile">
                <v-avatar
                  slot="offset"
                  class="mx-auto d-block content_align round"
                  size="130"
                  color="success"
                >
                  <span>가게 이름</span>
                </v-avatar>
                <v-card-text class="text-xs-center">
                  <h6 class="category text-gray font-weight-thin mb-3">카테고리</h6>
                  <h4 class="card-title font-weight-light">도로명 주소 쓸 공간~~</h4>
                  <p class="card-description font-weight-light">
                    <span>리뷰 21</span>
                    <span>평점 4.0</span>
                  </p>
                  <v-btn
                    color="success"
                    round
                    class="font-weight-light"
                  >리뷰 쓰기</v-btn>
                  <v-btn
                    color="success"
                    round
                    class="font-weight-light"
                  >모집글 쓰기</v-btn>
                </v-card-text>
              </material-card>
            </v-layout>
            <v-flex xs12>
              <img-slide/>
            </v-flex>
            <material-card color="green">
              <div
                slot="header"
              >
                <div class="title font-weight-light mb-2">리뷰</div>
              </div>

              <v-layout
                align-center
                wrap
              >
                <v-data-table
                  :headers="headers"
                  :items="items.slice(0, 7)"
                  hide-actions
                  class="custom-grid-12"
                >
                  <template
                    slot="headerCell"
                    slot-scope="{ header }"
                  >
                    <span
                      class="subheading font-weight-light text--darken-3"
                      v-text="header.text"
                    />
                  </template>
                  <template
                    slot="items"
                    slot-scope="{ item }"
                  >
                    <td>{{ item.name }}</td>
                    <td>{{ item.country }}</td>
                    <td>{{ item.city }}</td>
                    <td class="text-xs-right">{{ item.salary }}</td>
                  </template>
                </v-data-table>
              </v-layout>
            </material-card>
          </v-flex>
        </v-layout>
      </v-flex>

      <map-component/>
    </v-layout>
  </v-container>
</template>

<script>
import Map from '@/components/local/Map.vue'
import ImgSlide from '@/components/local/ImagesSlide.vue'

// position: relative;
export default {
  components: {
    'map-component': Map,
    'img-slide': ImgSlide
  },
  data: () => ({
    settings: [
      {
        'centerMode': true,
        'centerPadding': '20px',
        'focusOnSelect': true,
        'infinite': true,
        'slidesToShow': 3,
        'speed': 500
      }
    ],
    headers: [
      {
        sortable: false,
        text: 'Name',
        value: 'name'
      },
      {
        sortable: false,
        text: 'Country',
        value: 'country'
      },
      {
        sortable: false,
        text: 'City',
        value: 'city'
      },
      {
        sortable: false,
        text: 'Salary',
        value: 'salary',
        align: 'right'
      }
    ],
    items: [
      {
        name: 'Dakota Rice',
        country: 'Niger',
        city: 'Oud-Tunrhout',
        salary: '$35,738'
      },
      {
        name: 'Minerva Hooper',
        country: 'Curaçao',
        city: 'Sinaai-Waas',
        salary: '$23,738'
      }, {
        name: 'Sage Rodriguez',
        country: 'Netherlands',
        city: 'Overland Park',
        salary: '$56,142'
      }, {
        name: 'Philip Chanley',
        country: 'Korea, South',
        city: 'Gloucester',
        salary: '$38,735'
      }, {
        name: 'Doris Greene',
        country: 'Malawi',
        city: 'Feldkirchen in Kārnten',
        salary: '$63,542'
      }, {
        name: 'Mason Porter',
        country: 'Chile',
        city: 'Gloucester',
        salary: '$78,615'
      }
    ]
  })
}
</script>
<style>
.v-card-profile, .custom-grid-12{
  width: 100%;
}
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
.content_align {
  line-height:130px;
}
.slick-slider {
  position: relative;
}
.scroll {
  overflow:scroll;
}
</style>

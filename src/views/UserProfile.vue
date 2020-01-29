<template>
  <v-container fluid>
    <v-layout>
      <v-flex
        sm6
        xs12
        md6
        lg3
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

      <v-flex
        sm6
        xs12
        md6
        lg9
      >
        <div class="mapouter">
          <div class="gmap_canvas">
            <iframe
              id="gmap_canvas"
              width="100%"
              height="100%"
              src="https://maps.google.com/maps?q=google&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
            />
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
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
.v-card-profile, span{
  width: 100%;
}
.mapouter {
  text-align:right;
  height:100%;
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
</style>

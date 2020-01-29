<template>
  <v-container fluid>
    <v-layout>
      <v-flex
        class=""
        sm6
        xs12
        md6
        lg3
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
      </v-flex>
      <v-flex
        class=""
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
  }
}
</script>

<style>
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
</style>

<template>
  <v-layout
    column
    class="browser-height container grid-list-xl layout flex"
  >
    <v-flex xs8>
      <v-layout class="text-xs-center">
        <material-card class="v-card-profile">
          <v-flex>
            <h2>가게 이름 들어갑니다!</h2>
          </v-flex>
          <v-card-text>
            <h6 class="category text-gray font-weight-thin mb-3">
              카테고리
            </h6>
            <h4 class="card-title font-weight-light">
              도로명 주소 쓸 공간~~
            </h4>
            <p class="card-description font-weight-light">
              <span>리뷰 21</span>
              <span>평점 4.0</span>
            </p>
            <v-btn
              outlined
              color="white"
              round
              class="font-weight-light"
              @click="reviewModalOpen()"
            >
              리뷰 쓰기
            </v-btn>
            <v-btn
              color="success"
              round
              class="font-weight-light"
            >
              모집글 쓰기
            </v-btn>
          </v-card-text>
        </material-card>
      </v-layout>
      <v-flex xs12>
        <img-slide />            <!-- ADD Imag-slide vue  -->
      </v-flex>
      <material-card
        title="리뷰"
        slice-btn
      >
        <table-list />        <!-- ADD table list -->
      </material-card>
    </v-flex>
    <v-flex xs8>
      <review-modal />       <!-- ADD review modal -->
    </v-flex>
  </v-layout>
</template>
<script>
import ImgSlide from '@/components/local/ImagesSlide.vue'
import ReviewModal from '@/components/local/ReviewModal.vue'
import TableList from '@/components/local/list/TableList.vue'
export default {
  components: {
    'img-slide': ImgSlide,
    'review-modal': ReviewModal,
    'table-list': TableList
  },
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
  }),
  methods: {
    reviewModalOpen () {
      this.$store.commit('TOGGLE_REVIEW_MODAL_FLAGE', true)
    }
  }
}
</script>

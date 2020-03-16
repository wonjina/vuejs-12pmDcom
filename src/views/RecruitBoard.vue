<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        md12
      >
        <material-card
          title="모집 게시판"
          class="mx-5 mb-5"
          paging-btn
          @update="updateData"
        >
          <div
            v-if="loading"
            class="loading"
          >
            Loading...
          </div>
          <div v-if="status">
            <recruit-board-list
              link-btn
              :items="recruitBoard"
            />
          </div>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RecruitBoard from '@/components/local/list/RecruitBoardList.vue'
import { restful } from '../api'
import { urls } from '../api/requestUrl.js'

export default {
  components: {
    'recruit-board-list': RecruitBoard
  },
  data () {
    return {
      recruitBoard: {
        type: Array,
        default: null
      },
      resListLinks: {
        type: Array,
        default: null
      },
      loading: false,
      status: false
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
      restful
        .fetch(urls.recruitBoard.method, urls.recruitBoard.path)
        .then(data => {
          this.recruitBoard = data.content
          this.resListLinks = data.links
        })
        .finally(() => {
          urls.recruitBoard.page = 0
          urls.recruitBoard.size = 5
        })
    },
    updateData (link) {
      for (let i = 0; i < this.resListLinks.length; ++i) {
        if (this.resListLinks[i].rel === link) {
          restful
            .fetchWithoutData(urls.recruitBoard.method, this.resListLinks[i].href, '')
            .then(data => {
              this.recruitBoard = data.content
              this.resListLinks = data.links
            })
          break
        }
      }
    }
  }
}
</script>

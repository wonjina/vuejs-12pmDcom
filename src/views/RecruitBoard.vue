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
          <div v-else>
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
      recruitBoard: [],
      resListLinks: [],
      loading: false,
      status: false
    }
  },
  created () {
    this.recruitBoardFetchData(urls.DOMAIN + urls.recruitBoard.path, urls.recruitBoard.data)
  },
  methods: {
    recruitBoardFetchData (url, data) {
      this.setParamsData(0, 6, null)
      restful.getRequest(urls.recruitBoard.method, url, data)
        .then(result => {
          this.recruitBoard = result.data.response.content
          this.resListLinks = result.data.response.links
        })
        .finally(() => {
          this.loading = false
        })
    },
    updateData (link) {
      for (let i = 0; i < this.resListLinks.length; ++i) {
        if (this.resListLinks[i].rel === link) {
          this.recruitBoardFetchData(this.resListLinks[i].href)
          break
        }
      }
    },
    setParamsData (page, size, localDateTime) {
      urls.recruitBoard.data.page = page
      urls.recruitBoard.data.size = size
      urls.recruitBoard.data.localDateTime = localDateTime
    }
  }
}
</script>

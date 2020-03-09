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
          text="Here is a subtitle for this table"
        >
          <div
            v-if="loading"
            class="loading"
          >
            Loading...
          </div>
          <div v-if="status">
            <recruit-board-list
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
        })
        .finally(() => { })
    }
  }
}
</script>

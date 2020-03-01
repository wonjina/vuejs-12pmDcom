<template>
  <v-menu
    :close-on-content-click="false"
    bottom
    left
    min-width="300"
    max-width="300"
    nudge-left="12"
    offset-x
    transition="slide-y-transition"
  >
    <v-btn
      slot="activator"
      class="elevation-0"
      color="grey"
      dark
      fab
      fixed
      style="top: 150px;"
      top
    >
      <v-icon>mdi-settings</v-icon>
    </v-btn>
    <v-card>
      <v-container grid-list-xl>
        <v-layout wrap>
          <v-flex xs12>
            <div class="text-xs-center body-2 text-uppercase sidebar-filter">
              Sidebar Filters
            </div>

            <v-layout justify-center>
              <v-avatar
                v-for="(c,index) in colors"
                :key="index+c"
                :class="[c === color ? 'color-active color-' + c: 'color-' + c]"
                size="23"
                @click="setColor(c)"
              />
            </v-layout>
            <v-divider class="mt-3" />
          </v-flex>
          <v-flex xs12>
            <div class="text-xs-center body-2 text-uppercase">
              <v-row justify="center">
                <v-time-picker
                  v-model="picker"
                  header-color="grey"
                  readonly
                  ampm-in-title
                  width="250px"
                />
              </v-row>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-menu>
</template>

<script>
// Utilities
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  data: () => ({
    colors: [
      'purple',
      'info',
      'success',
      'warning',
      'red'
    ],
    picker: '14:00'
  }),
  computed: {
    ...mapState('app', ['color']),
    color () {
      return this.$store.state.app.color
    }
  },
  created () {
    var self = this
    setInterval(function () {
      let today = new Date()
      let hours = today.getHours()
      let minutes = today.getMinutes()
      self.picker = hours + ':' + minutes
    }, 60000)
  },
  methods: {
    ...mapMutations('app', ['setColor']),
    setColor (color) {
      this.$store.state.app.color = color
    }
  }
}
</script>

<style lang="scss">
  .v-avatar,
  .v-responsive {
    cursor: pointer;
  }
</style>

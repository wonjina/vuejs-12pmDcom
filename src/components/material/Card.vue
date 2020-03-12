<template>
  <v-card
    v-bind="$attrs"
    :style="styles"
    v-on="$listeners"
  >
    <helper-offset
      v-if="hasOffset"
      :inline="inline"
      :full-width="fullWidth"
      :offset="offset"
    >
      <v-card
        v-if="!$slots.offset"
        :color="color"
        :class="`elevation-${elevation}`"
        class="v-card--material__header"
        dark
      >
        <slot
          v-if="!title && !text"
          name="header"
        />
        <span
          v-else
          class="horizon-arr"
        >
          <button
            v-if="refresh"
            @click="clickRefresh"
          >
            <v-icon color="white">
              mdi-autorenew
            </v-icon>
          </button>
          <h4
            class="title font-weight-light mb-2"
            v-text="title"
          />
          <p
            class="category font-weight-thin"
            v-text="text"
          />
        </span>
      </v-card>
      <slot
        v-else
        name="offset"
      />
    </helper-offset>

    <v-card-text>
      <slot />
      <v-flex
        v-if="sliceBtn"
        xs12
        class="text-xs-center"
      >
        <v-btn
          class="ma-2 ghost-button"
          outlined
          color="white"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-flex>
      <div
        v-if="pagingBtn"
        class="text-center"
      >
        <v-flex
          align-center
          layout
          py-2
        >
          <v-btn
            slot="activator"
            class="v-btn--simple"
            color="success"
            @click="prevSearchList"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn
            slot="activator"
            class="v-btn--simple"
            color="success"
            @click="nextSearchList"
          >
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </v-flex>
      </div>
    </v-card-text>

    <v-divider
      v-if="$slots.actions"
      class="mx-3"
    />

    <v-card-actions v-if="$slots.actions">
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script>
import { restful } from '../../api'
import { urls } from '../../api/requestUrl.js'
import {
  mapState
} from 'vuex'
export default {
  inheritAttrs: false,
  props: {
    elevation: {
      type: [Number, String],
      default: 10
    },
    inline: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    offset: {
      type: [Number, String],
      default: 24
    },
    title: {
      type: String,
      default: undefined
    },
    text: {
      type: String,
      default: undefined
    },
    refresh: {
      type: Boolean,
      default: false
    },
    sliceBtn: {
      type: Boolean,
      default: false
    },
    pagingBtn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      page: 1
    }
  },
  computed: {
    ...mapState('app', ['color']),
    color () {
      return this.$store.state.app.color
    },
    hasOffset () {
      return this.$slots.header ||
        this.$slots.offset ||
        this.title ||
        this.text
    },
    styles () {
      if (!this.hasOffset) return null
      return {
        marginBottom: `${this.offset}px`,
        marginTop: `${this.offset * 2}px`
      }
    }
  },
  methods: {
    clickRefresh () {
      this.$emit('fetchData')
    },
    prevSearchList () {
      this.$emit('update', 'prev')
    },
    nextSearchList () {
      this.$emit('update', 'next')
    },
    fetchData (data) {
      restful
        .fetch(urls.restaurants.method, urls.restaurants.path, data)
        .then(data => {
          this.restaurantList = data.content
          this.resListLinks = data.links
        })
    }
  }
}
</script>

<style lang="scss">
  .v-card--material {
    &__header {
      &.v-card {
        border-radius: 4px;
      }
    }
  }
.horizon-arr{
  display: flex;
}
</style>

<template>
  <div class="most-popular">
    <div class="most-popular__heading">
      <h3 class="most-popular__heading_heading-h3">
        Most Popular
      </h3>
    </div>
    <div
      v-for="(item, index) in articles"
      :key="index"
      class="most-popular_item"
    >
      <div class="most-popular_item_number">
        <span
          class="most-popular_item_number_span-number"
          v-text="index+1+'.'"
        >
        </span>
      </div>
      <div class="most-popular_item_detail">
        <nuxt-link :to="'/'+item.slug">
          <p
            class="most-popular_item_detail_p-detail"
            v-text="decodeTitle(truncate(item.title, 100))"
          >
          </p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import _$truncate from 'lodash/truncate'
import he from 'he'

export default {
  name: 'trendingcomponent',
  props: {
    count: {
      type: Number,
      required: true
    },
    articles: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      errorMessage: {}
    }
  },
  methods: {
    truncate (item, length) {
      return _$truncate(item, {
        'length': length
      })
    },

    decodeTitle (title) {
      return he.decode(title)
    }
  }
}
</script>

<style lang="scss">
  @import '~/stylesheets/components/_trending-component.scss';
</style>

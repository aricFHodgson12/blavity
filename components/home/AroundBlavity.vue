<template>
  <div class="around-blavity">
    <div class="around-blavity__heading">
      Around Blavity
    </div>
    <div
      v-for="(item, index) in articles"
      :key="index"
      class="around-blavity__item"
    >
      <div class="around-blavity__item__number">
        <span
          class="around-blavity_item__number__span-number"
          v-text="index+1+'.'"
        >
        </span>
      </div>
      <div class="around-blavity__item__detail">
        <nuxt-link :to="'/'+item.slug">
          <p
            class="around-blavity__item__detail__p-detail"
          >
            {{ decodeTitle(item.title) }}
          </p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import he from 'he'

export default {
  name: 'around-blavity',
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

  method: {
    decodeTitle (title) {
      return he.decode(title)
    }
  }
}
</script>

<style lang="scss">
  @import '~/stylesheets/components/home/_around-blavity.scss';
</style>

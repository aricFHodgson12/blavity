<template>
  <div class="article-card">
    <div class="thumb-container">
      <div class="image-wrapper-4x3">
        <amp-img
          :src="image"
          class="article-thumb contain"
          :title="decodedTitle"
          :alt="decodedTitle"
          layout="fill"
        ></amp-img>
      </div>
    </div>
    <div class="article-content">
      <div class="category-link-container">
        <nuxt-link
          class="category-link"
          to="/"
          v-text="category"
        ></nuxt-link>
      </div>
      <div class="title-container">
        <nuxt-link
          class="article-title"
          :to="link"
          v-text="decodedTitle"
        ></nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import he from 'he'

export default {
  name: 'amp-article-card',

  props: {
    categories: {
      type: Array,
      required: true
    },

    image: {
      type: String,
      required: true
    },

    slug: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    }
  },

  computed: {
    category () {
      return this.categories.length > 0 ? he.decode(this.categories[0].name) : ''
    },

    decodedTitle () {
      return he.decode(this.title)
    },

    link () {
      return `/${this.slug}`
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/amp/components/_article-card.scss';
</style>

<template>
  <div class="article-card">
    <div class="thumb-container">
      <div class="image-wrapper-4x3">
        <img
          v-lazy="image"
          class="article-thumb"
          :title="decodedTitle"
          :alt="decodedTitle"
          @click="goToArticle"
        >
      </div>
    </div>
    <div class="article-content">
      <div class="category-link-container">
        <nuxt-link
          class="category-link"
          :to="getCategoryRoutes(categories[0].slug)"
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
import { mapGetters } from 'vuex'
import he from 'he'

export default {
  name: 'article-card',

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
    },

    ...mapGetters({
      getCategoryRoutes: 'blavityCategories/getCategoryRoutes'
    })
  },
  methods: {
    goToArticle () {
      this.$router.push(`${this.link}`)
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/components/_article-card.scss';
</style>

<template lang="html">
  <div class="item">
    <div class="featured">
      <div class="image-wrapper-4x3">
        <img
          v-lazy="`https://res.cloudinary.com/blavity/image/upload/c_fit,g_center,w_300,q_auto:best,g_south_east,x_0/${image}`"
          class="article-image"
          :alt="decodedTitle"
          @click="goToArticle"
        >
      </div>
    </div>
    <div class="content">
      <p class="headline">
        <nuxt-link
          :to="getCategoryRoutes(categories[0].slug)"
        >
          {{ category }}
        </nuxt-link>
      </p>
      <p class="text">
        <nuxt-link
          :to="link"
          v-text="decodedTitle"
        ></nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import he from 'he'
import _$truncate from 'lodash/truncate'

export default {
  name: 'related-stories-card',
  props: {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: false,
      default: () => []
    },

    slug: {
      type: String,
      required: true
    }
  },

  computed: {
    category () {
      return this.categories.length > 0 ? (this.categories[0].name.charAt(0).toUpperCase()) + (this.categories[0].name.substr(1).toLowerCase()) : 'News'
    },

    decodedTitle () {
      return _$truncate(he.decode(this.title),
        {
          length: 80
        }
      )
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
      this.$router.push(`/${this.slug}`)
    }
  }
}
</script>

<style lang="css">
</style>

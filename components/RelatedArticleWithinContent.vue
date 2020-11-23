<template>
  <div class="related-article-within-content-component">
    <div
      :class="classObject"
    >
      <div class="related-heading">
        <h3>Related:</h3>
      </div>
      <div class="related-img">
        <div class="image-wrapper-4x3">
          <img
            v-lazy="image"
            :alt="decodeTitle"
            @click="goToArticle"
          >
        </div>
      </div>
      <div class="related-text">
        <nuxt-link
          :to="getCategoryRoutes(categorySlug)"
        >
          <p>{{ categoryName }}</p>
        </nuxt-link>
        <nuxt-link
          class="related-title"
          :to="slug"
        >
          {{ decodeTitle }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import he from 'he'

export default {
  name: 'related-article-within-content',

  props: {
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
    },
    post: {
      type: Object,
      required: true
    }
  },

  data () {
    return {}
  },
  computed: {
    categoryName () {
      if (this.post && this.post.categories && this.post.categories[0]) {
        return this.post.categories[0].name
      }
      return ''
    },
    categorySlug () {
      let result
      if (this.post && this.post.categories && this.post.categories[0]) {
        result = this.post.categories[0].slug
      } else {
        result = this.$store.state.blavityCategories.currentCategory
      }
      return result
    },
    classObject () {
      /* eslint-disable */
      if (this.$mq === 'mobile') {
        return {
          related: false,
          'related-mobile': true
        }
      } else {
        return {
          related: true,
          'related-mobile': false
        }
      }
      /* eslint-enable */
    },
    decodeTitle () {
      return he.decode(this.title)
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

<style lang="scss">
  @import '~/stylesheets/components/_related-article-within-content-component.scss';
</style>

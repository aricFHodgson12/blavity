<template lang="html">
  <div class="item">
    <div class="featured">
      <img
        v-lazy="image"
        class="article-image"
        :alt="decodeTitle"
        @click="goToArticle"
      >
    </div>
    <div class="content">
      <nuxt-link
        :to="getCategoryRoutes(article.categories[0].slug)"
      >
        <p class="headline">
          {{ category }}
        </p>
      </nuxt-link>
      <nuxt-link
        :to="`/${article.slug}`"
      >
        <p class="text">
          {{ titleText }}
        </p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import he from 'he'
import { mapGetters } from 'vuex'
import _$truncate from 'lodash/truncate'
// import he from 'he'
import { testArticles } from '~/utils/dataStructures.js'

export default {
  name: 'top-stories-related-stories-card',
  props: {
    post: {
      type: Object,
      default: () => ({
        ...testArticles[Math.floor(Math.random() * testArticles.length)]
      })
    }
  },
  data () {
    return {
      article: {
        ...this.post
      }
    }
  },
  computed: {
    category () {
      if (this.article.categories && this.article.categories[0]) {
        return this.article.categories[0].name
      } else {
        return 'News'
      }
    },
    image () {
      if (this.post.wp_featuredImage.includes('//blavity.com/')) {
        return this.post.wp_featuredImage.replace('blavity.com', 'legacy.blavity.com')
      } else if (this.post.wp_featuredImage.includes('res.cloudinary.com')) {
        return this.post.wp_featuredImage
      } else if (this.post.wp_featuredImage.includes('http')) {
        return this.post.wp_featuredImage
      } else {
        if (this.isViewportMobile) {
          return `https://res.cloudinary.com/blavity/image/upload/c_fit,g_center,h_250,q_auto:best,g_south_east,x_0/${this.post.wp_featuredImage}`
        }
        return `https://res.cloudinary.com/blavity/image/upload/c_fill,g_center,w_800,h_500,q_auto:best,g_south_east,x_0/${this.post.wp_featuredImage}`
      }
    },
    titleText () {
      const text = document.createElement('span')
      text.innerHTML = this.post.title
      return _$truncate(text.innerText, {
        'length': 80
      })
    },
    decodeTitle (title) {
      return he.decode(this.post.title)
    },
    ...mapGetters({
      getCategoryRoutes: 'blavityCategories/getCategoryRoutes'
    })
  },
  methods: {
    goToArticle () {
      this.$router.push(`/${this.article.slug}`)
    }
  }
}
</script>

<style lang="scss">
</style>

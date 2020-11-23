<template lang="html">
  <div class="item">
    <div class="featured">
      <img
        v-lazy="image"
        class="article-image"
        :alt="titleText"
        @click="goToArticle"
      >
    </div>
    <div class="content">
      <p
        class="headline"
        @click="goToArticle"
      >
        {{ category }}
      </p>
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
import _$truncate from 'lodash/truncate'
import he from 'he'
import { testArticles } from '~/utils/dataStructures.js'

export default {
  name: 'top-stories-with-sponsored-card',
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
      if (this.article.categories[0]) {
        return this.article.categories[0].slug.replace(
          /\w\S*/g,
          (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
          }
        )
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
      text.innerHTML = this.article.title
      return _$truncate(text.innerText, {
        'length': 80
      })
    }
  },
  methods: {
    decodeTitle (title) {
      return he.decode(title)
    },
    goToArticle () {
      this.$router.push(`/${this.article.slug}`)
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/components/top-stories/_top-stories-with-sponsored-card.scss'
</style>

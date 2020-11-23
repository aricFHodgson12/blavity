<template>
  <div class="sponsored-content">
    <div class="thumb-container">
      <div class="image-wrapper-4x3">
        <img
          v-lazy="image"
          :title="title"
          :alt="title"
          @click="goToArticle"
        >
      </div>
    </div>
    <div class="content">
      <h5 class="card-title">
        Sponsored Content
      </h5>
      <h2
        class="sponsored-content-title"
        v-text="title"
      ></h2>
      <div class="learn-more-link-container">
        <a
          class="learn-more-link"
          :href="link"
        >
          Learn more
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import he from 'he'
import { testSponsoredArticle } from '~/utils/dataStructures.js'

const defaultPost = testSponsoredArticle
export default {
  name: 'sponsored-content-single',
  props: {
    sponsoredArticle: {
      type: Array,
      required: true,
      default: () => ([...defaultPost])
    }
  },
  computed: {
    image () {
      if (this.sponsoredArticle[0].wp_featuredImage.includes('//blavity.com/')) {
        return this.sponsoredArticle[0].wp_featuredImage.replace('blavity.com', 'legacy.blavity.com')
      } else if (this.sponsoredArticle[0].wp_featuredImage.includes('res.cloudinary.com')) {
        return this.sponsoredArticle[0].wp_featuredImage
      } else if (this.sponsoredArticle[0].wp_featuredImage.includes('http')) {
        return this.sponsoredArticle[0].wp_featuredImage
      } else {
        if (this.isViewportMobile) {
          return `https://res.cloudinary.com/blavity/image/upload/c_fit,g_center,h_250,q_auto:best,g_south_east,x_0/${this.sponsoredArticle[0].wp_featuredImage}`
        }
        return `https://res.cloudinary.com/blavity/image/upload/c_fill,g_center,w_800,h_500,q_auto:best,g_south_east,x_0/${this.sponsoredArticle[0].wp_featuredImage}`
      }
    },
    title () {
      return he.decode(this.sponsoredArticle[0].title)
    },
    link () {
      return he.decode(this.sponsoredArticle[0].slug)
    }
  },
  methods: {
    goToArticle () {
      this.$router.push(`${this.link}`)
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/components/_sponsored-content-single.scss';
</style>

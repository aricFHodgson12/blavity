<template>
  <div class="article-standard-header">
    <div class="categories">
      <h4
        class="article-category post-tags"
      >
        {{ categoryName }}
      </h4>
    </div>
    <h1
      class="article-title"
    >
      {{ title }}
    </h1>
    <h2
      class="article-subtitle"
    >
      {{ subtitle }}
    </h2>
    <div class="article-imagery">
      <div class="image-wrapper-4x3">
        <img
          v-lazy="image"
          class="article-image"
          :alt="mediaAlt"
        >
      </div>
      <div class="article-image-details">
        <span class="imgSrc">Photo Credit: {{ caption }}</span>
      </div>
    </div>
    <div class="button-slot">
      <slot name="button"></slot>
    </div>
    <ArticleDetails
      :post="post"
      :views="views"
    >
    </ArticleDetails>
  </div>
</template>

<script>
import he from 'he'
import ArticleDetails from '~/components/ArticleDetails'

export default {
  name: 'article-standard',
  components: {
    ArticleDetails
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    caption: {
      type: String,
      required: true
    }
  },

  computed: {
    isViewportMobile () {
      return (this.$mq === 'mobile')
    },
    title () {
      if (this.post.virtual) return ''
      return (this.post.title && he.decode(this.post.title)) || ''
    },
    subtitle () {
      if (this.post.virtual) return ''
      return (this.post.subTitle && he.decode(this.post.subTitle)) || ''
    },
    categoryName () {
      if (this.post.virtual) return ''
      return (this.post.categories.length && this.post.categories[0].name) || ''
    },
    image () {
      if (this.post && this.post.wp_featuredImage && this.post.wp_featuredImage.includes('//blavity.com/')) {
        return this.post.wp_featuredImage.replace('blavity.com', 'legacy.blavity.com')
      } else if (this.post && this.post.wp_featuredImage && this.post.wp_featuredImage.includes('res.cloudinary.com')) {
        return this.post.wp_featuredImage
      } else if (this.post && this.post.wp_featuredImage && this.post.wp_featuredImage.includes('http')) {
        return this.post.wp_featuredImage
      } else {
        if (this.isViewportMobile) {
          return `https://res.cloudinary.com/blavity/image/upload/c_fit,g_center,h_250,q_auto:best,g_south_east,x_0/${this.post.wp_featuredImage}`
        }
        return `https://res.cloudinary.com/blavity/image/upload/c_fill,g_center,w_800,h_500,q_auto:best,g_south_east,x_0/${this.post.wp_featuredImage}`
      }
    },
    views () {
      if (this.post.virtual) return ''
      if (this.post.views) {
        return this.post.views
      } else {
        return '0'
      }
    },
    mediaAlt () {
      if (! this.post._medias) {
        return this.title
      }
      return he.decode(this.post._medias[0].title || this.title)
    }
  }

  // TODO: Is the date supposed to only say Today and never yesterday? If so, write functionality to determine if it is today and print date if it is not
}
</script>

<style lang="scss">
    @import '~/stylesheets/components/_article-standard-header.scss';
</style>

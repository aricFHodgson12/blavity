<template>
  <div class="article-bo-header">
    <div class="article-bo-header__content-wrapper">
      <div
        class="article-bo-header__article-img"
        :style="articleImage"
      >
      </div>
      <div id="overlay"></div>
    </div>
    <div class="article-bo-header__article-info">
      <div class="article-bo-header__article-info__category">
        <h4
          v-for="category in post.categories"
          :key="category.id"
          class="article-bo-header___article-info_category__post-tags"
        >
          {{ category.name }}
        </h4>
      </div>
      <h1
        class="article-bo-header__article-info__title"
      >
        {{ title }}
      </h1>
      <h3
        class="article-bo-header__article-info__subtitle"
      >
        {{ subtitle }}
      </h3>
      <div
        class="article-bo-header__article-info__imgSrc"
      >
        <span style="opacity:.5;">Photo Credit: {{ caption }}</span>
      </div>
    </div>
    <div
      v-if="$mq === 'desktop'"
      id="articleBorder"
      class="article-bo-header__article-border"
      :style="articleBorderDesktop"
    >
    </div>
  </div>
</template>

<script>
import he from 'he'
import _$startsWith from 'lodash/startsWith'

// const boHero = 'https://storage.googleapis.com/blavitynews/assets/images/Michelle%20Obama%20Hero.png' (for testing)
const border = 'https://storage.googleapis.com/blavitynews/assets/images/special-white-real.svg'

export default {
  name: 'article-bo-header',
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

  data () {
    return {
      articleBorderDesktop: {
        display: 'flex',
        backgroundImage: 'url(' + border + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '95%',
        height: '768px',
        position: 'absolute',
        marginTop: '65px',
        marginLeft: '5%',
        zIndex: '2'
      }
    }
  },

  computed: {
    title () {
      return this.post.title
    },
    subtitle () {
      return he.decode(this.post.subTitle)
    },
    articleImage () {
      let image = ''
      if (this.post.wp_featuredImage.includes('//blavity.com/')) {
        image = this.post.wp_featuredImage.replace('blavity.com', 'legacy.blavity.com')
      } else if (this.post.wp_featuredImage.includes('res.cloudinary.com')) {
        image = this.post.wp_featuredImage
      } else if (this.post.wp_featuredImage.includes('http')) {
        image = this.post.wp_featuredImage
      } else {
        if (this.isViewportMobile) {
          image = `https://res.cloudinary.com/blavity/image/upload/c_fit,g_center,h_250,q_auto:best,g_south_east,x_0/${this.post.wp_featuredImage}`
        }
        image = `https://res.cloudinary.com/blavity/image/upload/c_fill,g_center,w_800,h_500,q_auto:best,g_south_east,x_0/${this.post.wp_featuredImage}`
      }
      return {
        backgroundImage: `url(${image})`
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
    avatar () {
    /*  eslint-disable */
      // return this.post.author.avatar
      if (this.post._author.profileImagePreference === null || undefined) {
        return 'https://www.gravatar.com/avatar/18af7cc36f95260c805b2daf843c459c?d=&s=200'
      } else if (this.post._author.profileImagePreference === 'gravatar') {
        return this.post._author.gravatar
      } else if (_$startsWith(this.post._author.profileImagePreference, 'https')) {
        return this.post._author.profileImagePreference
      } else {
        return `https://res.cloudinary.com/blavity/image/upload/c_thumb,g_center,w_40,h_40,q_auto:best,g_south_east,x_0/${this.post._author.profileImagePreference}`
      }
    /*  eslint-enable */
    },
    name () {
      /*  eslint-disable */
      if (this.post._author.display_name == undefined || null || '') {
        return this.post._author.username
      } else if (! this.post._author.username && ! this.post._author.display_name) {
        return 'Blavity Team'
      } else { return this.post._author.display_name }
      /*  eslint-enable */
    },
    isViewportMobile () {
      return (this.$mq === 'mobile')
    }
  }
}
</script>

<style lang="scss">
    @import '~/stylesheets/components/_article-bo-header.scss';
</style>

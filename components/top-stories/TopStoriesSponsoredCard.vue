<template>
  <div class="top-stories-sponsored-card">
    <nuxt-link :to="link">
      <div class="thumb-container">
        <div class="image-wrapper-4x3">
          <img
            v-lazy="image(sponsoredArticle[0])"
            :title="titleText(sponsoredArticle[0].title)"
            :alt="titleText(sponsoredArticle[0].title)"
            class="img-fluid"
          >
        </div>
      </div>
      <div class="content">
        <h5 class="card-title">
          {{ category }}
        </h5>
        <h2
          class="sponsored-content-title"
        >
          {{ titleText(sponsoredArticle[0].title) }}
        </h2>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { testSponsoredArticle } from '~/utils/dataStructures.js'
import _$truncate from 'lodash/truncate'

const defaultPost = testSponsoredArticle
export default {
  name: 'top-stories-sponsored-card',
  props: {
    sponsoredArticle: {
      type: Array,
      required: true,
      default: () => ([...defaultPost])
    }
  },
  computed: {
    link () {
      return this.sponsoredArticle[0].slug
    },
    category () {
      if (this.sponsoredArticle[0].categories[0].slug) {
        return this.sponsoredArticle[0].categories[0].slug.replace(
          /\w\S*/g,
          (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
          }
        )
      } else {
        return 'News'
      }
    }
  },
  methods: {
    titleText (string) {
      const text = document.createElement('span')
      text.innerHTML = string
      return _$truncate(text.innerText, {
        'length': 80
      })
    },
    image (post) {
      // return this.post.image
      return `https://res.cloudinary.com/blavity/image/upload/c_fit,g_center,w_450,q_auto:best,g_south_east,x_0/${post.wp_featuredImage}`
    },
    goToArticle () {
      this.$router.push(`/${this.sponsoredArticle.slug}`)
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/components/top-stories/_top-stories-sponsored-card.scss';
</style>

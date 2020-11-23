<template lang="html">
  <div class="cat-item">
    <div class="cat-item__featured">
      <img
        v-lazy="image"
        class="cat-item__featured__article-image"
        :alt="decodedTitle"
        @click="goToArticle"
      >
    </div>
    <div class="cat-item__content">
      <nuxt-link
        :to="getCategoryRoutes(article.categories[0].slug)"
      >
        <p class="cat-item__content__headline">
          {{ category }}
        </p>
      </nuxt-link>
      <nuxt-link
        :to="`/${article.slug}`"
      >
        <p class="cat-item__content__text">
          {{ titleText(article.title) }}
        </p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import he from 'he'
import _$truncate from 'lodash/truncate'
import _$capitalize from 'lodash/capitalize'
import _$camelcase from 'lodash/camelCase'

export default {
  name: 'category-related-stories-card',
  props: {
    post: {
      type: Object,
      required: true
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
        return this.article.categories[0].name.replace(
          /\w\S*/g,
          (txt) => {
            return _$capitalize(_$camelcase(txt))
          }
        )
      } else {
        return _$capitalize(this.$route.params.category)
      }
    },
    image () {
      if (this.article.wp_featuredImage.includes('//blavity.com/')) {
        return this.article.wp_featuredImage.replace('blavity.com', 'legacy.blavity.com')
      } else if (this.article.wp_featuredImage.includes('res.cloudinary.com')) {
        return this.article.wp_featuredImage
      } else if (this.article.wp_featuredImage.includes('http')) {
        return this.article.wp_featuredImage
      } else {
        if (this.isViewportMobile) {
          return `https://res.cloudinary.com/blavity/image/upload/c_fit,g_center,h_250,q_auto:best,g_south_east,x_0/${this.article.wp_featuredImage}`
        }
        return `https://res.cloudinary.com/blavity/image/upload/c_fill,g_center,w_800,h_500,q_auto:best,g_south_east,x_0/${this.article.wp_featuredImage}`
      }
    },
    decodedTitle () {
      return _$truncate(he.decode(this.article.title),
        {
          length: 80
        }
      )
    },
    ...mapGetters({
      getCategoryRoutes: 'blavityCategories/getCategoryRoutes'
    })
  },
  methods: {
    titleText (string) {
      const text = document.createElement('span')
      text.innerHTML = string
      return _$truncate(text.innerText, {
        'length': 80
      })
    },
    goToArticle () {
      this.$router.push(`/${this.article.slug}`)
    }
  }
}
</script>

<style lang="scss">
</style>

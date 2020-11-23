<template>
  <div class="top-stories-tile">
    <div
      class="top-stories-tile__img"
    >
      <nuxt-link :to="'/'+tile.slug">
        <img
          v-lazy="image"
          class="top-stories-tile__img__fluid"
          :alt="truncatedTitle"
        >
      </nuxt-link>
    </div>
    <div class="top-stories-tile__desc">
      <div class="top-stories-tile__desc__tile-category">
        <div>
          <span
            v-for="(category, catindex) in tile.categories.slice(0, 1)"
            :key="catindex"
          >
            <nuxt-link
              :to="getCategoryRoutes(category.slug)"
            >
              <span
                :style="catName"
                v-html="category.name"
              >
              </span>
            </nuxt-link>
          </span>
        </div>
      </div>
      <div
        class="top-stories-tile__desc__tile-title"
      >
        <nuxt-link
          :to="'/'+tile.slug"
        >
          {{ truncatedTitle }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _$truncate from 'lodash/truncate'
import he from 'he'
import { testArticles } from '~/utils/dataStructures.js'
export default {
  name: 'top-stories-tile',
  props: {
    tile: {
      type: Object,
      required: false,
      default: () => ({
        ...testArticles[Math.floor(Math.random() * testArticles.length)]
      })
    }
  },

  data () {
    return {
      catName: {
        color: '#FF542F',
        textTransform: 'capitalize',
        fontSize: '18px',
        textDecoration: 'none',
        fontFamily: 'TT Norms'
      }
    }
  },

  computed: {
    isViewportMobile () {
      return (this.$mq === 'mobile')
    },
    truncatedTitle () {
      if (! this.isViewportMobile) {
        return he.decode(_$truncate(this.tile.title, {
          'length': 140
        }))
      } else {
        return he.decode(_$truncate(this.tile.title, {
          'length': 80
        }))
      }
    },
    image () {
      if (this.tile.wp_featuredImage.includes('//blavity.com/')) {
        return this.tile.wp_featuredImage.replace('blavity.com', 'legacy.blavity.com')
      } else if (this.tile.wp_featuredImage.includes('res.cloudinary.com')) {
        return this.tile.wp_featuredImage
      } else if (this.tile.wp_featuredImage.includes('http')) {
        return this.tile.wp_featuredImage
      } else {
        if (this.isViewportMobile) {
          return `https://res.cloudinary.com/blavity/image/upload/c_fit,g_center,h_250,q_auto:best,g_south_east,x_0/${this.tile.wp_featuredImage}`
        }
        return `https://res.cloudinary.com/blavity/image/upload/c_fill,g_center,w_800,h_500,q_auto:best,g_south_east,x_0/${this.tile.wp_featuredImage}`
      }
    },
    ...mapGetters({
      getCategoryRoutes: 'blavityCategories/getCategoryRoutes'
    })
  }
}
</script>

<style lang="scss" scoped>
</style>

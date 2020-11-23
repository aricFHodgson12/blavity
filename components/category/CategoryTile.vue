<template>
  <div class="tile">
    <div
      class="tile__img"
    >
      <nuxt-link :to="'/'+tile.slug">
        <img
          v-lazy="image"
          :alt="truncatedTitle"
          class="tile__img__fluid"
        >
      </nuxt-link>
    </div>
    <div class="tile__desc">
      <div class="tile__desc__tile-category">
        <div>
          <span>
            <nuxt-link
              :to="getCategoryRoutes(tile.categories[0].slug)"
            >
              <span :style="catName">
                {{ tileCategoryName }}
              </span>
            </nuxt-link>
          </span>
        </div>
      </div>
      <div
        class="tile__desc__tile-title"
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
import _$capitalize from 'lodash/capitalize'
import _$camelcase from 'lodash/camelCase'

export default {
  name: 'category-tile',
  props: {
    tile: {
      type: Object,
      required: true
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
    tileCategoryName () {
      if (this.tile.categories && this.tile.categories.length > 0) {
        return this.tile.categories[0].name.replace(
          /\w\S*/g,
          (txt) => {
            return _$capitalize(_$camelcase(txt))
          }
        )
      } else {
        return _$capitalize(this.$route.params.category)
      }
    },
    isViewportMobile () {
      return (this.$mq === 'mobile')
    },
    truncatedTitle () {
      if (! this.isViewportMobile) {
        return _$truncate(this.tile.title, {
          'length': 80
        })
      } else {
        return _$truncate(this.tile.title, {
          'length': 80
        })
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

<style lang="scss">
</style>

<template>
  <div class="tile">
    <div
      class="tile-img"
    >
      <nuxt-link :to="'/'+tile.slug">
        <img
          v-lazy="image"
          class="img-fluid"
          :alt="tile.title"
        >
      </nuxt-link>
    </div>
    <div class="desc">
      <div class="tile-category">
        <div>
          <span
            v-for="(category, catindex) in categoryList"
            :key="catindex"
          >
            <nuxt-link
              :to="getCategoryRoutes(category.slug)"
            >
              <span :style="catName">
                {{ category.name }}
              </span>
            </nuxt-link>
          </span>
        </div>
      </div>
      <div
        class="tile-title"
      >
        <nuxt-link
          :to="'/'+tile.slug"
        >
          <p>
            {{ tile.title }}
          </p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'tile',
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
        fontSize: '14px'
      }
    }
  },

  computed: {
    isViewportMobile () {
      return (this.$mq === 'mobile')
    },
    categoryList () {
      if (! this.tile.categories) {
        return []
      } else {
        return this.tile.categories.slice(0, 1)
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
  @import '~/stylesheets/components/_reusablePentTile.scss';
</style>

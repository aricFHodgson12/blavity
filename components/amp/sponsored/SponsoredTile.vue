<template>
  <div class="tile">
    <div
      class="tile-img"
    >
      <nuxt-link :to="'/'+tile.slug">
        <amp-img
          class="img-fluid"
          :src="image"
          width="300"
          height="175"
          layout="responsive"
        ></amp-img>
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
              to="#"
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

export default {
  name: 'amp-tile',
  props: {
    tile: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      catName: {
        color: '#EB0A1E',
        fontSize: '14px',
        textTransform: 'uppercase',
        letterSpacing: '.25rem'
      }
    }
  },

  computed: {
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
    }
  }

}
</script>

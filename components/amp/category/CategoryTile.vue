<template>
  <div class="tile">
    <div
      class="tile__img"
    >
      <nuxt-link :to="'/'+tile.slug">
        <amp-img
          class="tile__img__fluid"
          :src="`https://res.cloudinary.com/blavity/image/upload/c_fill,g_center,w_300,q_auto:best,g_south_east,x_0/${tile.wp_featuredImage}`"
          width="100"
          height="56"
          layout="responsive"
        ></amp-img>
      </nuxt-link>
    </div>
    <div class="tile__desc">
      <div class="tile__desc__tile-category">
        <div>
          <span>
            <nuxt-link
              to="#"
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
import _$truncate from 'lodash/truncate'
import _$capitalize from 'lodash/capitalize'
import _$camelcase from 'lodash/camelCase'

export default {
  name: 'amp-category-tile',
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
        return _$capitalize(_$camelcase(this.tile.categories.slice(0, 1)[0].name))
      } else {
        return _$capitalize(this.$route.params.category)
      }
    },
    truncatedTitle () {
      return _$truncate(this.tile.title, {
        'length': 80
      })
    }
  }

}
</script>

<style lang="scss">
</style>

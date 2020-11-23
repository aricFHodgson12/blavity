<template>
  <div class="pent-tile-view">
    <div
      :key="keys.pentTileArticlesMobile"
      class="pent-tile-view__small-display"
    >
      <div class="heading-container">
        <h2
          :style="heading"
        >
          More Current News
        </h2>
      </div>
      <Tile
        v-for="( tile, index ) in pentTileArticlesMobile"
        :key="index"
        class="small-card-mobile"
        :tile="tile"
      >
      </Tile>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tile from '~/components/amp/Tile.vue'

export default {
  name: 'amp-pent-tile-view',
  components: { Tile },
  props: {
    mostCurrentNewsArticles: {
      required: true,
      type: Array
    }
  },

  data () {
    return {
      moreArticles3: [],
      offset: 0,
      keys: {
        pentTileArticlesMobile: 'ar1' // cannot use an empty string here
      },
      heading: {
        fontWeight: '400',
        fontSize: '28px'
      },
      showButton: true
    }
  },

  computed: {
    pentTileArticlesMobile () {
      return this.moreArticles3
    },
    ...mapGetters({
      currentCategory: 'blavityCategories/getCurrentCategory'
    })
  },

  created () {
    this.moreArticles3 = this.mostCurrentNewsArticles.slice(0, 4)
  }
}
</script>

<style lang="scss">
    @import '~/stylesheets/amp/components/_reusablePentTile.scss';
</style>

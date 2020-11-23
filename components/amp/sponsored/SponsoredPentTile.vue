<template>
  <div class="sponsored-pent-tile-view">
    <div
      class="pent-tile-view__small-display"
    >
      <SponsoredTile
        v-for="( tile, index ) in pentTileArticlesMobile"
        :key="index"
        class="small-card-mobile"
        :tile="tile"
      >
      </SponsoredTile>
    </div>
  </div>
</template>

<script>
import SponsoredTile from '~/components/amp/sponsored/SponsoredTile.vue'

export default {
  name: 'amp-pent-tile-view',
  components: { SponsoredTile },
  props: {
    sponsoredArticles: {
      required: true,
      type: Array
    }
  },

  data () {
    return {
      moreArticles: [],
      heading: {
        fontWeight: '400',
        fontSize: '28px'
      },
      showButton: true
    }
  },

  computed: {
    pentTileArticlesMobile () {
      return this.moreArticles
    }
  },

  created () {
    this.moreArticles = this.sponsoredArticles.slice(0, 4)
  }
}
</script>

<style lang="scss">
    @import '~/stylesheets/amp/components/_sponsored-pent-tile.scss';
</style>

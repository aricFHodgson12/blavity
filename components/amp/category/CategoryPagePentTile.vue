<template>
  <div class="category-pent-tile-view">
    <div
      class="category-pent-tile-view__mobile"
    >
      <CategoryTile
        v-for="( tile, index ) in pentTileArticlesMobile"
        :key="index"
        :tile="tile"
      >
      </CategoryTile>
    </div>
  </div>
</template>

<script>
import CategoryTile from '~/components/amp/category/CategoryTile.vue'

export default {
  name: 'amp-category-pent-tile-view',
  components: { CategoryTile },
  props: {
    articles: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      count: null,
      pentTileArticlesMobile: [],
      errorMessage: {},
      heading: {
        fontWeight: '400',
        fontSize: '28px'
      }
    }
  },

  async created () {
    this.pentTileArticlesMobile = this.articles.slice(0, 4)
  },

  methods: {
    click () {
      return <Tile></Tile>
    }
  }
}
</script>

<style lang="scss">
    @import '~/stylesheets/amp/components/category/_category-reusable-pent-tile.scss';
</style>

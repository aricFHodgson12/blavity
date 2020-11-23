<template>
  <div class="search-pent-tile-view">
    <div
      v-if="!isViewportMobile"
      class="search-pent-tile-view__large-display"
    >
      <div class="heading-container">
        <h2
          :style="heading"
        >
          Search Results for:
        </h2>
        <span
          class="query"
          :style="queryStyle"
        >
          `{{ query }}`
        </span>
      </div>
      <div class="row-big">
        <SearchTile
          v-for="( tile, index ) in pentTileArticlesBig"
          :key="index"
          class="big-card"
          :tile="tile"
        >
        </SearchTile>
      </div>
      <div
        :key="keys.pentTileArticlesSmall"
        class="row-small"
      >
        <SearchTile
          v-for="( tile, index ) in pentTileArticlesSmall"
          :key="index"
          class="small-card"
          :tile="tile"
        >
        </SearchTile>
      </div>
    </div>
    <div
      v-else
      :key="keys.pentTileArticlesMobile"
      class="search-pent-tile-view__small-display"
    >
      <div class="heading-container">
        <h2
          :style="heading"
        >
          Search Results for:
        </h2>
        <p
          :style="queryStyle"
        >
          `{{ query }}`
        </p>
      </div>
      <SearchTile
        v-for="( tile, index ) in pentTileArticlesMobile"
        :key="index"
        class="small-card-mobile"
        :tile="tile"
      >
      </SearchTile>
    </div>
  </div>
</template>

<script>
import SearchTile from '~/components/search/SearchTile.vue'

export default {
  name: 'search-results',
  components: { SearchTile },
  props: {
    articles: {
      required: true,
      type: Array
    },
    query: {
      required: true,
      type: String
    }
  },

  data () {
    return {
      moreArticles: [],
      moreArticles2: [],
      moreArticles3: [],
      keys: {
        pentTileArticlesSmall: 'ar0', // cannot use an empty string here
        pentTileArticlesMobile: 'ar1' // cannot use an empty string here

      },
      heading: {
        fontWeight: '400',
        fontSize: '40px',
        marginTop: '20px',
        order: 1
      },
      queryStyle: {
        fontSize: '32px',
        color: '#FF542F',
        textTransform: 'capitalize',
        order: 2,
        marginTop: '20px'
      },
      showButton: true
    }
  },

  computed: {
    isViewportMobile () {
      return (this.$mq === 'mobile')
    },
    // Creating computed properties, so we can watch the data properties and return them
    pentTileArticlesBig () {
      return this.moreArticles
    },
    pentTileArticlesSmall () {
      return this.moreArticles2
    },
    pentTileArticlesMobile () {
      return this.moreArticles3
    }
  },

  created () {
    // Once the component has been created we are assigning the data properties to the sliced prop mostCurrentNewsArtcles for the initial data to be passed to the Tile component
    this.moreArticles = this.articles.slice(0, 2)
    this.moreArticles2 = this.articles.slice(2, 5)
    this.moreArticles3 = this.articles.slice(0, 4)
  }
}
</script>

<style lang="scss">
    @import '~/stylesheets/components/search/_search-results.scss';
</style>

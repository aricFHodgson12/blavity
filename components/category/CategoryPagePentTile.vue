<template>
  <div class="category-pent-tile-view">
    <div
      v-if="!isViewportMobile"
      class="category-pent-tile-view__desktop"
    >
      <div class="category-pent-tile-view__desktop__top-row">
        <CategoryTile
          v-for="( tile, index ) in pentTileArticlesBig"
          :key="index"
          :tile="tile"
        >
        </CategoryTile>
      </div>
      <div class="category-pent-tile-view__desktop__bottom-row">
        <CategoryTile
          v-for="( tile, index ) in pentTileArticlesSmall"
          :key="index"
          :tile="tile"
        >
        </CategoryTile>
      </div>
    </div>
    <div
      v-else
      class="category-pent-tile-view__mobile"
    >
      <CategoryTile
        v-for="( tile, index ) in pentTileArticlesMobile"
        :key="index"
        :tile="tile"
      >
      </CategoryTile>
    </div>
    <div class="button-container">
      <button
        v-show="showButton"
        @click="loadMoreStories"
      >
        More Stories
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CategoryTile from '~/components/category/CategoryTile.vue'

export default {
  name: 'category-pent-tile-view',
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
      pentTileArticlesBig: [],
      pentTileArticlesSmall: [],
      pentTileArticlesMobile: [],
      pentTileArticlesNext: [],
      errorMessage: {},
      heading: {
        fontWeight: '400',
        fontSize: '28px'
      },
      offset: 8,
      showButton: true
    }
  },

  computed: {
    isViewportMobile () {
      return (this.$mq === 'mobile')
    },
    ...mapGetters({
      currentCategory: 'blavityCategories/getCurrentCategory'
    })
  },

  async created () {
    this.pentTileArticlesBig = this.articles.slice(0, 2)
    this.pentTileArticlesSmall = this.articles.slice(2, 5)
    this.pentTileArticlesMobile = this.articles.slice(0, 4)
    this.pentTileArticlesNext = this.articles.slice(5, this.articles.length)
  },

  methods: {
    async loadMoreStories () {
      try {
        let queryCategory
        if (this.currentCategory) {
          queryCategory = this.currentCategory
        } else {
          queryCategory = 'news'
        }
        const newArticles = await this.$axios.$get(`/articles/categories/${queryCategory}/18/${this.offset}`)
        this.pentTileArticlesSmall = [...this.pentTileArticlesSmall, ...newArticles.slice(0, 9)]
        this.pentTileArticlesMobile = [...this.pentTileArticlesMobile, ...newArticles.slice(0, 9)]
        this.offset = this.offset + 9
        if (newArticles.length < 18) {
          this.showButton = false
        }
      } catch (e) {
        this.$store.commit('setErrorMessage', e)
      }
    },
    click () {
      return <Tile></Tile>
    }
  }

  // TODO: Add `Load more stories` button and ask how many articles should be loaded on keydown. The assumption is three more articles
  // TODO: Clarify how we know it is a video article. Video article should have additional css with white box play button
}
</script>

<style lang="scss">
    @import '~/stylesheets/components/category/_category-reusable-pent-tile.scss';
</style>

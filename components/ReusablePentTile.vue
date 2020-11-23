<template>
  <div class="pent-tile-view">
    <div
      v-if="!isViewportMobile"
      class="pent-tile-view__large-display"
    >
      <div class="heading-container">
        <h2
          :style="heading"
        >
          More Current News
        </h2>
      </div>
      <div class="row-big">
        <Tile
          v-for="( tile, index ) in pentTileArticlesBig"
          :key="index"
          class="big-card"
          :tile="tile"
        >
        </Tile>
      </div>
      <div
        :key="keys.pentTileArticlesSmall"
        class="row-small"
      >
        <Tile
          v-for="( tile, index ) in pentTileArticlesSmall"
          :key="index"
          class="small-card"
          :tile="tile"
        >
        </Tile>
      </div>
    </div>
    <div
      v-else
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
    <div class="button-container">
      <button
        v-show="showButton"
        @click="loadMoreStories"
      >
        Load more stories
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tile from '~/components/Tile.vue'

export default {
  name: 'pent-tile-view',
  components: { Tile },
  serverCacheKey: mostCurrentNewsArtcles => mostCurrentNewsArtcles[0]._id,
  props: {
    mostCurrentNewsArticles: {
      required: true,
      type: Array
    }
  },

  data () {
    return {
      moreArticles: [],
      moreArticles2: [],
      moreArticles3: [],
      offset: 0,
      keys: {
        pentTileArticlesSmall: 'ar0', // cannot use an empty string here
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
    },
    ...mapGetters({
      currentCategory: 'blavityCategories/getCurrentCategory'
    })
  },

  created () {
    // Once the component has been created we are assigning the data properties to the sliced prop mostCurrentNewsArtcles for the initial data to be passed to the Tile component
    this.moreArticles = this.mostCurrentNewsArticles.slice(0, 2)
    this.moreArticles2 = this.mostCurrentNewsArticles.slice(2, 5)
    this.moreArticles3 = this.mostCurrentNewsArticles.slice(0, 4)
  },

  methods: {
    async loadMoreStories () {
      try {
        // When the button is clicked, we will fetch 3 new articles and concatenate the new array of Objects to the data property array of Objects...we want to create an offset in a future iteration of this component, but for now we fetch 3 articles and then the button disappears because the endpoint doesn't currently give us enough new articles
        let queryCategory
        if (this.currentCategory) {
          queryCategory = this.currentCategory
        } else {
          queryCategory = 'news'
        }
        const newArticles = await this.$axios.$get(`/articles/categories/${queryCategory}/3/${this.offset}`)
        this.moreArticles2 = [...this.moreArticles2, ...newArticles]
        this.moreArticles3 = [...this.moreArticles2, ...newArticles]
        this.offset = this.offset + 3
        // Here we are generating random keys, so we can force the component to re-render with newest article data
        const keyConst = Math.floor(Math.random() * 10000)
        for (let key in this.keys) {
          this.keys[key] = `${key}-${keyConst}`
        }
        // this.showButton = false
      } catch (e) {
        this.$store.commit('setErrorMessage', e)
      }
    }
  }

  // TODO: Clarify how we know it is a video article. Video article should have additional css with white box play button
}
</script>

<style lang="scss">
    @import '~/stylesheets/components/_reusablePentTile.scss';
</style>

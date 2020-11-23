<template>
  <div class="sponsored-pent-tile-view">
    <div
      v-if="!isViewportMobile"
      class="pent-tile-view__large-display"
    >
      <div class="row-big">
        <SponsoredTile
          v-for="( tile, index ) in pentTileArticlesBig"
          :key="index"
          class="big-card"
          :tile="tile"
        >
        </SponsoredTile>
      </div>
      <div
        :key="keys.pentTileArticlesSmall"
        class="row-small"
      >
        <SponsoredTile
          v-for="( tile, index ) in pentTileArticlesSmall"
          :key="index"
          class="small-card"
          :tile="tile"
        >
        </SponsoredTile>
      </div>
    </div>
    <div
      v-else
      :key="keys.pentTileArticlesMobile"
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
    <!-- <div class="button-container">
      <button
        v-show="showButton"
        @click.once="loadMoreStories"
      >
        Load more stories
      </button>
    </div> -->
  </div>
</template>

<script>
import SponsoredTile from '~/components/sponsored/SponsoredTile.vue'

export default {
  name: 'pent-tile-view',
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
      moreArticles2: [],
      moreArticles3: [],
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
    }
  },

  created () {
    // Once the component has been created we are assigning the data properties to the sliced prop mostCurrentNewsArtcles for the initial data to be passed to the Tile component
    this.moreArticles = this.sponsoredArticles.slice(0, 2)
    this.moreArticles2 = this.sponsoredArticles.slice(2, 5)
    this.moreArticles3 = this.sponsoredArticles.slice(0, 4)
  },

  methods: {
    async loadMoreStories () {
      try {
        // When the button is clicked, we will fetch 3 new articles and concatenate the new array of Objects to the data property array of Objects...we want to create an offset in a future iteration of this component, but for now we fetch 3 articles and then the button disappears because the endpoint doesn't currently give us enough new articles
        const newArticles = await this.$axios.$get(`/articles`, { params: { sort: 'newer', count: 3, site: 'blavity' } })
        this.moreArticles2 = [...this.moreArticles2, ...newArticles]
        this.moreArticles3 = [...this.moreArticles2, ...newArticles]
        // Here we are generating random keys, so we can force the component to re-render with newest article data
        const keyConst = Math.floor(Math.random() * 10000)
        for (let key in this.keys) {
          this.keys[key] = `${key}-${keyConst}`
        }
        this.showButton = false
      } catch (e) {
        this.$store.commit('setErrorMessage', e)
      }
    }
  }

  // TODO: Clarify how we know it is a video article. Video article should have additional css with white box play button
}
</script>

<style lang="scss">
    @import '~/stylesheets/components/_sponsored-pent-tile.scss';
</style>

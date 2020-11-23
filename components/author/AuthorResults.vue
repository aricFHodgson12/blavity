<template>
  <div class="author-pent-tile-view">
    <div
      v-if="!isViewportMobile"
      class="author-pent-tile-view__large-display"
    >
      <div class="heading-container">
        <h2
          :style="heading"
        >
          The Lastest from ‘{{ firstName }}’
        </h2>
      </div>
      <div class="row-big">
        <AuthorTile
          v-for="( tile, index ) in pentTileArticlesBig"
          :key="index"
          class="big-card"
          :tile="tile"
        >
        </AuthorTile>
      </div>
      <div
        :key="keys.pentTileArticlesSmall"
        class="row-small"
      >
        <AuthorTile
          v-for="( tile, index ) in pentTileArticlesSmall"
          :key="index"
          class="small-card"
          :tile="tile"
        >
        </AuthorTile>
        <div
          v-if="hasMore"
          class="author-results__button-container"
        >
          <button
            v-show="showButton"
            class="author-results__btn-load-more"
            @click="onClickLoadMore"
          >
            Load more stories
          </button>
        </div>
      </div>
    </div>
    <div
      v-else
      :key="keys.pentTileArticlesMobile"
      class="author-pent-tile-view__small-display"
    >
      <div class="heading-container">
        <h2
          :style="heading"
        >
          The Lastest from ‘{{ firstName }}’
        </h2>
      </div>
      <div>
        <AuthorTile
          v-for="( tile, index ) in pentTileArticlesMobile"
          :key="index"
          class="small-card-mobile"
          :tile="tile"
        >
        </AuthorTile>
      </div>
      <div
        v-if="hasMore"
        class="author-results__button-container"
      >
        <button
          v-show="showButton"
          class="author-results__btn-load-more"
          @click="onClickLoadMore"
        >
          Load more stories
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AuthorTile from '~/components/author/AuthorTile.vue'

export default {
  name: 'author-results',
  components: { AuthorTile },
  props: {
    articles: {
      required: true,
      type: Array
    },
    firstName: {
      required: true,
      type: String
    },
    hasMore: {
      required: false,
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      moreArticles: [],
      moreArticles2: [],
      moreArticles3: [],
      // loadMoreArticles: [],
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
      nameStyle: {
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
      return this.articles.slice(0, 2)
    },
    pentTileArticlesSmall () {
      return this.articles.slice(2)
    },
    pentTileArticlesMobile () {
      return this.articles
    }
  },

  methods: {
    onClickLoadMore () {
      this.$emit('load-more')
    }
  }
}
</script>

<style lang="scss">
    @import '~/stylesheets/components/author/_author-results.scss';
</style>

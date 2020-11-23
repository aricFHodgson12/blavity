<template>
  <div class="category-page">
    <section class="category-page__header">
      <category-dropdown :category="getCurrentCategoryObject"></category-dropdown>
    </section>
    <div class="main-row">
      <section class="category-page__body">
        <div class="category-page__body__articles">
          <div
            class="category-page__body__articles__mobile"
          >
            <category-tile
              :tile="articles[0]"
            ></category-tile>
          </div>
        </div>
        <div class="category-page__body__bottom">
          <category-pent-tile-view
            :articles="pentTile"
          ></category-pent-tile-view>
        </div>
      </section>
      <section
        class="mobile-section"
      >
        <div class="ad ad-rectangle">
          <p>Advertisement</p>
          <ad-leaderboard
            :category-slug="getCurrentCategoryObject.slug"
            :page="getCurrentCategoryObject.slug"
          ></ad-leaderboard>
        </div>
      </section>
    </div>
    <ad-mobile-sticky
      :category-slug="getCurrentCategoryObject.slug"
      :page="getCurrentCategoryObject.slug"
    ></ad-mobile-sticky>
  </div>
</template>

<script>
import _$capitalize from 'lodash/capitalize'
import _$upperCase from 'lodash/upperCase'
import { mapGetters } from 'vuex'
import CategoryTile from '~/components/amp/category/CategoryTile'
import CategoryDropdown from '~/components/amp/category/CategoryDropdown'
import CategoryPentTileView from '~/components/amp/category/CategoryPagePentTile'
import AdLeaderboard from '~/components/amp/ad/AdLeaderboard'
import AdMobileSticky from '~/components/amp/ad/AdMobileSticky'

export default {
  name: 'amp-category-page',
  layout: 'amp',
  head () {
    return {
      title: 'The Community for Black Creativity and News',
      bodyAttrs: {
        class: 'category-page'
      },
      meta: [
        { property: 'og:title', content: `${_$capitalize(_$upperCase(this.$route.params.category))} | The Community for Black Creativity and News - Blavity` },
        { property: 'og:image', content: 'http://blavity.blavity.netdna-cdn.com/wp-content/uploads/2014/11/IMG_9764.jpg?d600af' },
        { property: 'keywords', content: `${_$capitalize(_$upperCase(this.$route.params.category))}, Blavity, Black Twitter, Black Lives Matter, Black Millennials, Black News` },
        { property: 'og:url', content: `https://blavity.com/categories/${this.$route.params.category}` },
        { property: 'og:description', content: 'Blavity is a tech company for forward thinking Black millennials pushing the boundaries of culture and the status quo.' },
        { name: 'twitter:title', content: `${_$capitalize(_$upperCase(this.$route.params.category))} | The Community for Black Creativity and News - Blavity` },
        { name: 'twitter:description', content: 'Blavity is a tech company for forward thinking Black millennials pushing the boundaries of culture and the status quo.' },
        { name: 'twitter:image', content: 'http://blavity.blavity.netdna-cdn.com/wp-content/uploads/2014/11/IMG_9764.jpg?d600af' }
      ],
      link: [
        { rel: 'canonical', href: '/categories/' + this.$route.params.category }
      ]
    }
  },
  components: {
    CategoryDropdown,
    CategoryPentTileView,
    AdLeaderboard,
    AdMobileSticky,
    CategoryTile
  },
  data () {
    return {
      categories: null,
      articles: null,
      pentTile: null,
      main: null,
      key: 0
    }
  },
  computed: {
    ...mapGetters({
      getCategories: 'blavityCategories/getCategories',
      getCurrentCategory: 'blavityCategories/getCurrentCategory',
      getCurrentCategoryObject: 'blavityCategories/getCurrentCategoryObject'
    })
  },
  async asyncData ({ app, params, store }) {
    let currentCategory
    let articles
    let pentTile
    let main
    const categories = store.state.blavityCategories.categories
    try {
      const { category } = params
      let property
      let query
      if (category === 'news' || category === 'politics' || category === 'culture' || category === 'opinion') {
        property = category
        query = property
      } else if (category === 'lifestyle') {
        property = category
        query = 'life-style'
      } else {
        property = 'news'
        query = property
      }
      articles = await app.$axios.$get(`/articles/categories/${query}/6`)
      pentTile = await app.$axios.$get(`/articles/categories/${query}/8/3`)
      main = articles[0]
      store.commit('blavityCategories/setCurrentCategory', property)
      store.commit('blavityCategories/setCategoryArticles', property, articles)
    } catch (e) {
      store.commit('setErrorMessage', e)
    }
    currentCategory = categories[store.state.blavityCategories.currentCategory]
    return { currentCategory, categories, articles, pentTile, main }
  },
  async mounted () {

  }

}
</script>

<style lang="scss">
  @import '~/stylesheets/amp/pages/_category.scss';
</style>

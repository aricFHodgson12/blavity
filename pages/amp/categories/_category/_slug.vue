<template>
  <div class="category-page">
    <section class="category-page__header">
      <category-dropdown
        :category="currentCategory"
        should-open
      ></category-dropdown>
    </section>
    <div
      :key="key"
      class="main-row"
    >
      <section class="category-page__body">
        <div class="category-page__body__articles">
          <div
            class="category-page__body__articles__mobile"
          >
            <category-tile
              :key="key+5"
              :tile="main"
            ></category-tile>
          </div>
        </div>
        <div class="category-page__body__bottom">
          <category-pent-tile-view
            :articles="pentTile"
          ></category-pent-tile-view>
        </div>
      </section>
      <section>
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
import CategoryDropdown from '~/components/amp/category/CategoryDropdown'
import CategoryPentTileView from '~/components/amp/category/CategoryPagePentTile'
import AdLeaderboard from '~/components/amp/ad/AdLeaderboard'
import AdMobileSticky from '~/components/amp/ad/AdMobileSticky'
import CategoryTile from '~/components/amp/category/CategoryTile.vue'

export default {
  name: 'amp-sub-category-page',
  layout: 'amp',
  components: {
    CategoryDropdown,
    CategoryPentTileView,
    AdLeaderboard,
    AdMobileSticky,
    CategoryTile
  },
  head () {
    const { category, slug } = this.$route.params
    return {
      title: 'The Community for Black Creativity and News',
      bodyAttrs: {
        class: 'subCategory'
      },
      meta: [
        { property: 'og:title', content: `${_$capitalize(_$upperCase(slug))} | The Community for Black Creativity and News - Blavity` },
        { property: 'og:image', content: 'http://blavity.blavity.netdna-cdn.com/wp-content/uploads/2014/11/IMG_9764.jpg?d600af' },
        { property: 'keywords', content: `${_$capitalize(_$upperCase(slug))}, ${_$capitalize(_$upperCase(category))}, Blavity, Black Twitter, Black Lives Matter, Black Millennials, Black News` },
        { property: 'og:url', content: `https://blavity.com/categories/${category}/${slug}` },
        { property: 'og:description', content: 'Blavity is a tech company for forward thinking Black millennials pushing the boundaries of culture and the status quo.' },
        { name: 'twitter:title', content: `${_$capitalize(_$upperCase(slug))} | The Community for Black Creativity and News - Blavity` },
        { name: 'twitter:description', content: 'Blavity is a tech company for forward thinking Black millennials pushing the boundaries of culture and the status quo.' },
        { name: 'twitter:image', content: 'http://blavity.blavity.netdna-cdn.com/wp-content/uploads/2014/11/IMG_9764.jpg?d600af' }
      ],
      link: [
        { rel: 'canonical', href: '/categories/' + category + '/' + slug }
      ]
    }
  },
  data () {
    return {
      currentCategory: null,
      categories: null,
      articles: null,
      errorMessage: null,
      pentTile: null,
      key: 0,
      main: null
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
    let query
    const categories = store.state.blavityCategories.categories
    try {
      const { category } = params
      let property
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
      articles = await app.$axios.$get(`/articles/categories/${query}/5/0`)
      pentTile = await app.$axios.$get(`/articles/categories/${query}/8/3`)
      main = articles[0]
      // leave below for debugging
      // console.log(main)
      store.commit('blavityCategories/setCurrentCategory', property)
      store.commit('blavityCategories/setCategoryArticles', property, articles)
    } catch (e) {
      store.commit('setErrorMessage', e)
    }
    currentCategory = categories[store.state.blavityCategories.currentCategory]
    return { currentCategory, categories, articles, pentTile, main }
  },

  async mounted () {
    let subCategoryArticles
    const { slug } = this.$route.params
    let property = slug
    try {
      if (slug === 'music' || slug === 'World-News') {
        subCategoryArticles = await this.$axios.$get(`/articles/categories/${property}/1/0`)
        this.articles = [...subCategoryArticles, ...this.articles]
        this.main = this.articles[0]
      }
      this.key ++
    } catch (e) {
      this.errorMessage = e
    }
  }
}
</script>

<style lang="scss">
  @import '~/stylesheets/amp/pages/_category.scss';
</style>

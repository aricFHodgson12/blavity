<template>
  <div class="category-page">
    <section class="category-page__header">
      <category-dropdown :category="getCurrentCategoryObject"></category-dropdown>
    </section>
    <div class="main-row">
      <section class="category-page__body">
        <div class="category-page__body__articles">
          <div
            v-if="$mq !== 'mobile'"
            class="tri-tile"
          >
            <category-tri-tile
              :key="`${key}-tile`"
              :categories="getCategories"
              :current-category="getCurrentCategory"
              :current-articles="articles"
            ></category-tri-tile>
          </div>
          <div
            v-else
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
        v-if="$mq !== 'mobile'"
        class="category-page__sidebar"
      >
        <div class="category-page__sidebar__content">
          <div class="ad ad-rectangle-atf">
            <p>Advertisement</p>
            <no-ssr>
              <ad-base
                ad-type="rectangle"
                position="atf"
                :allow-tall="true"
                :category-slug="getCurrentCategoryObject.slug"
                :page="getCurrentCategoryObject.slug"
              ></ad-base>
            </no-ssr>
          </div>
          <div class="category-page__sidebar__content__mini-subscribe-box">
            <category-subscribe-box></category-subscribe-box>
          </div>
        </div>
      </section>
      <section
        v-if="$mq==='mobile'"
        class="mobile-section"
      >
        <no-ssr>
          <div class="ad ad-rectangle-atf">
            <p>Advertisement</p>
            <ad-base
              ad-type="leaderboard"
              position="atf"
              :category-slug="getCurrentCategoryObject.slug"
              :page="getCurrentCategoryObject.slug"
            ></ad-base>
          </div>
        </no-ssr>
      </section>
    </div>
    <div
      v-if="isViewportMobile && showSticky"
      class="ad-mobile-sticky"
    >
      <a
        class="close"
        href="javascript:void(0)"
        @click="close"
      >X</a>
      <no-ssr>
        <ad-base
          style="margin-top:10px;"
          ad-type="sticky"
          position="mobile"
          :category-slug="getCurrentCategoryObject.slug"
          :page="getCurrentCategoryObject.slug"
        >
        </ad-base>
      </no-ssr>
    </div>
  </div>
</template>

<script>
import _$capitalize from 'lodash/capitalize'
import _$upperCase from 'lodash/upperCase'
import { mapGetters } from 'vuex'
import CategoryTile from '~/components/category/CategoryTile'
import CategoryTriTile from '~/components/category/CategoryTriTile'
import CategoryDropdown from '~/components/category/CategoryDropdown'
import CategoryPentTileView from '~/components/category/CategoryPagePentTile'
import CategorySubscribeBox from '~/components/CategorySubscribeBox'

export default {
  name: 'category-page',
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
      ]
    }
  },
  components: {
    CategoryDropdown,
    CategoryPentTileView,
    CategoryTriTile,
    CategorySubscribeBox,
    CategoryTile
  },
  data () {
    return {
      categories: null,
      articles: null,
      pentTile: null,
      main: null,
      key: 0,
      showSticky: true
    }
  },
  computed: {
    isViewportMobile () {
      return (this.$mq === 'mobile')
    },
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
    const { category } = params
    try {
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
      [articles, pentTile] = await Promise.all([
        app.$axios.$get(`/articles/categories/${query}/6`),
        app.$axios.$get(`/articles/categories/${query}/8/3`)
      ])
      main = articles[0]
      store.commit('blavityCategories/setCurrentCategory', property)
      store.commit('blavityCategories/setCategoryArticles', property, articles)
    } catch (e) {
      store.commit('setErrorMessage', e)
    }
    currentCategory = categories[store.state.blavityCategories.currentCategory]
    return { currentCategory, categories, articles, pentTile, main, category }
  },
  async mounted () {
    if (this.category.toLowerCase() === 'politics') {
      window.location.assign('https://politics.blavity.com')
    }
  },
  methods: {
    close () {
      this.showSticky = false
    }
  }
}
</script>

<style lang="scss">
  @import '~/stylesheets/pages/_category.scss';
</style>

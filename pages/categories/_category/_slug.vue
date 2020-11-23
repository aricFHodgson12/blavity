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
            v-if="$mq !== 'mobile'"
            class="tri-tile"
          >
            <category-tri-tile
              :key="`${key}-tile`"
              :categories="getCategories"
              :current-category="getCurrentCategory"
              :current-articles="currentArticles"
            ></category-tri-tile>
          </div>
          <div
            v-else
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
import CategoryTriTile from '~/components/category/CategoryTriTile'
import CategoryDropdown from '~/components/category/CategoryDropdown'
import CategoryPentTileView from '~/components/category/CategoryPagePentTile'
import CategorySubscribeBox from '~/components/CategorySubscribeBox'
import CategoryTile from '~/components/category/CategoryTile.vue'

export default {
  name: 'sub-category-page',
  components: {
    CategoryDropdown,
    CategoryPentTileView,
    CategoryTriTile,
    CategorySubscribeBox,
    CategoryTile
  },
  head () {
    return {
      title: 'The Community for Black Creativity and News',
      bodyAttrs: {
        class: 'subCategory'
      },
      meta: [
        { property: 'og:title', content: `${_$capitalize(_$upperCase(this.$route.params.slug))} | The Community for Black Creativity and News - Blavity` },
        { property: 'og:image', content: 'http://blavity.blavity.netdna-cdn.com/wp-content/uploads/2014/11/IMG_9764.jpg?d600af' },
        { property: 'keywords', content: `${_$capitalize(_$upperCase(this.$route.params.slug))}, ${_$capitalize(_$upperCase(this.$route.params.category))}, Blavity, Black Twitter, Black Lives Matter, Black Millennials, Black News` },
        { property: 'og:url', content: `https://blavity.com/categories/${this.$route.params.category}/${this.$route.params.slug}` },
        { property: 'og:description', content: 'Blavity is a tech company for forward thinking Black millennials pushing the boundaries of culture and the status quo.' },
        { name: 'twitter:title', content: `${_$capitalize(_$upperCase(this.$route.params.slug))} | The Community for Black Creativity and News - Blavity` },
        { name: 'twitter:description', content: 'Blavity is a tech company for forward thinking Black millennials pushing the boundaries of culture and the status quo.' },
        { name: 'twitter:image', content: 'http://blavity.blavity.netdna-cdn.com/wp-content/uploads/2014/11/IMG_9764.jpg?d600af' }
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
      main: null,
      showSticky: true
    }
  },

  computed: {
    currentArticles () {
      return this.articles
    },

    ...mapGetters({
      getCategories: 'blavityCategories/getCategories',
      getCurrentCategory: 'blavityCategories/getCurrentCategory',
      getCurrentCategoryObject: 'blavityCategories/getCurrentCategoryObject'
    }),

    isViewportMobile () {
      return (this.$mq === 'mobile')
    }
  },

  async asyncData ({ app, params, store }) {
    let currentCategory
    let articles
    let pentTile
    let main
    let query
    const categories = store.state.blavityCategories.categories
    try {
      const { category, slug } = params
      let property
      let sub
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
      if (
        slug === 'music' ||
          slug === 'World-News' ||
          slug === 'HBCU-News' ||
          slug === 'Books' ||
          slug === 'business-entrepreneurship' ||
          slug === 'Art' ||
          slug === 'Tech-Policy' ||
          slug === '2020-Election' ||
          slug === 'Environmentalism' ||
          slug === 'Immigration' ||
          slug === 'LGBT' ||
          slug === 'Social-Justice') {
        sub = `${slug}`
      } else {
        switch (slug.toLowerCase().split('-').join('')) {
          case 'music':
            sub = `music`
            break
          case `worldnews`:
            sub = `World-News`
            break
          case `hbcunews`:
            sub = `HBCU-News`
            break
          case `books`:
            sub = `Books`
            break
          case `business`:
            sub = `business-entrepreneurship`
            break
          case `entrepreneurship`:
            sub = `business-entrepreneurship`
            break
          case `art`:
            sub = `Art`
            break
          case `techpolicy`:
            sub = `Tech-Policy`
            break
          case `election`:
            sub = `2020-Election`
            break
          case `2020election`:
            sub = `2020-Election`
            break
          case `environmentalism`:
            sub = `Environmentalism`
            break
          case `immigration`:
            sub = `Immigration`
            break
          case `socialjustice`:
            sub = `Social-Justice`
            break
          case `dance`:
            sub = `Dance,${query}`
            break
          case `lgbt`:
            sub = `LGBT,${query}`
            break
          case `loveandrelationships`:
            sub = `Love-and-Relationships,${query}`
            break
          case `wellness`:
            sub = `Wellness,${query}`
            break
          case `gender`:
            sub = `Gender,${query}`
            break
          case `oped`:
            sub = `community-submitted,editorial-desk`
            break
          default:
            sub = query
        }
      }
      [articles, pentTile] = await Promise.all([
        app.$axios.$get(`/articles/categories/${sub}/5/0`),
        app.$axios.$get(`/articles/categories/${sub}/8/3`)
      ])
      main = articles[0]
      // leave below for debugging
      // console.log(main)
      store.commit('blavityCategories/setCurrentCategory', property)
      store.commit('blavityCategories/setCategoryArticles', property, articles)
    } catch (e) {
      store.commit('setErrorMessage', e)
    }
    currentCategory = categories[store.state.blavityCategories.currentCategory]
    return { currentCategory, categories, articles, pentTile, main, query }
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

<template>
  <div class="query-page transition-container">
    <div class="search-row">
      <div class="search-results">
        <search-results
          :articles="articles"
          :query="query"
        >
        </search-results>
        <div class="line"></div>
        <div class="ad-one">
          <no-ssr>
            <ad-base
              ad-type="rectangle"
              position="btf"
              :allow-tall="false"
            >
            </ad-base>
          </no-ssr>
        </div>
        <div class="line"></div>
      </div>
      <div class="col-4 align-self-start advertisement">
        <div class="ad-two">
          <no-ssr>
            <ad-base
              ad-type="rectangle"
              position="atf"
              :allow-tall="false"
            >
            </ad-base>
          </no-ssr>
        </div>
        <div class="around-blavity">
          <around-blavity-component
            :brands="brands"
          >
          </around-blavity-component>
        </div>
      </div>
    </div>
    <section class="discover-more">
      <div class="container">
        <DiscoverMore
          :articles="discoverMore"
        >
        </DiscoverMore>
      </div>
    </section>
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
        >
        </ad-base>
      </no-ssr>
    </div>
  </div>
</template>

<script>
import _$slice from 'lodash/slice'
import SearchResults from '~/components/search/SearchResults'
import DiscoverMore from '~/components/DiscoverMore'
import AroundBlavityComponent from '~/components/AroundBlavityComponent'

let brands = [
  {
    site: 'afrotech',
    urlbase: 'afrotech',
    logoUrl: 'https://storage.googleapis.com/blavitynews/assets/Icons/afrotech-icon%402x.png',
    article: {}
  },
  {
    site: 'tn',
    urlbase: 'travelnoire',
    logoUrl: 'https://storage.googleapis.com/blavitynews/assets/Icons/tn-icon%402x.png',
    article: {}
  },
  {
    site: 'sa',
    urlbase: 'shadowandact',
    logoUrl: 'https://storage.googleapis.com/blavitynews/assets/Icons/sa-icon%402x.png',
    article: {}
  },
  {
    site: '21Ninety',
    urlbase: '21Ninety',
    logoUrl: 'https://storage.googleapis.com/blavitynews/assets/Icons/21n-icon%402x.png',
    article: {}
  },
  {
    site: 'blavity',
    urlbase: 'blavity',
    logoUrl: 'https://storage.googleapis.com/blavitynews/assets/Icons/inc-icon%402x.png',
    article: {}
  }
]

export default {
  name: 'query-page',
  components: {
    SearchResults,
    DiscoverMore,
    AroundBlavityComponent
  },
  data () {
    return {
      articles: [],
      query: null,
      brands: [],
      moreArticles: [],
      discoverMore: [],
      showSticky: true
    }
  },
  computed: {
    isViewportMobile () {
      return (this.$mq === 'mobile')
    }
  },
  async asyncData ({ app, error, params }) {
    const { query } = params
    try {
      let [
        discoverMore,
        articles,
        afroTechArticle,
        shadowArticle,
        twentyOneArticle,
        moreArticles
      ] = await Promise.all([
        app.$axios.$get('/trending_articles'),
        app.$axios.$get(`/articles/search/${query}/0/5`),
        app.$axios.$get('https://api.blavity.io/articles', {
          params: {
            count: 1,
            site: 'afrotech',
            sort: 'newer'
          }
        }),
        app.$axios.$get('https://api.shadowandact.com/v1/articles/1'),
        app.$axios.$get('https://api.21ninety.com/v1/articles/1'),
        app.$axios.$get('/articles/4/0')
      ])
      discoverMore = _$slice(discoverMore, 0, 3)
      const travelNoireArticle = [
        {
          'slug': 'hidden-gem-black-owned-restaurants-atlanta',
          'title': '10 Hidden Gem Black-Owned Restaurants In Atlanta'
        }
      ]
      const blavityArticle = [
        {
          'slug': 'https://blavityinc.com/careers',
          'title': 'Careers At Blavity, Inc.'
        }
      ]
      for (let i = 0; i < brands.length; i ++) {
        switch (brands[i].site) {
          case 'tn':
            brands[i].article = travelNoireArticle[0]
            break
          case 'afrotech':
            brands[i].article = afroTechArticle[0]
            break
          case 'sa':
            brands[i].article = shadowArticle[0]
            break
          case '21Ninety':
            brands[i].article = twentyOneArticle[0]
            break
          case 'blavity':
            brands[i].article = blavityArticle[0]
        }
      }
      return { articles, query, brands, moreArticles, discoverMore }
    } catch (e) {
      error(e)
    }
  },
  methods: {
    close () {
      this.showSticky = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/stylesheets/pages/_query.scss';
</style>

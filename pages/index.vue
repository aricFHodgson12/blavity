<template>
  <div class="home-page">
    <div
      v-if="isViewportMobile"
      class="ad ad-leaderboard-atf"
    >
      <p>Advertisement</p>
      <no-ssr>
        <ad-base
          ad-type="leaderboard"
          position="atf"
          page="home"
        ></ad-base>
      </no-ssr>
    </div>
    <div class="home-page__home-top-view">
      <div
        v-if="!isViewportMobile"
        class="home-page__home-top-view__sidebar-one"
      >
        <div
          class="home-page__home-top-view__sidebar-one__inner"
        >
          <div id="sticky">
            <div class="ad ad-rectangle-atf">
              <p>Advertisement</p>
              <no-ssr>
                <ad-base
                  ad-type="rectangle"
                  position="atf"
                  :allow-tall="false"
                  page="home"
                >
                </ad-base>
              </no-ssr>
            </div>
            <div class="home-page__home-top-view__sidebar-one__most-popular">
              <no-ssr>
                <TrendingComponent
                  :count="count"
                  :articles="trendingArticles"
                >
                </TrendingComponent>
              </no-ssr>
            </div>
          </div>
        </div>
      </div>
      <div class="home-page__home-top-view__home-categories">
        <div
          class="home-page__home-top-view__home-categories__tri-tile-w-menu"
        >
          <top-stories
            :key="topStoriesKey"
            :categories="cloneOfCategories"
            :current-category="$store.state.blavityCategories.currentCategory"
            @key-change="topStoriesKey ++"
          >
          </top-stories>
        </div>
        <div class="home-page__home-top-view__home-categories__subscribe-box">
          <SubscribeBoxComponent></SubscribeBoxComponent>
        </div>
        <div
          v-if="!isViewportMobile"
          class="ad ad-leaderboard-atf"
        >
          <p>Advertisement</p>
          <no-ssr>
            <ad-base
              ad-type="leaderboard"
              position="atf"
              page="home"
            ></ad-base>
          </no-ssr>
        </div>
      </div>
    </div>
    <div class="home-page__blavity-original-slider">
      <no-ssr>
        <blavity-original-carousel-component
          :count="count"
          :articles="carouselArticles"
        ></blavity-original-carousel-component>
      </no-ssr>
    </div>
    <div
      v-if="isViewportMobile"
      class="ad ad-rectangle-atf"
    >
      <p>Advertisement</p>
      <no-ssr>
        <ad-base
          ad-type="rectangle"
          position="atf"
          page="home"
        ></ad-base>
      </no-ssr>
    </div>
    <div class="home-page__home-bottom-view">
      <div
        v-if="!isViewportMobile"
        class="home-page__home-bottom-view__sidebar-two"
      >
        <div class="home-page__home-bottom-view__sidebar-two__around-blavity">
          <no-ssr>
            <around-blavity-component
              :brands="brands"
            >
            </around-blavity-component>
          </no-ssr>
        </div>
        <div class="home-page__home-bottom-view__sidebar-two__line-two"></div>
        <div class="ad ad-rectangle-btf">
          <no-ssr>
            <ad-base
              ad-type="rectangle"
              position="btf"
              page="home"
            ></ad-base>
          </no-ssr>
        </div>
      </div>
      <div class="home-page__home-bottom-view__home-more">
        <div class="home-page__home-bottom-view__home-more__more-current-news">
          <no-ssr>
            <ReusablePentTile
              :most-current-news-articles="mostCurrentNewsArticles"
            >
            </ReusablePentTile>
          </no-ssr>
        </div>
        <div class="home-page__home-bottom-view__home-more__line-three"></div>
      </div>
    </div>
    <div
      v-if="!isViewportMobile"
      class="ad ad-leaderboard-btf"
    >
      <p class="advertisement-label">
        Advertisement
      </p>
      <no-ssr>
        <ad-base
          ad-type="leaderboard"
          position="btf"
          :allow-tall="false"
          page="home"
        ></ad-base>
      </no-ssr>
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
          ad-type="sticky"
          position="mobile"
          page="home"
        ></ad-base>
      </no-ssr>
    </div>
    <section
      class="watch-on-blavity"
    >
      <videos
        :videos="videos"
        title="Watch On Blavity"
      ></videos>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _$clone from 'lodash/clone'
import _$slice from 'lodash/slice'
import TopStories from '~/components/top-stories/TopStories'
import TrendingComponent from '~/components/TrendingComponent'
import SubscribeBoxComponent from '~/components/SubscribeBoxComponent'
import ReusablePentTile from '~/components/ReusablePentTile'
import BlavityOriginalCarouselComponent from '~/components/BlavityOriginalCarouselComponent'
import AroundBlavityComponent from '~/components/AroundBlavityComponent'
import Videos from '~/components/home/Videos'

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
    urlbase: 'blavityinc',
    logoUrl: 'https://storage.googleapis.com/blavitynews/assets/Icons/inc-icon%402x.png',
    article: {}
  }
]

export default {
  name: 'home',
  components: {
    TopStories,
    TrendingComponent,
    SubscribeBoxComponent,
    ReusablePentTile,
    BlavityOriginalCarouselComponent,
    AroundBlavityComponent,
    Videos
  },
  layout: 'default',
  data () {
    return {
      brands: [],
      trendingArticles: [],
      carouselArticles: [],
      counting: null,
      mostCurrentNewsArticles: [],
      errorMessage: null,
      topStoriesKey: 0,
      videos: [],
      showVideos: false,
      showSticky: true
    }
  },
  head () {
    return {
      title: 'The Community for Black Creativity and News',
      bodyAttrs: {
        class: 'page-home'
      },
      meta: [
        { property: 'og:title', content: `The Community for Black Creativity and News - Blavity` },
        { property: 'og:image', content: 'http://blavity.blavity.netdna-cdn.com/wp-content/uploads/2014/11/IMG_9764.jpg?d600af' },
        { property: 'keywords', content: 'Blavity, Black Twitter, Black Lives Matter, Black Millennials, Black News' },
        { property: 'og:url', content: 'https://blavity.com' },
        { property: 'og:description', content: 'Blavity is a tech company for forward thinking Black millennials pushing the boundaries of culture and the status quo.' },
        { name: 'twitter:title', content: `The Community for Black Creativity and News - Blavity` },
        { name: 'twitter:description', content: 'Blavity is a tech company for forward thinking Black millennials pushing the boundaries of culture and the status quo.' },
        { name: 'twitter:image', content: 'http://blavity.blavity.netdna-cdn.com/wp-content/uploads/2014/11/IMG_9764.jpg?d600af' }
      ]
    }
  },
  computed: {
    isViewportMobile () {
      return (this.$mq === 'mobile')
    },
    count () {
      return this.trendingArticles.length
    },
    cloneOfCategories () {
      const categoryClones = _$clone(this.categories)
      return categoryClones.filter((value, index, array) => {
        return (value.slug !== 'specials' && value.slug !== 'watch')
      })
    },
    ...mapGetters({
      getArticles: 'blavityCategories/getSpecificArticles',
      categories: 'blavityCategories/getCategories'
    })
  },
  methods: {
    close () {
      this.showSticky = false
    }
  },
  async asyncData ({ app, store, error }) {
    try {
      let [newsArticles,
        politicsArticles,
        cultureArticles,
        lifestyleArticles,
        opinionArticles,
        articles,
        trending,
        blavityOriginal1,
        blavityOriginal2,
        videoObject
      ] = await Promise.all([
        app.$axios.$get('articles/categories/news,HBCU-News,World-News,business-entrepreneurship/6/'),
        app.$axios.$get('articles/categories/politics,2020-Election,Social-Justice,Environmentalism,Immigration,Tech-Policy/6/'),
        app.$axios.$get('articles/categories/culture,Art,Books,music,Dance/6/'),
        app.$axios.$get('articles/categories/life-style,Gender,Wellness,Love-and-Relationships,LGBT/6/'),
        app.$axios.$get('articles/categories/opinion,community-submitted/6/'),
        app.$axios.$get('articles/10/3'),
        app.$axios.$get('trending_articles'),
        app.$axios.$get('/articles/tags/blavity-original/10/0'),
        app.$axios.$get('/articles/tags/Blavity-Original/5/0'),
        app.$axios.$get('https://cdn.jwplayer.com/v2/playlists/UnlQ08zS%3Frecommendations_playlist_id=2l8riQTs')
      ])
      const videos = videoObject['playlist']
      const carouselArticles = [blavityOriginal1.shift(), blavityOriginal2.shift(), ...blavityOriginal1, ...blavityOriginal2]
      const homeArticles = {
        newsArticles,
        politicsArticles,
        cultureArticles,
        lifestyleArticles,
        opinionArticles
      }
      for (let list in homeArticles) {
        if (homeArticles[list].length < 5) {
          homeArticles[list] = [...homeArticles[list], ..._$slice(trending, 4, 9)]
        }
      }
      store.commit('blavityCategories/setTopStories', homeArticles)
      store.commit('blavityCategories/setArticles', newsArticles)
      store.commit('blavityCategories/setCurrentCategory', 'news')

      const mostCurrentNewsArticles = _$slice(articles, 0, 5)

      const trendingArticles = _$slice(trending, 0, 5)

      const afroTechArticle = [
        {
          slug: 'jay-z-is-hip-hops-first-billionaire',
          title: 'Jay-Z Is Hip-Hop&#8217;s First Billionaire'
        }
      ]
      const travelNoireArticle = [
        {
          slug: 'hidden-gem-black-owned-restaurants-atlanta',
          title: '10 Hidden Gem Black-Owned Restaurants In Atlanta'
        }
      ]
      const shadowArticle = [
        { slug: 'an-explanation-of-the-cousin-oliver-trope-and-7-times-its-appeared-in-black-sitcoms',
          title: 'An Explanation Of The \'Cousin Oliver\' Trope And 7 Times It\'s Appeared In Black Sitcoms'
        }
      ]
      const twentyOneArticle = [
        {
          slug: 'planned-parenthood-is-standing-with-black-women-in-the-fight-for-reproductive-freedom',
          title: 'Planned Parenthood Is Standing With Black Women In The Fight For Reproductive Freedom'
        }
      ]
      const blavityArticle = [
        {
          'slug': 'careers',
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
      return { trendingArticles, mostCurrentNewsArticles, carouselArticles, brands, videos }
    } catch (e) {
      // leave below for debugging
      // console.log(e)
      error(e)
    }
  }
}
</script>

<style lang="scss">
  @import '~/stylesheets/pages/_home.scss';
</style>

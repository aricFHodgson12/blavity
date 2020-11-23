<template>
  <div class="home-page">
    <div
      class="ad ad-leaderboard"
    >
      <p>Advertisement</p>
      <AdLeaderboard
        page="home"
      ></AdLeaderboard>
    </div>
    <div
      v-show="sponsoredCampaignExists"
      class="sponsored-campaign"
    >
      <sponsored-campaign-component
        :sponsored-articles="sponsoredArticles"
      >
      </sponsored-campaign-component>
    </div>
    <div
      class="ad ad-rectangle"
    >
      <p>Advertisement</p>
      <AdRectangle
        page="home"
      ></AdRectangle>
    </div>
    <div class="home-bottom-view">
      <div class="home-more">
        <div class="more-current-news">
          <ReusablePentTile
            :most-current-news-articles="mostCurrentNewsArticles"
          >
          </ReusablePentTile>
        </div>
        <div class="line-three"></div>
      </div>
    </div>
    <AdMobileSticky
      page="home"
    ></AdMobileSticky>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _$clone from 'lodash/clone'
import _$slice from 'lodash/slice'
// import TopStories from '~/components/top-stories/TopStories'
import ReusablePentTile from '~/components/amp/ReusablePentTile'
// import BlavityOriginalCarouselComponent from '~/components/BlavityOriginalCarouselComponent'
import AdRectangle from '~/components/amp/ad/AdRectangle'
import AdLeaderboard from '~/components/amp/ad/AdLeaderboard'
import AdMobileSticky from '~/components/amp/ad/AdMobileSticky'
import SponsoredCampaignComponent from '~/components/amp/sponsored/SponsoredCampaignComponent'

export default {
  name: 'amp-home',
  layout: 'amp',
  components: {
    // TopStories,
    ReusablePentTile,
    // BlavityOriginalCarouselComponent,
    SponsoredCampaignComponent,
    AdRectangle,
    AdLeaderboard,
    AdMobileSticky
  },
  data () {
    return {
      trendingArticles: [],
      carouselArticles: [],
      counting: null,
      mostCurrentNewsArticles: [],
      errorMessage: null,
      sponsoredCampaign: true,
      sponsoredArticles: [],
      sponsoredArticle: {},
      topStoriesKey: 0
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
      ],
      link: [
        { rel: 'canonical', href: '/' }
      ]
    }
  },
  computed: {
    count () {
      return this.trendingArticles.length
    },
    sponsoredCampaignExists () {
      if (this.sponsoredArticles.length >= 5) {
        return this.sponsoredCampaign
      } else return ! this.sponsoredCampaign
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
  async asyncData ({ app, store, error }) {
    try {
      let [newsArticles,
        politicsArticles,
        cultureArticles,
        lifestyleArticles,
        opinionArticles,
        articles,
        trending
      ] = await Promise.all([
        app.$axios.$get('articles/6/'),
        app.$axios.$get('articles/categories/politics/6/'),
        app.$axios.$get('articles/categories/culture/6/'),
        app.$axios.$get('articles/categories/life-style/6/'),
        app.$axios.$get('articles/categories/opinion/6/'),
        app.$axios.$get('articles/10/3'),
        app.$axios.$get('trending_articles')
      ])

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
      const carouselArticles = await app.$axios.$get('/articles/tags/blavity-original/5/0')

      const sponsoredArticles = await app.$axios.$get('/articles/tags/Toyota-sponsored/5/0')
      const sponsoredArticle = [sponsoredArticles[0]]
      return { trendingArticles, mostCurrentNewsArticles, carouselArticles, sponsoredArticles, sponsoredArticle }
    } catch (e) {
      // leave below for debugging
      // console.log(e)
      error(e)
    }
  },
  mounted () {
    // add api calls for around blavity
  }
}
</script>

<style lang="scss">
  @import '~/stylesheets/amp/pages/_home.scss';
</style>

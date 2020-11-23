<template>
  <div class="author-page">
    <div
      v-if="!isViewportMobile"
      class="author-page__author"
    >
      <div
        class="author-page__author__avatar"
        :style="authorImage"
      >
      </div>
      <div class="author-page__author__details">
        <div class="author-page__author__details__name">
          <span>{{ name }}</span>
          <span
            v-show="blavityStaff"
            class="status"
            :style="staffStatus"
          >
          </span>
        </div>
        <div class="author-page__author__details__start">
          Writing since <span> {{ start }} </span>
        </div>
        <div class="author-page__author__details__bio">
          {{ bio }}
        </div>
        <div class="author-page__author__details__social">
          <span class="follow">Follow {{ firstName }}</span>
          <a
            v-show="hasInstagram !== null"
            :href="hasInstagram"
          >
            <span :style="igIcon"></span>
          </a>
          <a
            v-show="hasTwitter !== null"
            :href="hasTwitter"
          >
            <span :style="twitterIcon"></span>
          </a>
          <a
            v-show="hasFB !== null"
            :href="hasFB"
          >
            <span :style="facebook"></span>
          </a>
        </div>
      </div>
    </div>
    <div
      v-else
      class="author-page__author"
      style="display: flex; order: 1;"
    >
      <div class="mobile-row-1">
        <div
          class="author-page__author__avatar"
          :style="authorImage"
        >
        </div>
        <div class="author-page__author__details">
          <div class="author-page__author__details__name">
            <span>{{ name }}</span>
          </div>
          <div
            v-show="blavityStaff"
            class="author-page__author__details__status-mobile"
            :style="staffStatusMobile"
          >
          </div>
        </div>
      </div>
      <div class="mobile-row-2">
        <div
          class="author-page__author__details__bio"
          style="display:flex ; order: 2;"
        >
          {{ bio }}
        </div>
      </div>
      <div
        class="author-page__author__details__social"
        style="display:flex ; order: 3;"
      >
        <span class="follow">Follow {{ firstName }}</span>
        <a
          v-show="hasInstagram !== null"
          :href="hasInstagram"
        >
          <span :style="igIconMobile"></span>
        </a>
        <a
          v-show="hasTwitter !== null"
          :href="hasTwitter"
        >
          <span :style="twitterIconMobile"></span>
        </a>
        <a
          v-show="hasFB !== null"
          :href="hasFB"
        >
          <span :style="facebookMobile"></span>
        </a>
      </div>
    </div>
    <hr id="author-line">
    <div class="author-row">
      <div class="author-results">
        <author-results
          :articles="articles"
          :first-name="firstName"
          :has-more="hasMoreArticles"
          @load-more="loadMoreArticles"
        >
        </author-results>
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
      <div class="col-4 align-self-start advertisement-column">
        <div class="advertisement-content">
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
          <div class="mini-subscribe-box">
            <category-subscribe-box></category-subscribe-box>
          </div>
        </div>
      </div>
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
        >
        </ad-base>
      </no-ssr>
    </div>
    <div
      v-show="isViewportMobile"
      class="sponsored-content"
    >
      <hr style="height: 2px; width: 98vw; background-color: #000000;">
      <sponsored-content-single
        :sponsored-article="sponsoredArticle"
      >
      </sponsored-content-single>
    </div>
  </div>
</template>

<script>
import _$split from 'lodash/split'
import _$endsWith from 'lodash/endsWith'
import _$startsWith from 'lodash/startsWith'
import _$replace from 'lodash/replace'
import moment from 'moment'
import AuthorResults from '~/components/author/AuthorResults'
import CategorySubscribeBox from '~/components/CategorySubscribeBox'
import SponsoredContentSingle from '~/components/SponsoredContentSingle'

const statusUrl = 'https://storage.googleapis.com/blavitynews/assets/images/staff-status2x.png'
const instagram = 'https://storage.googleapis.com/blavitynews/assets/images/social-share/instagram-icon-dark%402x.png'
const twitter = 'https://storage.googleapis.com/blavitynews/assets/images/social-share/twitter-icon-dark%402x.png'
const faceBook = 'https://storage.googleapis.com/blavitynews/assets/images/social-share/facebook-dark.svg'

const count = 5
const perPage = 3

export default {
  name: 'author-page',
  components: {
    AuthorResults,
    CategorySubscribeBox,
    SponsoredContentSingle
  },
  head () {
    return {
      title: this.heading,
      meta: [
        { property: 'og:title', content: `${this.heading} - Blavity` },
        { property: 'og:description', content: this.bio },
        { property: 'og:image', content: this.ogImage },
        { name: 'twitter:title', content: `${this.heading} - Blavity` },
        { name: 'twitter:description', content: this.bio },
        { name: 'twitter:image', content: this.ogImage }
      ]
    }
  },
  data () {
    return {
      showSticky: true,
      articles: [],
      sponsoredArticle: [],
      heading: 'Blavity',
      ogImage: null,
      name: null,
      firstName: null,
      username: null,
      blavityStaff: null,
      start: null,
      bio: null,
      hasInstagram: null,
      hasTwitter: null,
      hasFB: null,
      preference: null,
      gravatar: null,
      hasMoreArticles: false,
      authorImage: {
        backgroundImage: 'url(' + null + ')'
      },
      staffStatus: {
        backgroundImage: 'url(' + statusUrl + ')',
        order: '2',
        width: '6rem',
        height: '2rem',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        display: 'inline-block',
        marginLeft: '1rem',
        marginTop: '.75rem'
      },
      staffStatusMobile: {
        backgroundImage: 'url(' + statusUrl + ')'
      },
      igIcon: {
        backgroundImage: 'url(' + instagram + ')',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height: '1rem',
        width: '1rem',
        order: '1',
        marginLeft: '1rem',
        marginBottom: '8px',
        display: 'inline-block'
      },
      twitterIcon: {
        backgroundImage: 'url(' + twitter + ')',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height: '1rem',
        width: '1rem',
        order: '2',
        marginLeft: '1rem',
        marginBottom: '8px',
        display: 'inline-block'
      },
      facebook: {
        backgroundImage: 'url(' + faceBook + ')',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height: '1rem',
        width: '1rem',
        order: '3',
        marginLeft: '1rem',
        marginBottom: '.5rem',
        display: 'inline-block'
      },
      igIconMobile: {
        backgroundImage: 'url(' + instagram + ')',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height: '1.5rem',
        width: '1.5rem',
        order: '1',
        marginLeft: '3.5rem',
        marginBottom: '8px',
        display: 'inline-block'
      },
      twitterIconMobile: {
        backgroundImage: 'url(' + twitter + ')',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height: '1.5rem',
        width: '1.5rem',
        order: '2',
        marginLeft: '2.5rem',
        marginBottom: '8px',
        display: 'inline-block'
      },
      facebookMobile: {
        backgroundImage: 'url(' + faceBook + ')',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height: '1.5rem',
        width: '1.5rem',
        order: '3',
        marginLeft: '2.5rem',
        marginBottom: '.5rem',
        display: 'inline-block'
      }
    }
  },
  computed: {
    isViewportMobile () {
      return (this.$mq === 'mobile')
    }
  },

  async asyncData ({ app, error, params }) {
    let username
    const { name } = params
    if (! params.username) {
      username = _$replace(name, ' ', '%20')
    } else {
      username = params.username
    }
    try {
      const articles = await app.$axios
        .$get(`/articles/authors/${username}/${count}/0`
        // For testing
        // .$get(`/articles/search/beyonce/0/5`
        )
      const hasMoreArticles = articles.length === count
      const sponsoredArticle = await app.$axios
        .$get('/articles/tags/Toyota-sponsored/1/0')
      let firstName
      let heading
      let blavityStaff = _$endsWith(articles[0]._author.email, 'blavity.com')
      let bio = articles[0]._author.bio
      let preference = articles[0]._author.profileImagePreference
      let gravatar = articles[0]._author.gravatar
      let hasInstagram = articles[0]._author.instagramProfileUrl
      let hasTwitter = articles[0]._author.twitterProfileUrl
      let hasFB = articles[0]._author.facebookProfileUrl
      let start = moment(articles[0]._author.created_at).format('MMMM YYYY')
      if (articles[0]._author.display_name) {
        const { display_name: displayName } = articles[0]._author
        firstName = _$split(displayName, ' ', 1)[0]
        heading = displayName
      } else {
        firstName = _$split(name, ' ', 1)[0]
        heading = name
      }
      return { heading, articles, sponsoredArticle, name, firstName, preference, gravatar, blavityStaff, bio, hasInstagram, hasTwitter, hasFB, start, username, hasMoreArticles }
    } catch (e) {
      error(e)
    }
  },

  mounted () {
    if (this.preference === null || undefined) {
      this.authorImage.backgroundImage = 'url(' + 'https://www.gravatar.com/avatar/18af7cc36f95260c805b2daf843c459c?d=&s=200' + ')'
      this.ogImage = 'https://www.gravatar.com/avatar/18af7cc36f95260c805b2daf843c459c?d=&s=200'
    } else if (this.preference === 'gravatar') {
      this.authorImage.backgroundImage = 'url(' + this.gravatar + ')'
      this.ogImage = this.gravatar
    } else if (_$startsWith(this.preference, 'https')) {
      this.authorImage.backgroundImage = 'url(' + this.preference + ')'
      this.ogImage = this.preference
    } else {
      this.authorImage.backgroundImage = 'url(' + `https://res.cloudinary.com/blavity/image/upload/c_thumb,g_center,w_300,h_300,q_auto:best,g_south_east,x_0/${this.preference}` + ')'
      this.ogImage = `https://res.cloudinary.com/blavity/image/upload/c_thumb,g_center,w_300,h_300,q_auto:best,g_south_east,x_0/${this.preference}`
    }
  },
  methods: {
    close () {
      this.showSticky = false
    },

    async loadMoreArticles () {
      const offset = this.articles.length

      try {
        const articles = await this.$axios.$get(`/articles/authors/${this.username}/${perPage}/${offset}`)

        this.hasMoreArticles = articles.length === perPage
        this.articles = [...this.articles, ...articles]
      } catch {
        this.hasMoreArticles = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/stylesheets/pages/_author.scss';
</style>

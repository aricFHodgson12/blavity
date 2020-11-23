<template>
  <div class="tag-page">
    <section class="tag-page__header">
      <span
        v-if="$mq !== 'mobile'"
        class="tag-page__header__heading__text"
      >
        {{ titleTag }}
      </span>
      <span
        v-if="$mq === 'mobile'"
        class="tag-page__header__mobile__heading__text"
      >
        {{ titleTag }}
      </span>
    </section>
    <div class="main-row">
      <section
        v-if="$mq !== 'mobile'"
        class="tag-page__body"
      >
        <div
          :v-if="articles.length>0"
          class="tag-page__body__articles"
        >
          <div class="first-tri">
            <div
              :v-if="articles.length>0"
              class="first-tri-inner"
            >
              <nuxt-link :to="'/'+articles[0].slug">
                <img
                  :src="featuredImage(articles[0],'jpg')"
                >
              </nuxt-link>
              <nuxt-link :to="'/categories/'+articles[0].categories[0].slug">
                <span>{{ articles[0].categories[0].name }}</span>
              </nuxt-link>
              <div class="inner-title">
                <nuxt-link :to="'/'+articles[0].slug">
                  {{ articles[0].title }}
                </nuxt-link>
              </div>
            </div>
            <div>
              <div
                v-for="( article, index ) in twoArticles"
                :key="index"
                class="first-tri-sub"
              >
                <nuxt-link :to="'/'+article.slug">
                  <img
                    :src="featuredImage(article,'jpg')"
                  >
                </nuxt-link>
                <div class="tri-sub-title">
                  <nuxt-link :to="'/categories/'+article.categories[0].slug">
                    {{ articles[1].categories[0].name }}
                  </nuxt-link>
                </div>
                <p class="tri-sub-text">
                  <nuxt-link :to="'/'+article.slug">
                    {{ article.title }}
                  </nuxt-link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="tag-page__body__bottom">
          <div class="bottom-tri">
            <div
              v-for="( article, index ) in threeArticles"
              :key="index"
              class="bottom-tri-sub"
            >
              <nuxt-link :to="'/'+article.slug">
                <img
                  :src="featuredImage(article,'jpg')"
                >
              </nuxt-link>
              <span>
                <nuxt-link :to="'/categories/'+article.categories[0].slug">
                  {{ article.categories[0].name }}
                </nuxt-link>
              </span>
              <p class="bottom-tri-text">
                <nuxt-link :to="'/'+article.slug">
                  {{ article.title }}
                </nuxt-link>
              </p>
            </div>
          </div>
        </div>
        <div
          v-show="moreArticles.length"
          class="tag-page__body__last"
        >
          <div
            class="last-tri"
          >
            <div
              v-for="(block, index) in moreArticles"
              :key="index"
              class="last-tri-sub"
            >
              <nuxt-link :to="'/'+block.slug">
                <img
                  :src="featuredImage(block,'jpg')"
                >
              </nuxt-link>
              <span>
                <nuxt-link :to="'/categories/'+block.categories[0].slug">
                  {{ block.categories[0].name }}
                </nuxt-link>
              </span>
              <p class="last-tri-text">
                <nuxt-link :to="'/'+block.slug">
                  {{ block.title }}
                </nuxt-link>
              </p>
            </div>
          </div>
        </div>
        <div class="btn-wraper">
          <button
            class="btn-more-stories"
            @click="loadMoreStories"
          >
            Load more stories
          </button>
        </div>
      </section>
      <section
        v-if="$mq === 'mobile'"
        class="tag-page__mobile"
      >
        <div
          v-for="( article, index ) in articles"
          :key="index"
          class="tag-page__mobile__articles"
        >
          <nuxt-link :to="'/'+article.slug">
            <img
              :src="featuredImage(article,'jpg')"
            >
          </nuxt-link>
          <nuxt-link
            :to="'/categories/'+article.categories[0].slug"
            class="tag-page__mobile__articles__sub-title"
          >
            <span>{{ article.categories[0].name }}</span>
          </nuxt-link>
          <div class="tag-page__mobile__articles__title">
            <nuxt-link :to="'/'+article.slug">
              {{ article.title }}
            </nuxt-link>
          </div>
        </div>
        <div class="btn-wraper">
          <button
            class="btn-more-stories"
            @click="loadMoreStoriesMobile"
          >
            Load more stories
          </button>
        </div>
      </section>
      <section
        v-if="$mq !== 'mobile'"
        class="tag-page__sidebar"
      >
        <div class="tag-page__sidebar__content">
          <div class="ad ad-rectangle-atf">
            <p>Advertisement</p>
            <no-ssr>
              <ad-base
                ad-type="rectangle"
                position="atf"
                :allow-tall="true"
                :tag-slug="tag"
                :page="tag"
              ></ad-base>
            </no-ssr>
          </div>
          <div class="tag-page__sidebar__content__mini-subscribe-box">
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
              :category-slug="tag"
              :page="tag"
            ></ad-base>
          </div>
        </no-ssr>
      </section>
    </div>
    <div
      v-if="isViewportMobile"
      class="ad-mobile-sticky"
    >
      <no-ssr>
        <ad-base
          style="margin-top:10px"
          ad-type="sticky"
          position="mobile"
          :category-slug="tag"
          :page="tag"
        >
        </ad-base>
      </no-ssr>
    </div>
  </div>
</template>

<script>
import _$capitalize from 'lodash/capitalize'
import _$upperCase from 'lodash/upperCase'
import _$startCase from 'lodash/startCase'
import _$split from 'lodash/split'
import _$includes from 'lodash/includes'
import CategorySubscribeBox from '~/components/CategorySubscribeBox'

export default {
  name: 'slug',
  head () {
    return {
      title: 'The Community for Black Creativity and News',
      bodyAttrs: {
        class: 'tag-page'
      },
      meta: [
        {
          property: 'og:title',
          content: `${_$capitalize(_$upperCase(this.$route.params.category))} | The Community for Black Creativity and News - Blavity`
        },
        {
          property: 'og:image',
          content: 'http://blavity.blavity.netdna-cdn.com/wp-content/uploads/2014/11/IMG_9764.jpg?d600af'
        },
        {
          property: 'keywords',
          content: `${_$capitalize(_$upperCase(this.$route.params.category))}, Blavity, Black Twitter, Black Lives Matter, Black Millennials, Black News`
        },
        { property: 'og:url', content: `https://blavity.com/tag/${this.$route.params.category}` },
        {
          property: 'og:description',
          content: 'Blavity is a tech company for forward thinking Black millennials pushing the boundaries of culture and the status quo.'
        },
        {
          name: 'twitter:title',
          content: `${_$capitalize(_$upperCase(this.$route.params.category))} | The Community for Black Creativity and News - Blavity`
        },
        {
          name: 'twitter:description',
          content: 'Blavity is a tech company for forward thinking Black millennials pushing the boundaries of culture and the status quo.'
        },
        {
          name: 'twitter:image',
          content: 'http://blavity.blavity.netdna-cdn.com/wp-content/uploads/2014/11/IMG_9764.jpg?d600af'
        }
      ]
    }
  },
  components: {
    CategorySubscribeBox
  },
  data () {
    return {
      tag: this.$route.params.slug,
      articles: {},
      moreArticles: [],
      twoArticles: [],
      threeArticles: [],
      moreArticleFlag: 6,
      articleFlag: 6
    }
  },
  computed: {
    isViewportMobile () {
      return (this.$mq === 'mobile')
    },
    titleTag () {
      return _$startCase(this.$route.params.slug.replace('-', ' '))
    }
  },
  async asyncData ({ app, error, params, store }) {
    try {
      let totalArticle = 5
      let articleFlag = 6
      let articles = await app.$axios.$get(`/articles/tags/` + params.slug + `/` + totalArticle + `/0`)
      let twoArticles = []
      let threeArticles = []
      if (articles.length >= 2) {
        twoArticles.push(articles[1])
      }
      if (articles.length >= 3) {
        twoArticles.push(articles[2])
      }
      if (articles.length >= 4) {
        threeArticles.push(articles[3])
      }
      if (articles.length >= 5) {
        threeArticles.push(articles[4])
      }
      return { articles, totalArticle, articleFlag, twoArticles, threeArticles }
    } catch (e) {
      error(e)
    }
  },
  methods: {
    featuredImage (article, type) {
      if (typeof article.wp_featuredImage === 'undefined') {
        return 'https://editor.blavity.com/images/ImageFound.png'
      }
      let imagePath = article.wp_featuredImage
      if (typeof imagePath !== 'undefined' && imagePath !== '') {
        var types = _$split(imagePath, '/')
        if (types.length === 1) {
          imagePath = types[0]
        } else if (types.length === 2) {
          imagePath = 'https://res.cloudinary.com/blavity/image/upload/c_crop,g_center,w_auto,q_auto:best,g_south_east,x_0/' + imagePath
        } else if (_$includes(types, 'legacy.blavity.com')) {
          imagePath = imagePath + ''
        } else {
          types = _$split(imagePath, 'blavity.com')
          imagePath = 'http://legacy.blavity.com' + types[1]
        }
      } else {
        imagePath = '/images/ImageFound.png'
      }
      return imagePath
    },
    async loadMoreStories () {
      try {
        let newArticles = await this.$axios.$get(`/articles/tags/` + this.tag + `/` + this.moreArticleFlag + `/` + this.articleFlag)
        this.articleFlag = this.articleFlag + newArticles.length
        this.moreArticles = [...this.moreArticles, ...newArticles]
      } catch (e) {
        this.$store.commit('setErrorMessage', e)
      }
    },
    async loadMoreStoriesMobile () {
      try {
        let newArticles = await this.$axios.$get(`/articles/tags/` + this.tag + `/` + this.moreArticleFlag + `/` + this.articleFlag)
        this.articleFlag = this.articleFlag + newArticles.length
        this.articles = [...this.articles, ...newArticles]
      } catch (e) {
        this.$store.commit('setErrorMessage', e)
      }
    }
  }
}
</script>

<style lang="scss">
  @import '~/stylesheets/pages/_tags.scss';
</style>

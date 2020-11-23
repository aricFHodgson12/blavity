<template>
  <div
    class="page-content"
  >
    <section>
      <div class="container">
        <main>
          <ArticleStandardHeader
            v-if="!blavityOriginal(article)"
            :post="article"
            :views="views(article)"
            :caption="articleCaption(article)"
          >
          </ArticleStandardHeader>
          <div class="article-body">
            <div
              v-for="(block, index) in article.blocks"
              :key="index"
              class="article-body-block-wrapper"
            >
              <div
                class="article-body-block"
                v-html="block"
              ></div>
              <div
                v-if="article.blocks.length > 0"
              >
                <div
                  v-if="index === 0"
                  id="ds_default_anchor"
                >
                  <amp-ad
                    width="533"
                    height="300"
                    layout="responsive"
                    data-pid="22762"
                    data-zid="amp"
                    type="distroscale"
                  ></amp-ad>
                </div>
                <div
                  v-if="index === 0 || index === 2"
                  class="advertisement"
                >
                  <ad-teads
                    :tag-slugs="tagSlugs(article)"
                    :category-slug="categorySlug(article)"
                    :brand-safe="isBrandSafe(article)"
                  >
                  </ad-teads>
                </div>
                <div
                  v-else
                  class="advertisement"
                >
                  <ad-rectangle
                    :tag-slugs="tagSlugs(article)"
                    :category-slug="categorySlug(article)"
                    :brand-safe="isBrandSafe(article)"
                  >
                  </ad-rectangle>
                </div>
              </div>
            </div>
            <social-bottom
              :description="description(article)"
              :title="title(article)"
              :current-url="pageUrl(article)"
            ></social-bottom>
            <comments
              :comments="comments(article)"
              :url="article.slug"
              :number="0"
              fb-id="fb-root"
            >
            </comments>
            <Tags :tags="article.tags"></Tags>
          </div>
        </main>
      </div>
    </section>
    <section class="discover-more">
      <div class="container">
        <h3 class="sub-title">
          <span>discover more '<span v-text="$store.state.blavityCategories.currentCategory"></span>'</span>
        </h3>
        <div class="grid-container">
          <div class="grid-row">
            <article-card
              v-for="(moreArticle, index) in moreArticles"
              :key="index"
              :categories="moreArticle.categories"
              :image="image(moreArticle, 'more')"
              :slug="moreArticle.slug"
              :title="decodeTitle(moreArticle.title)"
            ></article-card>
          </div>
        </div>
      </div>
    </section>
    <div class="advertisement">
      <ad-rectangle
        :tag-slugs="tagSlugs(article)"
        :category-slug="categorySlug(article)"
        :brand-safe="isBrandSafe(article)"
      >
      </ad-rectangle>
    </div>
    <ad-mobile-sticky
      :tag-slugs="tagSlugs(current)"
      :category-slug="categorySlug(current)"
      :brand-safe="isBrandSafe(current)"
    >
    </ad-mobile-sticky>
  </div>
</template>

<script>
import _$chunk from 'lodash/chunk'
import _$join from 'lodash/join'
import _$map from 'lodash/map'
import _$replace from 'lodash/replace'
import _$truncate from 'lodash/truncate'
import _$slice from 'lodash/slice'
import _$filter from 'lodash/filter'
import he from 'he'
import innertext from 'innertext'
import { isSlugBrandSafe } from '~/utils/brand-safe'
import AdMobileSticky from '~/components/amp/ad/AdMobileSticky'
import AdRectangle from '~/components/amp/ad/AdRectangle'
import AdTeads from '~/components/amp/ad/AdTeads'
import ArticleStandardHeader from '~/components/amp/ArticleStandardHeader'
import Tags from '~/components/amp/article/Tags'
import ArticleCard from '~/components/amp/ArticleCard'
import SocialBottom from '~/components/amp/ArticleSocialBottom'
import Comments from '~/components/amp/article/Comments'

export default {
  name: 'amp-slug',
  layout: 'amp',
  components: {
    ArticleStandardHeader,
    Comments,
    Tags,
    AdMobileSticky,
    AdRectangle,
    AdTeads,
    ArticleCard,
    SocialBottom
  },

  head () {
    return {
      title: this.title(this.article),
      bodyAttrs: {
        class: 'page-article'
      },
      meta: [
        { hid: 'description', name: 'description', content: this.metaDescription(this.article) },
        { hid: 'author', name: 'author', content: this.author(this.article) },
        { property: 'og:title', content: `${he.decode(this.title(this.article))} - Blavity` },
        { property: 'og:image', content: this.image(this.article, 'facebook') },
        { property: 'og:url', content: this.pageUrl(this.article) },
        { property: 'og:description', content: he.decode(this.description(this.article)) },
        { name: 'twitter:title', content: `${this.title(this.article)} - Blavity` },
        { name: 'twitter:description', content: this.description(this.article) },
        { name: 'twitter:image', content: this.image(this.article, 'twitter') }
      ],
      link: [
        { rel: 'canonical', href: '/' + this.$route.params.slug }
      ]
    }
  },

  data () {
    return {
      busy: false,
      listKey: 0,
      articleArr: [],
      current: {},
      previous: {},
      moreArticles: [],
      authenticated: false
    }
  },

  async asyncData ({ app, error, params }) {
    const { slug } = params
    try {
      let [
        article,
        articleRes
      ] = await Promise.all([
        app.$axios.$get(`/${slug}`),
        app.$axios.$get(`/articles/11`)
      ])
      let content = article.body.replace('<p>', '<p class="caps">')
      content = article.body.replace('<iframe', '<iframe class="iframe-center"')
      const paragraphPattern = /<(p|blockquote|div|ul|ol|section|h1|h2|h3|video|iframe)\b[\s\S]*?<\/\1>/g
      const paragraphs = content.match(paragraphPattern) || []
      const blocks = _$map(_$chunk(paragraphs, 3), (c) => _$join(c, ''))
      // let category
      // if (article.categories) {
      //   category = article.categories[0].slug
      // } else {
      //   category = 'current-events'
      // }
      // these next five lines must be changed once we have the proper endpoints
      const articles = _$filter(articleRes, function (current) { return current.slug !== params.slug })
      const moreArticles = _$slice(articles, 0, 4)
      // end code block that needs to be changed
      return { articleArr: [{ ...article, blocks }],
        article: { ...article, blocks },
        current: { ...article, blocks },
        moreArticles
      }
    } catch (e) {
      error(e)
    }
  },
  mounted () {
    if (process.browser) {
      if (window.localStorage['ngStorage-token'] || document.cookie.includes('__smToken') || window.localStorage.blavityAuthentiacted) {
        this.authenticated = true
      }
    }
  },
  methods: {
    category (article) {
      return article.categories.length > 0 ? article.categories[0].name : ''
    },

    categorySlug (article) {
      return article.categories.length > 0 ? article.categories[0].slug : null
    },

    isBrandSafe (article) {
      return isSlugBrandSafe(article.slug)
    },

    comments (article) {
      if (article.comments) {
        if (article.comments.length > 0) {
          return article.comments
        } else {
          return ['']
        }
      } else {
        return ['']
      }
    },
    views (article) {
      if (article.views) {
        return article.views
      } else {
        return '0'
      }
    },
    blavityOriginal (article) {
      return false
    },

    description (article) {
      const regexScript = /<script[\s\S]*?>[\s\S]*?<\/script>/gi
      const contentWithoutScript = _$replace(article.body, regexScript, '')
      return he.decode(_$truncate(innertext(contentWithoutScript), {
        length: 1000,
        separator: ' ',
        omission: '...'
      }))
    },

    metaDescription (article) {
      return he.decode(article.excerpt)
    },

    pageUrl (article) {
      return `${process.env.HOST_URL}${article.slug}`
    },

    title (article) {
      return he.decode(article.title)
    },

    author (article) {
      return he.decode(article._author.username)
    },

    tagSlugs (article) {
      return _$map(article.tags, (tag) => tag === null ? ' ' : tag.slug)
    },
    image (article, type) {
      if (article.wp_featuredImage.includes('http')) {
        const imageLink = article.wp_featuredImage.replace('blavity', 'legacy.blavity')
        return imageLink
      } else {
        if (type === 'facebook' || type === 'twitter') {
          return `https://res.cloudinary.com/blavity/image/upload/c_fill,g_center,w_180,h_180,q_auto:best,g_south_east,x_0/${article.wp_featuredImage}`
        }
        return `https://res.cloudinary.com/blavity/image/upload/c_fit,g_center,w_300,q_auto:best,g_south_east,x_0/${article.wp_featuredImage}`
      }
    },

    decodeTitle (title) {
      return he.decode(title)
    },

    articleCaption (article) {
      if (article._medias) {
        return article._medias[0].caption
      } else {
        return ' '
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/amp/pages/_article.scss';
</style>

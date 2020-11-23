<template>
  <div
    class="video-page-content"
  >
    <div class="article-social-left-container">
      <social-left
        :description="description(article)"
        :title="title(article)"
        :current-url="pageUrl(article)"
      ></social-left>
    </div>
    <section>
      <videos
        :videos="topVideos"
      >
        <template v-slot:ads>
          <no-ssr>
            <ad-base
              ad-type="rectangle"
              position="atf"
              :allow-tall="false"
              :tag-slugs="tagSlugs(current)"
              :category-slug="categorySlug(current)"
              :brand-safe="isBrandSafe(current)"
              :key-values="keyValues(article)"
            >
            </ad-base>
          </no-ssr>
        </template>
      </videos>
      <div class="video-page__container">
        <div class="grid-container">
          <div class="grid-row">
            <main>
              <article-details
                :post="article"
              >
                <template v-slot:loginbutton>
                  <a :href="`https://editor.blavity.com/editpost/${article._id}`">
                    Login
                  </a>
                </template>
              </article-details>
              <div class="video-page-content__article-body">
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
                    >
                      <div class="subscribe-box">
                        <subscribe-form></subscribe-form>
                      </div>
                    </div>
                    <div
                      v-else-if="index === 1"
                    >
                      <no-ssr>
                        <ad-base
                          v-if="isViewportMobile"
                          ad-type="leaderboard"
                          position="atf"
                          :allow-tall="false"
                          :tag-slugs="tagSlugs(article)"
                          :category-slug="categorySlug(article)"
                          :brand-safe="isBrandSafe(article)"
                          :key-values="keyValues(article)"
                        >
                        </ad-base>
                        <ad-base
                          v-else
                          ad-type="leaderboard"
                          position="atf"
                          :allow-tall="false"
                          :tag-slugs="tagSlugs(article)"
                          :category-slug="categorySlug(article)"
                          :brand-safe="isBrandSafe(article)"
                          :key-values="keyValues(article)"
                        >
                        </ad-base>
                      </no-ssr>
                    </div>
                  </div>
                  <div
                    v-if="index === 2"
                  >
                    <no-ssr>
                      <ad-base
                        ad-type="teads"
                        :tag-slugs="tagSlugs(article)"
                        :category-slug="categorySlug(article)"
                        :brand-safe="isBrandSafe(article)"
                        :key-values="keyValues(article)"
                      >
                      </ad-base>
                    </no-ssr>
                  </div>
                </div>
                <related-article-within-content
                  :image="`https://res.cloudinary.com/blavity/image/upload/c_fit,g_center,w_450,q_auto:best,g_south_east,x_0/${relatedArticleWithin.wp_featuredImage}`"
                  :slug="relatedArticleWithin.slug"
                  :title="decodeTitle(relatedArticleWithin.title)"
                  :post="relatedArticleWithin"
                ></related-article-within-content>
                <social-bottom
                  :description="description(article)"
                  :title="title(article)"
                  :current-url="pageUrl(article)"
                ></social-bottom>
                <comments
                  :comments="comments(article)"
                  :url="article.slug"
                  :number="listKey"
                  fb-id="fb-root"
                >
                </comments>
                <Tags :tags="article.tags"></Tags>
              </div>
              <hr>
              <sponsored-content-single
                v-show="sponsoredArticle.length > 0"
                :sponsored-article="sponsoredArticle"
              >
              </sponsored-content-single>
            </main>
            <aside
              v-if="!isViewportMobile"
              id="right-rail"
            >
              <div id="right-rail-content">
                <div id="ds_default_anchor"></div>
                <related-stories :articles="relatedArticles"></related-stories>
                <div class="article-most-popular">
                  <h3 class="sub-title">
                    most popular
                  </h3>
                  <ol class="articles-container">
                    <li
                      v-for="(mostPopularArticle, index) in mostPopularArticles"
                      :key="index"
                    >
                      <most-popular-card
                        :title="decodeTitle(mostPopularArticle.title)"
                        :slug="mostPopularArticle.slug"
                      >
                      </most-popular-card>
                    </li>
                  </ol>
                </div>
                <div class="advertisement">
                  <no-ssr>
                    <ad-base
                      ad-type="rectangle"
                      position="btf"
                      :tag-slugs="tagSlugs(current)"
                      :category-slug="categorySlug(current)"
                      :brand-safe="isBrandSafe(current)"
                      :key-values="keyValues(article)"
                    >
                    </ad-base>
                  </no-ssr>
                </div>
              </div>
            </aside>
          </div>
        </div>
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
              :image="`https://res.cloudinary.com/blavity/image/upload/c_fill,g_center,w_450,ar_4:3,q_auto:best,g_south_east,x_0/${moreArticle.wp_featuredImage}`"
              :slug="moreArticle.slug"
              :title="decodeTitle(moreArticle.title)"
            ></article-card>
          </div>
        </div>
      </div>
    </section>
    <div class="advertisement">
      <no-ssr>
        <ad-base
          v-if="isViewportMobile"
          ad-type="rectangle"
          position="btf"
          :allow-tall="false"
          :tag-slugs="tagSlugs(current)"
          :category-slug="categorySlug(current)"
          :brand-safe="isBrandSafe(current)"
          :key-values="keyValues(article)"
        ></ad-base>
        <ad-base
          v-else
          ad-type="leaderboard"
          position="btf"
          :allow-tall="true"
          :tag-slugs="tagSlugs(current)"
          :category-slug="categorySlug(current)"
          :brand-safe="isBrandSafe(current)"
          :key-values="keyValues(article)"
        ></ad-base>
      </no-ssr>
    </div>
    <div
      v-if="isViewportMobile && showSticky"
      class="ad-mobile-sticky"
    >
      <a
        class="close"
        @click="close"
      >X</a>
      <no-ssr>
        <ad-base
          style="margin-top:10px;"
          ad-type="mobile"
          position="sticky"
          :key-values="keyValues(article)"
          :category-slug="categorySlug(current)"
        >
        </ad-base>
      </no-ssr>
    </div>
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
import Videos from '~/components/videos/Videos'
import ArticleDetails from '~/components/ArticleDetails'
import RelatedArticleWithinContent from '~/components/RelatedArticleWithinContent'
import RelatedStories from '~/components/article/RelatedStories'
import Tags from '~/components/article/Tags'
import SponsoredContentSingle from '~/components/SponsoredContentSingle'
import MostPopularCard from '~/components/ArticleMostPopularCard'
import ArticleCard from '~/components/ArticleCard'
import SocialBottom from '~/components/ArticleSocialBottom'
import SocialLeft from '~/components/ArticleSocialLeft'
import SubscribeForm from '~/components/SubscribeForm'
import Comments from '~/components/article/Comments'

export default {
  name: 'video-page',
  layout: 'videos',
  components: {
    Comments,
    RelatedArticleWithinContent,
    RelatedStories,
    Tags,
    SponsoredContentSingle,
    MostPopularCard,
    ArticleCard,
    SocialBottom,
    SocialLeft,
    SubscribeForm,
    ArticleDetails,
    Videos
  },

  head () {
    return {
      title: this.title(this.article),
      bodyAttrs: {
        class: 'page-article-video'
      },
      meta: [
        { hid: 'description', name: 'description', content: this.metaDescription(this.article) },
        { hid: 'author', name: 'author', content: this.author(this.article) },
        { property: 'og:title', content: `${he.decode(this.title(this.article))} - Blavity` },
        { property: 'og:image', content: this.image(this.article) },
        { property: 'og:url', content: this.pageUrl(this.article) },
        { property: 'og:description', content: this.description(this.article) },
        { name: 'twitter:title', content: `${this.title(this.article)} - Blavity` },
        { name: 'twitter:description', content: this.description(this.article) },
        { name: 'twitter:image', content: this.image(this.article) },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@blavity' },
        { name: 'twitter:creator', content: '@blavity' },
        { name: 'twitter:domain', content: 'blavity.com' },
        { name: 'tag-slugs', content: this.tagSlugs(this.article).join(',') }
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
      mostPopularArticles: [],
      relatedArticles: [],
      sponsoredArticle: {},
      showSticky: true
    }
  },

  computed: {
    isViewportMobile () {
      return (this.$mq === 'mobile')
    }
  },

  async asyncData ({ app, error, params, store, redirect }) {
    const { slug } = params
    try {
      let [
        article,
        articleRes,
        sponsoredArticle,
        topVideos
      ] = await Promise.all([
        app.$axios.$get(`/${slug}`),
        app.$axios.$get(`/articles/11`),
        app.$axios.$get('/articles/tags/Toyota-sponsored/1/0'),
        app.$axios.$get('/videos/top/12/0')
      ])
      if (article.type !== 'video' || article.videourl === null || article.videourl === undefined || article.videourl === '') {
        redirect(`/${article.slug}`)
      }
      let content = article.body.replace('<p>', '<p class="caps">')
      content = article.body.replace('<iframe', '<iframe class="iframe-center"')
      const paragraphPattern = /<(p|blockquote|div|section|h1|h2|h3|video|iframe)\b[\s\S]*?<\/\1>/g
      const paragraphs = content.match(paragraphPattern) || []
      const blocks = _$map(_$chunk(paragraphs, 3), (c) => _$join(c, ''))

      topVideos = [
        {
          type: 'embed',
          description: '',
          tags: '',
          title: article.title,
          imgThumb: `https://res.cloudinary.com/blavity/image/upload/c_fill,g_center,w_640,h_360,q_auto:best,g_south_east,x_0/${article.wp_featuredImage}`,
          _id: article._id,
          sources: [
            {
              type: 'youtube',
              file: article.videourl
            }
          ],
          image: `https://res.cloudinary.com/blavity/image/upload/c_fill,g_center,w_640,h_360,q_auto:best,g_south_east,x_0/${article.wp_featuredImage}`
        },
        ...topVideos
      ]

      store.commit('meta/update', {
        key: 'title',
        value: he.decode(article.title)
      })
      store.commit('meta/update', {
        key: 'description',
        value: he.decode(_$truncate(innertext(article.body)))
      })
      store.commit('meta/update', {
        key: 'url',
        value: `${process.env.HOST_URL}${article.slug}`
      })

      // let category
      // if (article.categories) {
      //   category = article.categories[0].slug
      // } else {
      //   category = 'current-events'
      // }
      // these next five lines must be changed once we have the proper endpoints
      const articles = _$filter(articleRes, function (current) { return current.slug !== params.slug })
      const moreArticles = _$slice(articles, 0, 4)
      const mostPopularArticles = _$slice(articles, 4, 7)
      const relatedArticles = _$slice(articles, 6, 9)
      const relatedArticleWithin = _$slice(articles, 9, 10)[0]
      // end code block that needs to be changed
      return { articleArr: [{ ...article, blocks }],
        article: { ...article, blocks },
        current: { ...article, blocks },
        moreArticles,
        mostPopularArticles,
        relatedArticles,
        sponsoredArticle,
        relatedArticleWithin,
        topVideos
      }
    } catch (e) {
      error(e)
    }
  },

  mounted () {
    this.twitterLoad()
    this.distroScaleLoad()
    if (process.browser) {
      if (window.localStorage['ngStorage-token'] || document.cookie.includes('__smToken') || window.localStorage.blavityAuthentiacted) {
        this.authenticated = true
      }
    }
  },
  update () {
    this.twitterLoad()
  },
  methods: {
    close () {
      this.showSticky = false
    },
    twitterLoad () {
      /* eslint-disable */
      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
          t = window.twttr || {};
      //  if (d.getElementById(id) && t.widgets.load) return t.widgets.load();
        js = d.createElement(s);
        js.id = id;
        js.src = "//platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function (f) {
          t._e.push(f);
        };
        return t;
      }(document, "script", "twitter-wjs"));
      setTimeout(function () { window.instgrm.Embeds.process() }, 1000)
      /* eslint-enable */
    },
    distroScaleLoad () {
      /* eslint-disable */
      (function (d, s, src) {
        if (window.vx) {
          window.vx = null;
        }
        var ds = d.createElement(s);
        ds.setAttribute('src', src);
        ds.setAttribute('async', 'true');
        d.head.appendChild(ds);
      }(document, 'script', '//c.jsrdn.com/s/cs.js?p=22762'))
      /* eslint-enable */
    },
    category (article) {
      return article.categories.length > 0 ? article.categories[0].name : ''
    },

    categorySlug (article) {
      // if its a subcat return the main category it would be attached to
      if (article.categories &&
        article.categories[0].slug !== 'news' &&
        article.categories[0].slug !== 'culture' &&
        article.categories[0].slug !== 'life-style' &&
        article.categories[0].slug !== 'politics' &&
        article.categories[0].slug !== 'opinion') {
        let catslug = article.categories[0].slug
        switch (catslug.toLowerCase().split('-').join('')) {
          case 'worldnews':
            return 'news'
          case 'hbcunews':
            return 'news'
          case 'businessentrepreneurship':
            return 'news'
          case 'techpolicy':
            return 'politics'
          case 'immigration':
            return 'politics'
          case 'environmentalism':
            return 'politics'
          case 'socialjustice':
            return 'politics'
          case '2020election':
            return 'politics'
          case 'dance':
            return 'culture'
          case 'music':
            return 'culture'
          case 'books':
            return 'culture'
          case 'art':
            return 'culture'
          case 'lgbt':
            return 'life-style'
          case 'loveandrelationships':
            return 'life-style'
          case 'wellness':
            return 'life-style'
          case 'gender':
            return 'life-style'
          default:
            return 'news'
        }
      } else if (article.categories[0].slug === 'news' ||
        article.categories[0].slug === 'culture' ||
        article.categories[0].slug === 'life-style' ||
        article.categories[0].slug === 'politics' ||
        article.categories[0].slug === 'opinion') {
        return article.categories[0].slug
      }
    },

    isBrandSafe (article) {
      return isSlugBrandSafe(article.slug)
    },

    comments (article) {
      if (article.comments !== null && article.comments !== undefined && article.comments.length > 0) {
        return article.comments
      } else {
        return ['']
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

    subtitle (article) {
      return he.decode(article.subTitle)
    },

    tagSlugs (article) {
      return _$map(article.tags, (tag) => tag.slug)
    },
    image (article) {
      return `https://res.cloudinary.com/blavity/image/upload/c_fill,g_center,w_180,h_180,q_auto:best,g_south_east,x_0/${article.wp_featuredImage}`
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
    },
    keyValues (article) {
      if (article.categories && article.categories[0] && article.categories[0].slug) {
        let value = article.categories[0].slug
        if (
          value === 'music' ||
             value === 'World-News' ||
             value === 'HBCU-News' ||
             value === 'Books' ||
             value === 'business-entrepreneurship' ||
             value === 'Art' ||
             value === 'Tech-Policy' ||
             value === '2020-Election' ||
             value === 'Environmentalism' ||
             value === 'Immigration' ||
             value === 'LGBT' ||
             value === 'Social-Justice' ||
             value === 'Dance' ||
             value === 'Love-and-Relationships' ||
             value === 'Wellness' ||
             value === 'Gender'
        ) {
          return {
            subcat: value
          }
        }
      } else return {}
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/pages/_video-page.scss';
</style>

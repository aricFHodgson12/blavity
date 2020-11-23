<template>
  <div
    class="page-content"
  >
    <section class="main-section">
      <div class="article-social-left-container">
        <social-left
          :description="description(article)"
          :title="title(article)"
          :current-url="pageUrl(article)"
        ></social-left>
      </div>
      <div class="container">
        <div class="grid-container">
          <div class="grid-row">
            <main>
              <ArticleStandardHeader
                :post="article"
                :views="views(article)"
                :caption="articleCaption(article)"
              >
                <template v-slot:button>
                  <!-- <span
                    v-if="authenticated"
                  > -->
                  <a :href="`https://editor.blavity.com/editpost/${article._id}`">
                    Login
                  </a>
                  <!-- </span> -->
                  <!-- <span
                    v-else
                  >
                    <a :href="`https://editor.blavity.com/login`">
                      Login
                    </a>
                  </span> -->
                </template>
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
                    >
                      <div class="subscribe-box">
                        <subscribe-form></subscribe-form>
                      </div>
                    </div>
                    <template
                      v-else-if="index === 1"
                    >
                      <div
                        v-if="slug !== 'how-freddie-ransome-is-bringing-a-fresh-face-and-her-best-self-to-the-world-of-beauty' && slug !=='mama-glow-founder-latham-thomas-is-a-dedicated-doula-who-is-redefining-beauty-for-black-moms-everywhere' && slug !=='kahlana-barfield-brown-is-an-iconic-beauty-and-fashion-trendsetter-who-is-playing-by-her-own-rules'"
                        id="ds_default_anchor"
                      >
                      </div>
                      <div class="advertisement">
                        <no-ssr>
                          <ad-base
                            v-if="isViewportMobile"
                            ad-type="rectangle"
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
                    </template>
                    <div
                      v-if="index === 2"
                      class="teads"
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
                </div>
                <related-article-within-content
                  :image="image(relatedArticleWithin, 'related')"
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
                  :number="0"
                  fb-id="fb-root"
                >
                </comments>
                <Tags :tags="article.tags"></Tags>
              </div>
              <hr style="border-top: 2px solid black;">
              <sponsored-content-single
                v-show="sponsoredArticle.length > 0"
                :sponsored-article="sponsoredArticle"
              >
              </sponsored-content-single>
            </main>

            <aside
              v-if="!isViewportMobile"
            >
              <div class="sticky">
                <ad-base
                  v-if="slug ==='how-freddie-ransome-is-bringing-a-fresh-face-and-her-best-self-to-the-world-of-beauty' || slug ==='mama-glow-founder-latham-thomas-is-a-dedicated-doula-who-is-redefining-beauty-for-black-moms-everywhere' || slug ==='kahlana-barfield-brown-is-an-iconic-beauty-and-fashion-trendsetter-who-is-playing-by-her-own-rules'"
                  ad-type="rectangle"
                  position="atf"
                  :tag-slugs="tagSlugs(current)"
                  :category-slug="categorySlug(current)"
                  :brand-safe="isBrandSafe(current)"
                  :key-values="keyValues(current)"
                  :allow-tall="true"
                >
                </ad-base>
                <div
                  v-else
                  id="ds_default_anchor"
                >
                </div>
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
                      :key-values="keyValues(current)"
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
              :image="image(moreArticle, 'more')"
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
          :key-values="keyValues(current)"
        ></ad-base>
        <ad-base
          v-else
          ad-type="leaderboard"
          position="btf"
          :allow-tall="true"
          :tag-slugs="tagSlugs(current)"
          :category-slug="categorySlug(current)"
          :brand-safe="isBrandSafe(current)"
          :key-values="keyValues(current)"
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
          style="margin-top:10px;"
          ad-type="sticky"
          position="mobile"
          :tag-slugs="tagSlugs(current)"
          :category-slug="categorySlug(current)"
          :brand-safe="isBrandSafe(current)"
          :key-values="keyValues(current)"
        >
        </ad-base>
      </no-ssr>
    </div>
    <section
      v-infinite-scroll="infiniteScrollInit"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="0"
      infinite-scroll-throttle-delay="200"
      class="main-section"
    >
      <div class="article-social-left-container">
        <social-left
          :description="description(articleArr[listKey])"
          :title="title(articleArr[listKey])"
          :current-url="pageUrl(articleArr[listKey])"
        ></social-left>
      </div>
      <div class="container">
        <div
          v-show="listKey > 0"
          :key="listKey"
          class="grid-container"
        >
          <div
            v-for="(item, i) in articleArr"
            v-show="i > 0"
            :key="`${i}_0f_${article._id}_list_${listKey}`"
            class="grid-row"
          >
            <div
              class="main"
            >
              <section>
                <ArticleStandardHeader
                  :id="`art${listKey}`"
                  :post="item"
                  :views="views(item)"
                  :caption="articleCaption(item)"
                >
                  <template v-slot:button>
                    <a :href="`https://editor.blavity.com/editpost/${item._id}`">
                      Login
                    </a>
                  </template>
                </ArticleStandardHeader>
                <div class="article-body">
                  <div
                    v-for="(block, index) in item.blocks"
                    :key="index"
                  >
                    <div
                      class="article-body-block"
                      v-html="block"
                    ></div>
                    <div
                      v-if="item.blocks.length > 0"
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
                        class="advertisement"
                      >
                        <no-ssr v-if="listKey > 0">
                          <ad-base
                            v-if="isViewportMobile"
                            ad-type="rectangle"
                            position="atf"
                            :allow-tall="false"
                            :tag-slugs="tagSlugs(item)"
                            :category-slug="categorySlug(item)"
                            :brand-safe="isBrandSafe(item)"
                          >
                          </ad-base>
                          <ad-base
                            v-else
                            ad-type="leaderboard"
                            position="atf"
                            :allow-tall="false"
                            :tag-slugs="tagSlugs(item)"
                            :category-slug="categorySlug(item)"
                            :brand-safe="isBrandSafe(item)"
                          >
                          </ad-base>
                        </no-ssr>
                      </div>
                      <div
                        v-if="index === 2"
                      >
                        <no-ssr v-if="listKey > 0">
                          <ad-base
                            ad-type="teads"
                            :tag-slugs="tagSlugs(item)"
                            :category-slug="categorySlug(item)"
                            :brand-safe="isBrandSafe(item)"
                          >
                          </ad-base>
                        </no-ssr>
                      </div>
                    </div>
                  </div>
                  <related-article-within-content
                    :image="image(relatedArticleWithin, 'related')"
                    :slug="relatedArticleWithin.slug"
                    :title="decodeTitle(relatedArticleWithin.title)"
                    :post="relatedArticleWithin"
                  ></related-article-within-content>
                  <social-bottom
                    :description="description(item)"
                    :title="title(item)"
                    :current-url="pageUrl(item)"
                  ></social-bottom>
                  <sponsored-content-single
                    v-show="sponsoredArticle.length > 0"
                    :sponsored-article="sponsoredArticle"
                  >
                  </sponsored-content-single>
                  <Tags :tags="item.tags"></Tags>
                </div>
              </section>
              <comments
                :comments="comments(item)"
                :url="item.slug"
                :number="listKey"
                :fb-id="`fb-root-${listKey}`"
              >
              </comments>
            </div>
            <aside v-if="!isViewportMobile">
              <div
                class="sticky right-box"
              >
                <div class="advertisement">
                  <no-ssr v-if="listKey > 0">
                    <ad-base
                      ad-type="rectangle"
                      position="btf"
                      :tag-slugs="tagSlugs(current)"
                      :category-slug="categorySlug(current)"
                      :brand-safe="isBrandSafe(current)"
                      :key-values="keyValues(current)"
                      :allow-tall="true"
                    >
                    </ad-base>
                  </no-ssr>
                </div>
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
                  <no-ssr v-if="listKey > 0">
                    <ad-base
                      ad-type="rectangle"
                      position="btf"
                      :tag-slugs="tagSlugs(current)"
                      :category-slug="categorySlug(current)"
                      :brand-safe="isBrandSafe(current)"
                      :key-values="keyValues(current)"
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
import { redirects } from '~/utils/dataStructures'
import ArticleStandardHeader from '~/components/ArticleStandardHeader'
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
  name: 'slug',
  components: {
    ArticleStandardHeader,
    Comments,
    RelatedArticleWithinContent,
    RelatedStories,
    Tags,
    SponsoredContentSingle,
    MostPopularCard,
    ArticleCard,
    SocialBottom,
    SocialLeft,
    SubscribeForm
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
        { name: 'twitter:image', content: this.image(this.article, 'twitter') },
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
      next: {},
      authenticated: false,
      showSticky: true
    }
  },

  computed: {
    isViewportMobile () {
      return (this.$mq === 'mobile')
    }
  },

  async asyncData ({ app, error, params, redirect }) {
    let article
    let { slug } = params
    if (redirects[slug]) {
      slug = redirects[slug]['to']
    }
    try {
      article = await app.$axios.$get(`/${slug}`)
      if (article && article.type === 'video' && article.videourl !== null && article.videourl !== undefined && article.videourl !== '') {
        redirect('/video/' + article.slug)
      } else if (article) {
        article.tags.forEach(function (element) {
          if (element.slug === 'blavity-original' || element.slug === 'Blavity-Original' || element.slug === 'blavity-Original' || element.slug === 'Blavity-original') {
            redirect('/blavity-original/' + article.slug)
          }
        })
      }
      let [
        next,
        articleRes,
        sponsoredArticle,
        related,
        trending
      ] = await Promise.all([
        app.$axios.$get(`/articles/next/${article._id}`),
        app.$axios.$get(`/articles/11`),
        app.$axios.$get('/articles/tags/Toyota-sponsored/1/0'),
        app.$axios.$get(`/related/${slug}/4`),
        app.$axios.$get('trending_articles')
      ])
      let relatedArticles
      if (related === undefined || related === null || related.length === 0) {
        relatedArticles = _$slice(trending, 0, 4)
      } else if (related.length < 4) {
        let end = 4 - related.length
        relatedArticles = [...related, ..._$slice(trending, 0, end)]
      } else {
        relatedArticles = related
      }
      let content = article.body.replace('<p>', '<p class="caps">')
      content = content.replace(/<iframe/g, '<iframe class="iframe-center"')
      content = content.replace(/(<\/blockquote>)/g, `'</blockquote><script src=\"\/\/platform.instagram.com\/en_US/embeds.js\" async=\"true\" defer=\"defer\"><\/script>'`)
      const imgPattern = /<(img)\b[\s\S]*?\/>/g
      const captionPatternStart = /(\[caption\b[\s\S]*?\])/g
      const captionPatternEnd = /(\[\/caption\])/g
      let captionStart = content.match(captionPatternStart) || []
      let captionEnd = content.match(captionPatternEnd) || []
      let imgs = content.match(imgPattern) || []
      for (let i = 0; i < captionStart.length; i ++) {
        content = content.replace(captionStart[i], `<span class="content-image-caption">`)
      }
      for (let i = 0; i < captionEnd.length; i ++) {
        content = content.replace(captionEnd[i], `</span>`)
      }
      for (let i = 0; i < imgs.length; i ++) {
        content = content.replace(imgs[i], `<div>${imgs[i]}</div>`)
      }
      // content = content.replace(/<(img)\b[\s\S]*?<\/\1>/g,)
      content = `<article><br>${content}</article>${
        '<script src=\"\/\/platform.instagram.com\/en_US/embeds.js\" async=\"true\" defer=\"defer\"><\/script>'}`
      content = content.split('.\r\n').join('</br><br>')
      // const articlePattern = /<(article)\b[\s\S]*?<\/\1>/g
      const paragraphPattern = /<(script|span|strong|em|i|br|p|blockquote|div|ul|ol|section|h1|h2|h3|video|iframe)\b[\s\S]*?<\/\1>/g
      const paragraphs = content.match(paragraphPattern) || []
      let blocks = _$map(_$chunk(paragraphs, 3), (c) => _$join(c, ''))
      blocks = blocks.map(block => block.replace(/(src\=\"http:\/\/blavity\.com\/wp\-content)/g, `src="http://legacy.blavity.com/wp-content`))
      // console.log(blocks)
      let nextContent = next.body.replace('<p>', '<p class="caps">')
      nextContent = next.body.replace('<iframe', '<iframe class="iframe-center"')
      nextContent = nextContent.replace(/(<\/blockquote>)/g, `'</blockquote><script src=\"\/\/platform.instagram.com\/en_US/embeds.js\" async=\"true\" defer=\"defer\"><\/script>'`)
      imgs = nextContent.match(imgPattern) || []
      captionStart = nextContent.match(captionPatternStart) || []
      captionEnd = nextContent.match(captionPatternEnd) || []
      imgs = nextContent.match(imgPattern) || []
      for (let i = 0; i < captionStart.length; i ++) {
        content = nextContent.replace(captionStart[i], `<span class="content-image-caption">`)
      }
      for (let i = 0; i < captionEnd.length; i ++) {
        content = nextContent.replace(captionEnd[i], `</span>`)
      }
      for (let i = 0; i < imgs.length; i ++) {
        nextContent = nextContent.replace(imgs[i], `<div>${imgs[i]}</div>`)
      }
      nextContent = `<article><br>${content}</article>${
        '<script src=\"\/\/platform.instagram.com\/en_US/embeds.js\" async=\"true\" defer=\"defer\"><\/script>'}`
      nextContent = nextContent.split('.\r\n').join('</br><br>')
      const nextParagraphPattern = /<(script|span|strong|em|i|br|p|blockquote|div|ul|ol|section|h1|h2|h3|video|iframe)\b[\s\S]*?<\/\1>/g
      const nextParagraphs = nextContent.match(nextParagraphPattern) || []
      let nextBlocks = _$map(_$chunk(nextParagraphs, 3), (c) => _$join(c, ''))
      nextBlocks = nextBlocks.map(block => block.replace(/(src\=\"http:\/\/blavity\.com\/wp\-content)/g, `src="http://legacy.blavity.com/wp-content`))
      // if (article.categories) {
      //   category = article.categories[0].slug
      // } else {
      //   category = 'current-events'
      // }
      // these next five lines must be changed once we have the proper endpoints
      const articles = _$filter(articleRes, function (current) { return current.slug !== params.slug })
      const moreArticles = _$slice(articles, 0, 4)
      const mostPopularArticles = _$slice(trending, 0, 5)
      const relatedArticleWithin = relatedArticles.pop()
      // end code block that needs to be changed
      return { articleArr: [{ ...article, blocks }],
        article: { ...article, blocks },
        current: { ...article, blocks },
        moreArticles,
        mostPopularArticles,
        relatedArticles,
        sponsoredArticle,
        relatedArticleWithin,
        next: { ...next, nextBlocks },
        slug
      }
    } catch (e) {
      // For Debugging Remove Comment Below in Dev
      // console.log(e)
      error(e)
    }
  },
  mounted () {
    // set query params : `category1` for main category, `subcat` for sub category
    const queryParams = {
      ...this.$route.query
    }
    if (this.article.categories[0].taxonomy === 'category') {
      queryParams['category1'] = this.article.categories[0].slug
    } else {
      queryParams['category1'] = this.article.type
      queryParams['subcat'] = this.article.categories[0].slug
    }
    this.$router.push({
      path: this.$route.path,
      query: queryParams
    })

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
    async infiniteScrollInit () {
      await this.loadNext()
      // if first instgrm emmbed process happens before dom element is injected
      // the second one below catches it and processes the embed
      setTimeout(function () { window.instgrm.Embeds.process() }, 1000)
    },
    async loadNext () {
      if (this.listKey > 10) {
        this.$router.push(`/${this.articleArr[this.listKey].slug}`)
        return ''
      }
      this.busy = false
      const h = document.body.scrollHeight
      const scrollTop = window.innerHeight + window.pageYOffset
      if (scrollTop <= h) {
        try {
          this.busy = true
          this.previous = this.current
          this.next = await this.$axios.$get(`/articles/next/${this.articleArr[this.listKey]._id}`)
          let article = this.next
          let content = article.body.replace('<p>', '<p class="caps">')
          content = content.replace('<iframe', '<iframe class=\"iframe-center\"')
          content = content.replace(/(<\/blockquote>)/g, `'</blockquote><script src=\"\/\/platform.instagram.com\/en_US/embeds.js\" async=\"true\" defer=\"defer\"><\/script>'`)
          const imgPattern = /<(img)\b[\s\S]*?\/>/g
          const captionPatternStart = /(\[caption\b[\s\S]*?\])/g
          const captionPatternEnd = /(\[\/caption\])/g
          let captionStart = content.match(captionPatternStart) || []
          let captionEnd = content.match(captionPatternEnd) || []
          let imgs = content.match(imgPattern) || []
          for (let i = 0; i < captionStart.length; i ++) {
            content = content.replace(captionStart[i], `<span class="content-image-caption">`)
          }
          for (let i = 0; i < captionEnd.length; i ++) {
            content = content.replace(captionEnd[i], `</span>`)
          }
          for (let i = 0; i < imgs.length; i ++) {
            content = content.replace(imgs[i], `<div>${imgs[i]}</div>`)
          }
          content = `<article><br>${content}</article>${
            '<script src=\"\/\/platform.instagram.com\/en_US/embeds.js\" async=\"true\" defer=\"defer\"><\/script>'}`
          content = content.split('.\r\n').join('</br><br>')
          // const articlePattern = /<(article)\b[\s\S]*?<\/\1>/g
          const paragraphPattern = /<(script|span|strong|em|i|br|p|blockquote|div|ul|ol|section|h1|h2|h3|video|iframe)\b[\s\S]*?<\/\1>/g
          const paragraphs = content.match(paragraphPattern) || []
          let blocks = _$map(_$chunk(paragraphs, 3), (c) => _$join(c, ''))
          blocks = blocks.map(block => block.replace(/(src\=\"http:\/\/blavity\.com\/wp\-content)/g, `src="http://legacy.blavity.com/wp-content`))
          this.next = { ...article, blocks }
          this.articleArr.push(this.next)
          this.current = this.next
          this.listKey ++
          this.twitterLoad()
          this.busy = false
          const elmnt = document.getElementById(`art${this.listKey}`)
          elmnt.scrollIntoView(true)
        } catch (e) {
          this.errorMessage = e
        }
      }
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
      if (article.comments !== null) {
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
      if (article.wp_featuredImage.includes('//blavity.com/')) {
        const imageLink = article.wp_featuredImage.replace('blavity.com', 'legacy.blavity.com')
        return imageLink
      } else if (article.wp_featuredImage.includes('http')) {
        return article.wp_featuredImage
      } else {
        if (type === 'facebook' || type === 'twitter') {
          return `https://res.cloudinary.com/blavity/image/upload/c_crop,g_center,w_auto,q_auto:best,g_south_east,x_0/${article.wp_featuredImage}`
        } else if (type === 'related') {
          return `https://res.cloudinary.com/blavity/image/upload/c_fit,g_center,w_300,q_auto:best,g_south_east,x_0/${article.wp_featuredImage}`
        } else if (type === 'more') {
          return `https://res.cloudinary.com/blavity/image/upload/c_fit,g_center,w_450,q_auto:best,g_south_east,x_0/${article.wp_featuredImage}`
        }
        return `https://res.cloudinary.com/blavity/image/upload/c_fit,g_center,w_900,q_auto:best,g_south_east,x_0/${article.wp_featuredImage}`
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
@import '~/stylesheets/pages/_article.scss';
</style>

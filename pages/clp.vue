<template>
  <div
    class="page-content"
  >
    <section class="main-section">
      <div class="article-social-left-container">
      </div>
      <div class="container">
        <div class="grid-container">
          <div class="grid-row">
            <main>
              <ArticleStandardHeader
                :post="article"
                :views="0"
                :caption="''"
              >
              </ArticleStandardHeader>
              <div class="article-body">
                <related-article-within-content
                  :image="''"
                  :slug="''"
                  :title="''"
                  :post="article"
                ></related-article-within-content>
                <Tags :tags="[]"></Tags>
              </div>
              <hr style="border-top: 2px solid black;">
            </main>

            <aside
              v-if="!isViewportMobile"
            >
              <div class="sticky">
                <related-stories :articles="[]"></related-stories>
                <div class="article-most-popular">
                  <h3 class="sub-title">
                    <span>most popular</span>
                  </h3>
                  <ol class="articles-container">
                  </ol>
                </div>
                <div class="advertisement">
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
          <span>discover more </span>
        </h3>
        <div class="grid-container">
          <div class="grid-row">
          </div>
        </div>
      </div>
    </section>
    <div class="advertisement">
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
    </div>
  </div>
</template>

<script>
import ArticleStandardHeader from '~/components/ArticleStandardHeader'
import RelatedArticleWithinContent from '~/components/RelatedArticleWithinContent'
import RelatedStories from '~/components/article/RelatedStories'
import Tags from '~/components/article/Tags'

export default {
  name: 'nativo-content-landing-page-duplicate',
  components: {
    ArticleStandardHeader,
    RelatedArticleWithinContent,
    RelatedStories,
    Tags
  },

  head () {
    return {
      title: 'CLP',
      bodyAttrs: {
        class: 'page-article nativo-clp'
      },
      meta: [
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'robots', content: 'noindex, nofollow' }
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
      relatedArticleWithin: {},
      sponsoredArticle: [],
      next: {},
      authenticated: false,
      showSticky: true,
      article: {
        virtual: true
      },
      slug: 'sponsoredcontent'
    }
  },

  computed: {
    isViewportMobile () {
      return (this.$mq === 'mobile')
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
    close () {
      this.showSticky = false
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/pages/_article.scss';
</style>

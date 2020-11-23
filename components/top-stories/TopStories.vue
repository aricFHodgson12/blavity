<template>
  <div
    class="top-stories"
  >
    <ul class="top-stories__list">
      <li
        v-for="(category, index) in categories"
        :id="category.slug"
        :key="index"
        class="top-stories__list__item"
        :class="{ selected: selected[category.slug]}"
        @click="handleClick(category.slug)"
      >
        {{ category.name }}
      </li>
    </ul>
    <div
      v-if="!isViewportMobile"
      class="top-stories__slot"
    >
      <section class="top-stories__slot__left">
        <top-stories-tile
          :tile="currentArticle()"
        ></top-stories-tile>
      </section>
      <section
        class="top-stories__slot__right"
      >
        <top-stories-related-stories
          :key="relatedKey"
          :posts="relatedArticles()"
        ></top-stories-related-stories>
      </section>
    </div>
    <top-stories-carousel
      v-else
      :key="mobileKey"
      :articles="currentArticles"
    ></top-stories-carousel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _$slice from 'lodash/slice'
import TopStoriesRelatedStories from '~/components/top-stories/TopStoriesRelatedStories.vue'
import TopStoriesTile from '~/components/top-stories/TopStoriesTile.vue'
import TopStoriesCarousel from '~/components/top-stories/TopStoriesCarousel'
export default {
  name: 'top-stories',
  components: {
    TopStoriesRelatedStories,
    TopStoriesTile,
    TopStoriesCarousel
  },
  props: {
    categories: {
      type: Array,
      required: true
    },
    currentCategory: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      selected: {},
      number: 0,
      errorMessage: null,
      key: 1,
      mobileKey: 99,
      relatedKey: 199,
      sponsoredKey: 200
    }
  },
  computed: {
    isViewportMobile () {
      return (this.$mq === 'mobile')
    },
    ...mapGetters({
      currentArticles: 'blavityCategories/getArticles',
      getCurrentCategory: 'blavityCategories/getCurrentCategory',
      getNews: 'blavityCategories/getNews',
      getPolitics: 'blavityCategories/getPolitics',
      getCulture: 'blavityCategories/getCulture',
      getOpinion: 'blavityCategories/getOpinion',
      getLifestyle: 'blavityCategories/getLifestyle'

    })
  },
  created () {
    for (let category in this.$store.state.blavityCategories.categories) {
      if (category !== 'specials' && category !== 'watch') {
        this.selected[category] = false
      }
    }
    this.selected[this.$store.state.blavityCategories.currentCategory] = true
  },
  methods: {
    handleClick (categorySlug) {
      for (let cat in this.selected) {
        this.selected[cat] = false
        let curr = document.getElementById(cat)
        curr.classList.remove('selected')
      }
      this.selected[categorySlug] = true
      this.$store.commit('blavityCategories/setCurrentCategory', categorySlug)
      let articles
      switch (categorySlug) {
        case 'news':
          articles = this.getNews
          break
        case 'politics':
          articles = this.getPolitics
          break
        case 'culture':
          articles = this.getCulture
          break
        case 'lifestyle':
          articles = this.getLifestyle
          break
        case 'opinion':
          articles = this.getOpinion
      }

      this.$store.commit('blavityCategories/setArticles', articles)
      this.key ++
      this.mobileKey ++
      this.relatedKey ++
      this.sponsoredKey ++
      // this.$emit('key-change')
    },
    currentArticle () {
      return this.currentArticles[0]
    },
    relatedArticles () {
      let start
      let end
      start = 1
      end = 5
      return _$slice(this.currentArticles, start, end)
    },
    relatedArticlesWSponsored () {
      let start
      let end
      start = 1
      end = 3
      return _$slice(this.currentArticles, start, end)
    }
  }
}
</script>

<style lang="scss">
  @import '~/stylesheets/components/top-stories/_top-stories.scss';
</style>

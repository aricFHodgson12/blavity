<template>
  <div
    :key="number"
    class="category-tri-tile"
  >
    <div
      v-if="!isViewportMobile"
      class="category-tri-tile__slot"
    >
      <section class="category-tri-tile__slot__left">
        <category-tile
          :tile="currentArticle"
        ></category-tile>
      </section>
      <section
        class="category-tri-tile__slot__right"
      >
        <category-related-stories
          :posts="relatedArticles"
        ></category-related-stories>
      </section>
    </div>
    <top-stories-carousel
      v-else
      :articles="currentArticles"
    ></top-stories-carousel>
  </div>
</template>

<script>
import _$slice from 'lodash/slice'
import CategoryRelatedStories from '~/components/category/CategoryRelatedStories.vue'
import CategoryTile from '~/components/category/CategoryTile.vue'
import TopStoriesCarousel from '~/components/top-stories/TopStoriesCarousel'

export default {
  name: 'category-tri-tile',
  components: {
    CategoryRelatedStories,
    CategoryTile,
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
    },
    currentArticles: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selected: {},
      number: 0
    }
  },
  computed: {
    isViewportMobile () {
      return (this.$mq === 'mobile')
    },
    category () {
      return this.$route.params.category
    },
    currentArticle () {
      return this.currentArticles[0]
    },
    relatedArticles () {
      return _$slice(this.currentArticles, 1, 3)
    }
  }
}
</script>

<style lang="scss">
  @import '~/stylesheets/components/category/_category-tri-tile.scss';
</style>

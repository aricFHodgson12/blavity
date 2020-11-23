<template>
  <div class="related-stories">
    <h3><span>More Stories</span></h3>
    <div class="items">
      <related-stories-card
        v-for="(article, index) in articles"
        :key="index"
        v-bind="article"
        :image="article.wp_featuredImage"
      >
      </related-stories-card>
    </div>
  </div>
</template>

<script>
import RelatedStoriesCard from '~/components/article/RelatedStoriesCard'

export default {
  name: 'related-stories',

  components: {
    RelatedStoriesCard
  },

  props: {
    articles: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/components/_related-stories.scss';
</style>

<template>
  <div class="top-stories-related-stories">
    <div class="items">
      <top-stories-related-stories-card
        v-for="post in posts"
        :key="post.id"
        :post="post"
      >
      </top-stories-related-stories-card>
    </div>
  </div>
</template>

<script>
import { testArticles } from '~/utils/dataStructures.js'
import _$slice from 'lodash/slice'
import TopStoriesRelatedStoriesCard from '~/components/top-stories/TopStoriesRelatedStoriesCard'

const defaultPosts = _$slice(testArticles, 1, 5)
export default {
  name: 'top-stories-related-stories',
  components: { TopStoriesRelatedStoriesCard },
  props: {
    posts: {
      type: Array,
      required: false,
      default: () => ([...defaultPosts])
    }
  },
  data () {
    return {
      errorMessage: null
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/components/top-stories/_top-stories-related-stories.scss'
</style>

<template>
  <div class="category-related-stories">
    <div class="category-related-stories__items">
      <category-related-stories-card
        v-for="post in posts"
        :key="post.id"
        :post="post"
      >
      </category-related-stories-card>
    </div>
  </div>
</template>

<script>
import CategoryRelatedStoriesCard from '~/components/category/CategoryRelatedStoriesCard'

export default {
  name: 'category-related-stories',
  components: { CategoryRelatedStoriesCard },
  props: {
    posts: {
      type: Array,
      required: true
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
@import '~/stylesheets/components/category/_category-related-stories.scss'
</style>

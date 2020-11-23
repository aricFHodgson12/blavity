<template>
  <div class="top-stories-with-sponsored">
    <div class="items">
      <top-stories-with-sponsored-card
        v-for="post in posts"
        :key="post.id"
        :post="post"
      >
      </top-stories-with-sponsored-card>
    </div>
    <div
      class="top-stories-with-sponsored__sponsored"
      :style="pStyle"
    >
      Toyota Sponsored
    </div>
    <top-stories-sponsored-card
      :sponsored-article="sponsoredArticle"
    >
    </top-stories-sponsored-card>
  </div>
</template>

<script>
import { testArticles, testSponsoredArticle } from '~/utils/dataStructures.js'
import _$slice from 'lodash/slice'
import TopStoriesWithSponsoredCard from '~/components/top-stories/TopStoriesWithSponsoredCard'
import TopStoriesSponsoredCard from '~/components/top-stories/TopStoriesSponsoredCard'

const defaultPosts = _$slice(testArticles, 1, 3)
const defaultPost = testSponsoredArticle
export default {
  name: 'top-stories-with-sponsored',
  components: {
    TopStoriesWithSponsoredCard,
    TopStoriesSponsoredCard
  },
  props: {
    posts: {
      type: Array,
      required: false,
      default: () => ([...defaultPosts])
    },
    sponsoredArticle: {
      type: Array,
      require: true,
      default: () => ({ defaultPost })
    }
  },
  data () {
    return {
      errorMessage: null,
      pStyle: {
        fontFamily: 'TT Norms',
        fontWeight: '500',
        letterSpacing: '.5px',
        color: 'grey',
        textAlign: 'center',
        fontSize: '12px',
        lineHeight: '15px',
        marginBottom: '8px'
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/components/top-stories/_top-stories-with-sponsored.scss'
</style>

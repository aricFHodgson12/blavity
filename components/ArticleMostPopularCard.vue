<template>
  <div class="article-most-popular-card">
    <nuxt-link
      :to="link"
      v-text="decodedTitle"
    ></nuxt-link>
  </div>
</template>

<script>
import he from 'he'

export default {
  name: 'article-most-popular-card',

  props: {
    title: {
      type: String,
      required: true
    },

    slug: {
      type: String,
      required: true
    }
  },

  computed: {
    decodedTitle () {
      return he.decode(this.title)
    },

    link () {
      return `/${this.slug}`
    }
  }
}
</script>

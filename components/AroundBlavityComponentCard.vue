<template>
  <div class="around-blavity-component-card">
    <img
      v-lazy="brand.logoUrl"
      :class="imgClassName"
      :alt="brand.site"
      @click="goToSite"
    >
    <div class="around-blavity-component-card-child">
      <a
        :class="linkClassName"
        :href="link"
        v-text="title"
      ></a>
    </div>
  </div>
</template>

<script>
import he from 'he'

export default {
  name: 'around-blavity-component-card',
  props: {
    brand: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgClassName () {
      return `site-logo-${this.brand.site}`
    },
    linkClassName () {
      return `site-link-${this.brand.site}`
    },
    link () {
      return `https://${this.brand.urlbase}.com/${this.brand.article.slug}`
    },
    title () {
      return he.decode(this.brand.article.title)
    }
  },
  methods: {
    goToSite () {
      window.location = `${this.link}`
    }
  }
}
</script>

<template>
  <div class="page-content">
    <header>
      <h1>Something Went Wrong</h1>
      <p>Check These Out In The Mean Time...</p>
    </header>
    <section class="blavity-original-slider">
      <blavity-original-carousel-component
        :count="count"
        :articles="$store.state.blavityCategories.articles"
      ></blavity-original-carousel-component>
    </section>
  </div>
</template>

<script>
import BlavityOriginalCarouselComponent from '~/components/BlavityOriginalCarouselComponent'
export default {
  layout: 'legacy',
  head () {
    return {
      title: 'The Community for Black Creativity and News',
      bodyAttrs: {
        class: 'page-home'
      },
      meta: [
        { property: 'og:title', content: `The Community for Black Creativity and News - Blavity` },
        { property: 'og:image', content: 'http://blavity.blavity.netdna-cdn.com/wp-content/uploads/2014/11/IMG_9764.jpg?d600af' },
        { property: 'keywords', content: 'Blavity, Black Twitter, Black Lives Matter, Black Millennials, Black News' },
        { property: 'og:url', content: 'https://blavity.com' },
        { property: 'og:description', content: 'Blavity is a tech company for forward thinking Black millennials pushing the boundaries of culture and the status quo.' },
        { name: 'twitter:title', content: `The Community for Black Creativity and News - Blavity` },
        { name: 'twitter:description', content: 'Blavity is a tech company for forward thinking Black millennials pushing the boundaries of culture and the status quo.' },
        { name: 'twitter:image', content: 'http://blavity.blavity.netdna-cdn.com/wp-content/uploads/2014/11/IMG_9764.jpg?d600af' }
      ]
    }
  },
  components: { BlavityOriginalCarouselComponent },
  data: () => ({
    count: 5
  })
}
</script>

<style lang="scss">
@import '~/stylesheets/pages/_error.scss';
@import '~/stylesheets/common/_typography.scss';
</style>

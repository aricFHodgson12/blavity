<template>
  <div class="blavity-original-carousel-wrapper">
    <mobile-blavity-original-carousel-component
      v-if="showMobile"
      :count="count"
      :articles="articles"
    >
    </mobile-blavity-original-carousel-component>
    <desktop-blavity-original-carousel-component
      v-else
      :count="count"
      :articles="articles"
    >
    </desktop-blavity-original-carousel-component>
  </div>
</template>

<script>
import DesktopBlavityOriginalCarouselComponent from '~/components/DesktopBlavityOriginalCarouselComponent'
import MobileBlavityOriginalCarouselComponent from '~/components/MobileBlavityOriginalCarouselComponent'

export default {
  name: 'blavity-original-carousel-component',
  components: {
    DesktopBlavityOriginalCarouselComponent,
    MobileBlavityOriginalCarouselComponent
  },
  props: {
    count: {
      type: Number,
      required: true
    },
    articles: {
      type: Array,
      required: true
    }
  },
  computed: {
    showMobile () {
      return (this.$mq === 'mobile' || this.$mq === 'tablet')
    }
  }
}
</script>

<style lang="scss">
  @import '~/stylesheets/components/_blavity-original-carousel-component.scss';
</style>

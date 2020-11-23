<template>
  <div class="grid-container">
    <div class="around-blavity-container">
      <h3 class="around-blavity-title">
        Around Blavity, Inc.
      </h3>
      <div>
        <around-blavity-component-card
          v-for="brand in brands"
          :key="brand.site"
          :brand="brand"
        ></around-blavity-component-card>
      </div>
    </div>
  </div>
</template>

<script>
import AroundBlavityComponentCard from '@/components/AroundBlavityComponentCard'

export default {
  name: 'around-blavity-component',

  components: {
    AroundBlavityComponentCard
  },

  props: {
    brands: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/components/_around-blavity-component.scss';
</style>

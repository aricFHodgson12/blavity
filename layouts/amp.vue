<template>
  <div class="amp-layout">
    <navigation :key="navigationKey"></navigation>
    <nuxt></nuxt>
    <NavigationBottom></NavigationBottom>
  </div>
</template>

<script>
import Navigation from '~/components/amp/Navigation'
import NavigationBottom from '~/components/amp/Footer'

export default {
  components: {
    Navigation,
    NavigationBottom
  },
  loading: false,
  data () {
    return {
      navigationKey: 0
    }
  },
  watch: {
    $route (to, from) {
      this.navigationKey ++
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/common/_shared.scss';
@import '~/stylesheets/amp/common/_global.scss';
</style>

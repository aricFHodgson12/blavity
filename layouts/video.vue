<template>
  <div>
    <navigation :key="navigationKey"></navigation>
    <nuxt></nuxt>
    <NavigationBottom></NavigationBottom>
  </div>
</template>

<script>
import Navigation from '~/components/VideoNavigation'
import NavigationBottom from '~/components/Footer'

export default {
  components: {
    Navigation,
    NavigationBottom
  },
  data () {
    return {
      navigationKey: 0
    }
  },
  watch: {
    $route (to, from) {
      this.navigationKey ++
    }
  },

  created () {

  },

  destroyed () {

  }
}
</script>

<style lang="scss">
@import '~/stylesheets/common/_shared.scss';
</style>

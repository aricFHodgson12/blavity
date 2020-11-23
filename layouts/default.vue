<template>
  <div class="page-wrapper">
    <navigation :key="navigationKey"></navigation>
    <nuxt></nuxt>
    <NavigationBottom></NavigationBottom>
  </div>
</template>

<script>
import Navigation from '~/components/Navigation'
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

  head () {
    return {
      link: [
        { rel: 'amphtml', href: '/amp' + this.$route.fullPath }
      ]
    }
  },

  created () {
    if (process.browser) {
      this.handleScroll()
      window.addEventListener('scroll', this.handleScroll)
    }
  },

  destroyed () {
    if (process.browser) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  },

  methods: {
    handleScroll () {
      const bodyClass = 'scrolled'
      const scroll = window.scrollY

      if (scroll === 0) {
        document.body.classList.remove(bodyClass)
      } else if (! document.body.classList.contains(bodyClass)) {
        document.body.classList.add(bodyClass)
      }

      this.updateStickySidebar(scroll)
    },

    updateStickySidebar (scroll) {
      const elem = document.querySelector('#sticky')
      if (! elem) { return }

      const offset = 112 + parseInt(document.querySelector('body').style.marginTop || '0px')
      const end = 145

      if (scroll > end) {
        var top = offset - (scroll - end)
        elem.style.top = top + 'px'
      } else {
        elem.style.top = offset + 'px'
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/common/_shared.scss';
@import '~/stylesheets/common/_typography.scss';
</style>

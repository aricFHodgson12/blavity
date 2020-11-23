<template>
  <div>
    <legacy-navigation :key="navigationKey"></legacy-navigation>
    <nuxt></nuxt>
    <NavigationBottom></NavigationBottom>
  </div>
</template>

<script>
import LegacyNavigation from '~/components/LegacyNavigation'
import NavigationBottom from '~/components/LegacyFooter'

export default {
  components: {
    LegacyNavigation,
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

      const offset = 112
      const end = 145

      if (scroll > end) {
        var top = offset - (scroll - end)
        elem.style.top = top + 'px'
      } else {
        elem.style.top = offset + 'px'
      }
      const elem2 = document.querySelector('#sticky2')
      if (! elem2) { return }

      const offset2 = 112
      const end2 = elem2.style.bottom

      if (scroll > end2) {
        var top2 = offset2 - (scroll - end2)
        elem2.style.top = top2 + 'px'
      } else {
        elem2.style.top = offset2 + 'px'
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/common/_shared.scss';
@import '~/stylesheets/common/_typography.scss';
</style>

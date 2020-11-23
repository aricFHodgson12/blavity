<template>
  <div class="header-wrapper">
    <legacy-mobile-navigation-menu
      v-if="showMobile"
    ></legacy-mobile-navigation-menu>
    <legacy-desktop-navigation-menu
      v-else
    ></legacy-desktop-navigation-menu>
  </div>
</template>

<script>
import LegacyDesktopNavigationMenu from '~/components/LegacyDesktopNavigationMenu'
import LegacyMobileNavigationMenu from '~/components/LegacyMobileNavigationMenu'

export default {
  name: 'legacy-navigation',
  components: {
    LegacyDesktopNavigationMenu,
    LegacyMobileNavigationMenu
  },
  computed: {
    showMobile () {
      return (this.$mq === 'mobile' || this.$mq === 'tablet')
    }
  }
}
</script>

<style lang="css">
</style>

<template>
  <div class="header-wrapper">
    <mobile-navigation-menu
      v-if="showMobile"
      :categories="categories"
    ></mobile-navigation-menu>
    <desktop-navigation-menu
      v-else
      :categories="categories"
    ></desktop-navigation-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DesktopNavigationMenu from '~/components/DesktopNavigationMenu'
import MobileNavigationMenu from '~/components/MobileNavigationMenu'

export default {
  name: 'navigation',
  components: {
    DesktopNavigationMenu,
    MobileNavigationMenu
  },
  computed: {
    showMobile () {
      return (this.$mq === 'mobile' || this.$mq === 'tablet')
    },
    ...mapGetters({
      categories: 'blavityCategories/getCategoryObject'
    })
  }
}
</script>

<style lang="css">
</style>

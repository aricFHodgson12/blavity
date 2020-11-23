<template>
  <div class="header-wrapper">
    <mobile-nav-menu
      v-if="showMobile"
      :categories="categories"
    ></mobile-nav-menu>
    <desktop-nav-menu
      v-else
      :categories="categories"
    ></desktop-nav-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DesktopNavMenu from '~/components/VideoDesktopNav'
import MobileNavMenu from '~/components/VideoMobileNav'

export default {
  name: 'video-navigation',
  components: {
    DesktopNavMenu,
    MobileNavMenu
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

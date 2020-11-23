<template>
  <div class="header-wrapper">
    <bo-mobile-nav-menu
      v-if="showMobile"
      :categories="categories"
    ></bo-mobile-nav-menu>
    <bo-desktop-nav-menu
      v-else
      :categories="categories"
    ></bo-desktop-nav-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BoDesktopNavMenu from '~/components/BoDesktopNavMenu'
import BoMobileNavMenu from '~/components/BoMobileNavMenu'

export default {
  name: 'bo-navigation',
  layout: 'original',
  components: {
    BoDesktopNavMenu,
    BoMobileNavMenu
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

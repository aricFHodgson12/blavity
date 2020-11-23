<template>
  <div
    id="mobile-header"
    class="mobile-menu"
  >
    <div class="mobile-menu__header">
      <div
        id="mobile-menu-icon"
        class="mobile-menu__header__toggler"
        role="toggle-sidebar"
        tabindex="0"
        on="tap:mobile-sidebar.toggle"
      >
        <span class="first"></span>
        <span class="second"></span>
        <span class="third"></span>
        <span class="fourth"></span>
      </div>
      <div class="mobile-menu__header__logo">
        <nuxt-link to="/">
          <amp-img
            :src="images.logo"
            alt="Blavity: News, Media, Business, Culture"
            width="125"
            height="16"
          ></amp-img>
        </nuxt-link>
      </div>
      <div class="mobile-menu__header__newsletter-signup">
        <a
          class="mobile-menu__header__newsletter-signup__subscribe-box--trigger"
          href="https://join.blavity.com/"
        >
          Join
          <amp-img
            :src="images.join"
            alt="Join Newsletter Button"
            width="18"
            height="12"
          ></amp-img>
        </a>
      </div>
    </div>
  </div>
</template>

<script>

const logo = 'https://storage.googleapis.com/blavitynews/assets/images/Blavity-News-White%402x.png'
const join = 'https://storage.googleapis.com/blavitynews/assets/images/newsletter-icon.svg'

export default {
  name: 'amp-mobile-navigation-menu',

  data () {
    return {
      images: {
        logo,
        join
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/amp/components/_mobile-navigation-menu.scss';
</style>

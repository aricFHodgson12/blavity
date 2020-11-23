<template>
  <div
    id="header"
    class="navigation-menu"
  >
    <div class="navigation-menu__container">
      <div
        id="menu-icon"
        class="navigation-menu__container__toggler"
        @click="handleClick"
      >
        <span class="first"></span>
        <span class="second"></span>
        <span class="third"></span>
        <span class="fourth"></span>
      </div>
      <div class="navigation-menu__container__text">
        <a @click="handleClick">
          <span v-if="open">Close</span><span v-else>Menu</span>
        </a>
      </div>
      <div
        v-if="!showSearch"
        class="navigation-menu__container__text"
      >
        <a
          @click="toggleSearch"
        >
          <img
            v-lazy="images.search"
            width="15"
            height="14"
            alt="Search Icon"
          >
        </a>
      </div>
      <div
        v-else
        class="navigation-menu__container__search-bar"
      >
        <div
          @click="toggleSearch"
        >
          <img
            v-lazy="images.search"
            width="15"
            height="14"
            alt="Search Icon"
          >
        </div>
        <search-bar>
        </search-bar>
      </div>
      <div class="navigation-menu__container__text">
        <a href="http://editor.blavity.com/login">
          <img
            v-if="!open"
            v-lazy="images.write"
            alt="Login to Write Icon"
          >
        </a>
      </div>
      <div class="navigation-menu__container__shop">
        <a
          href="https://shop.blavity.com/"
          target="_blank"
          rel="noopener"
        >
          Shop
        </a>
      </div>
    </div>
    <div class="navigation-menu__logo">
      <nuxt-link to="/">
        <img
          v-lazy="images.logo"
          alt="Blavity: News, Media, Business, Culture"
        >
      </nuxt-link>
    </div>
    <div
      v-if="open"
      class="navigation-menu__newsletter-signup--base"
    >
      <a>Join Daily NewsLetter</a>
    </div>
    <div
      v-else
      class="navigation-menu__newsletter-signup"
      @click="popupClick"
    >
      <no-ssr>
        <v-popover
          offset="24"
          placement="bottom"
          popover-class="navigation-menu__newsletter-signup__subscribe-box"
        >
          <a
            class="navigation-menu__newsletter-signup__subscribe-box--trigger"
          >
            Join Daily NewsLetter
          </a>
          <div
            slot="popover"
          >
            <nav-subscribe-box
              v-if="clicked"
            >
            </nav-subscribe-box>
          </div>
        </v-popover>
      </no-ssr>
    </div>
    <nav
      v-show="open"
      id="toggle"
      class="navigation-menu__nav"
    >
      <ul class="navigation-menu__nav__mega-dropdown">
        <ul class="navigation-menu__nav__mega-dropdown__col">
          <li class="navigation-menu__nav__mega-dropdown__col__heading">
            <nuxt-link to="/categories/news">
              News
            </nuxt-link>
          </li>
          <li
            v-for="(subCategory, index) in categories['news'].subCategories"
            :key="index"
            class="navigation-menu__nav__mega-dropdown__col__item"
          >
            <nuxt-link
              :to="`/categories/news/${subCategory.slug}`"
            >
              {{ subCategory.name }}
            </nuxt-link>
          </li>
        </ul>
        <ul class="navigation-menu__nav__mega-dropdown__col">
          <li class="navigation-menu__nav__mega-dropdown__col__heading">
            <nuxt-link to="/categories/politics">
              Politics
            </nuxt-link>
          </li>
          <li
            v-for="(subCategory, index) in categories['politics'].subCategories"
            :key="index"
            class="navigation-menu__nav__mega-dropdown__col__item"
          >
            <nuxt-link
              :to="`/categories/politics/${subCategory.slug}`"
            >
              {{ subCategory.name }}
            </nuxt-link>
          </li>
        </ul>
        <ul class="navigation-menu__nav__mega-dropdown__col">
          <li class="navigation-menu__nav__mega-dropdown__col__heading">
            <nuxt-link to="/categories/culture">
              Culture
            </nuxt-link>
          </li>
          <li
            v-for="(subCategory, index) in categories['culture'].subCategories"
            :key="index"
            class="navigation-menu__nav__mega-dropdown__col__item"
          >
            <nuxt-link
              :to="`/categories/culture/${subCategory.slug}`"
            >
              {{ subCategory.name }}
            </nuxt-link>
          </li>
        </ul>
        <ul class="navigation-menu__nav__mega-dropdown__col">
          <li class="navigation-menu__nav__mega-dropdown__col__heading">
            <nuxt-link to="/categories/lifestyle">
              Lifestyle
            </nuxt-link>
          </li>
          <li
            v-for="(subCategory, index) in categories['lifestyle'].subCategories"
            :key="index"
            class="navigation-menu__nav__mega-dropdown__col__item"
          >
            <nuxt-link
              :to="`/categories/lifestyle/${subCategory.slug}`"
            >
              {{ subCategory.name }}
            </nuxt-link>
          </li>
        </ul>
        <ul class="navigation-menu__nav__mega-dropdown__col">
          <li class="navigation-menu__nav__mega-dropdown__col__heading">
            <a href="https://blavity.com/videos">
              Watch
            </a>
          </li>
          <li class="navigation-menu__nav__mega-dropdown__col__heading">
            <nuxt-link to="/categories/opinion">
              Op-Ed
            </nuxt-link>
          </li>
        </ul>
      </ul>
      <div class="navigation-menu__nav__block">
        <div class="navigation-menu__nav__block__header">
          <div class="navigation-menu__nav__block__header__primary">
            <span>Want to pitch a story that <em>matters to you?</em></span>
          </div>
          <a
            class="navigation-menu__nav__block__header__secondary"
            href="http://editor.blavity.com/login"
          >
            <span>Write A Story </span>
            <img
              v-lazy="images.write"
              alt="Write A Story icon"
            >
          </a>
        </div>
        <footer class="navigation-menu__nav__block__footer">
          <div class="navigation-menu__nav__block__footer__social">
            <nuxt-link to="/">
              Follow
            </nuxt-link>
            <a
              href="https://instagram.com/blavity"
              target="_blank"
            >
              <img
                v-lazy="images.instagram"
                alt="Follow Blavity's Instagram"
              >
            </a>
            <a
              href="https://twitter.com/Blavity"
              target="_blank"
            >
              <img
                v-lazy="images.twitter"
                alt="Follow Blavity's Twitter"
              >
            </a>
            <a
              href="https://facebook.com/blavity"
              target="_blank"
            >
              <img
                v-lazy="images.facebook"
                alt="Follow Blavity's Facebook"
              >
            </a>
          </div>
          <div class="navigation-menu__nav__block__footer__links">
            <a
              v-if="isLoggedIn"
              href="http://editor.blavity.com/login"
            >
              My Account
            </a>
            <span v-else>&nbsp;</span>
            <span
              v-if="!isLoggedIn"
              class="navigation-menu__nav__block__footer__links__sign-in"
            >
              <a href="http://editor.blavity.com/login">Sign-in </a>
              <img
                v-lazy="images.write"
                alt="Write A Story icon"
              >
            </span>
            <span
              v-else
              class="navigation-menu__nav__block__footer__links__sign-in"
            >
              <a to="http://editor.blavity.com/login">Sign-out </a>
              <img
                v-lazy="images.write"
                alt="Write A Story icon"
              >
            </span>
          </div>
        </footer>
      </div>
    </nav>
  </div>
</template>

<script>
import NavSubscribeBox from '~/components/NavSubscribeBox'
import SearchBar from '~/components/search/SearchBar'

const facebook = 'https://storage.googleapis.com/blavitynews/assets/images/social-share/fb-white-icon.svg'
const twitter = 'https://storage.googleapis.com/blavitynews/assets/images/social-share/tw-white-icon.svg'
const instagram = 'https://storage.googleapis.com/blavitynews/assets/images/social-share/ig-white-icon.svg'
const search = 'https://storage.googleapis.com/blavitynews/assets/images/search-icon.svg'
const write = 'https://storage.googleapis.com/blavitynews/assets/images/write-icon.svg'
const logo = 'https://storage.googleapis.com/blavitynews/assets/images/Blavity-News-White%402x.png'
export default {
  name: 'desktop-navigation-menu',

  components: {
    NavSubscribeBox,
    SearchBar
  },
  props: {
    categories: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      open: false,
      clicked: false,
      showSearch: false,
      images: {
        facebook,
        twitter,
        instagram,
        search,
        write,
        logo
      }
    }
  },

  computed: {
    isLoggedIn () {
    //  return this.$auth.loggedIn
    // once auth enpoint is working
      return false
    }
  },
  methods: {
    handleClick () {
      const { open } = this
      const menu = document.getElementById('menu-icon')
      const nav = document.getElementById('toggle')
      if (open === false) {
        nav.classList.toggle('show-nav')
        menu.classList.toggle('active')
      } else if (open === true) {
        nav.classList.toggle('show-nav')
        menu.classList.toggle('active')
      }
      this.open = ! (this.open)
      if (this.showSearch) {
        this.toggleSearch()
      }
    },
    popupClick () {
      this.clicked = ! this.clicked
    },
    toggleSearch () {
      this.showSearch = ! this.showSearch
    }
  }
}
</script>

<style lang="scss">
 @import '~/stylesheets/components/_desktop-navigation-menu.scss';
</style>

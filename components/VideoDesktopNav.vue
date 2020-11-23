<template>
  <div
    id="video-desktop-nav"
    v-scroll="handleScroll"
    class="video-navigation-menu"
  >
    <!-- Left side of header container -->
    <div class="video-navigation-menu__container">
      <div
        id="menu-icon"
        class="video-navigation-menu__container__toggler"
        @click="handleClick"
      >
        <!-- Lines for hamburger menu -->
        <span class="first"></span>
        <span class="second"></span>
        <span class="third"></span>
        <span class="fourth"></span>
      </div>
      <div class="video-navigation-menu__container__text">
        <a @click="handleClick">
          <span v-if="open">Close</span><span v-else>Menu</span>
        </a>
      </div>
      <div
        v-if="!showSearch"
        class="video-navigation-menu__container__text"
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
        class="video-navigation-menu__container__bo-search-bar"
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
      <div
        v-show="!showSearch"
        class="video-navigation-menu__container__text"
      >
        <a href="http://editor.blavity.com/login">
          <img
            v-if="!open"
            v-lazy="images.write"
            alt="Login to Write Icon"
          >
        </a>
      </div>
    </div>
    <!-- End of left side of container -->
    <div
      v-show="!showSearch"
      class="video-navigation-menu__logo"
    >
      <nuxt-link to="/">
        <img
          v-lazy="images.logo"
          alt="Blavity: News, Media, Business, Culture"
        >
      </nuxt-link>
    </div>
    <div
      v-show="!showSearch"
      class="video-navigation-menu__facebook-post"
      @click="popupClick"
    >
      <a
        class="video-navigation-menu__facebook-post__content"
        style="display: flex; flex-wrap: nowrap;"
      >
        <span>Post this Story</span>
        <bo-share
          network="facebook"
          :description="description"
          :title="title"
          :current-url="currentUrl"
        ></bo-share>
      </a>
    </div>
    <nav
      v-show="open"
      id="toggle"
      class="video-navigation-menu__nav"
    >
      <ul class="video-navigation-menu__nav__mega-dropdown">
        <ul class="video-navigation-menu__nav__mega-dropdown__col">
          <li class="video-navigation-menu__nav__mega-dropdown__col__heading">
            <nuxt-link to="/categories/news">
              News
            </nuxt-link>
          </li>
          <li
            v-for="(subCategory, index) in categories['news'].subCategories"
            :key="index"
            class="video-navigation-menu__nav__mega-dropdown__col__item"
          >
            <nuxt-link
              :to="`/categories/news/${subCategory.slug}`"
            >
              {{ subCategory.name }}
            </nuxt-link>
          </li>
        </ul>
        <ul class="video-navigation-menu__nav__mega-dropdown__col">
          <li class="video-navigation-menu__nav__mega-dropdown__col__heading">
            <nuxt-link to="/categories/politics">
              Politics
            </nuxt-link>
          </li>
          <li
            v-for="(subCategory, index) in categories['politics'].subCategories"
            :key="index"
            class="video-navigation-menu__nav__mega-dropdown__col__item"
          >
            <nuxt-link
              :to="`/categories/politics/${subCategory.slug}`"
            >
              {{ subCategory.name }}
            </nuxt-link>
          </li>
        </ul>
        <ul class="video-navigation-menu__nav__mega-dropdown__col">
          <li class="video-navigation-menu__nav__mega-dropdown__col__heading">
            <nuxt-link to="/categories/culture">
              Culture
            </nuxt-link>
          </li>
          <li
            v-for="(subCategory, index) in categories['culture'].subCategories"
            :key="index"
            class="video-navigation-menu__nav__mega-dropdown__col__item"
          >
            <nuxt-link
              :to="`/categories/culture/${subCategory.slug}`"
            >
              {{ subCategory.name }}
            </nuxt-link>
          </li>
        </ul>
        <ul class="video-navigation-menu__nav__mega-dropdown__col">
          <li class="video-navigation-menu__nav__mega-dropdown__col__heading">
            <nuxt-link to="/categories/lifestyle">
              Lifestyle
            </nuxt-link>
          </li>
          <li
            v-for="(subCategory, index) in categories['lifestyle'].subCategories"
            :key="index"
            class="video-navigation-menu__nav__mega-dropdown__col__item"
          >
            <nuxt-link
              :to="`/categories/lifestyle/${subCategory.slug}`"
            >
              {{ subCategory.name }}
            </nuxt-link>
          </li>
        </ul>
        <ul class="video-navigation-menu__nav__mega-dropdown__col">
          <li class="video-navigation-menu__nav__mega-dropdown__col__heading">
            <a href="https://blavity.com/videos">
              Watch
            </a>
          </li>
          <li class="video-navigation-menu__nav__mega-dropdown__col__heading">
            <nuxt-link to="/categories/opinion">
              Op-Ed
            </nuxt-link>
          </li>
          <li class="video-navigation-menu__nav__mega-dropdown__col__heading">
            <a
              href="https://shop.blavity.com"
              rel="noopener"
            >
              Shop
            </a>
          </li>
        </ul>
      </ul>
      <div class="video-navigation-menu__nav__block">
        <div class="video-navigation-menu__nav__block__header">
          <div class="video-navigation-menu__nav__block__header__primary">
            <span>Want to pitch a story that <em>matters to you?</em></span>
          </div>
          <a
            class="video-navigation-menu__nav__block__header__secondary"
            href="http://editor.blavity.com/login"
          >
            <span>Write A Story </span>
            <img
              v-lazy="images.write"
              alt="Write A Story icon"
            >
          </a>
        </div>
        <footer class="video-navigation-menu__nav__block__footer">
          <div class="video-navigation-menu__nav__block__footer__social">
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
          <div class="video-navigation-menu__nav__block__footer__links">
            <a
              v-if="isLoggedIn"
              href="http://editor.blavity.com/login"
            >
              My Account
            </a>
            <span v-else>&nbsp;</span>
            <span
              v-if="!isLoggedIn"
              class="video-navigation-menu__nav__block__footer__links__sign-in"
            >
              <a href="http://editor.blavity.com/login">Sign-in </a>
              <img
                v-lazy="images.write"
                alt="Write A Story icon"
              >
            </span>
            <span
              v-else
              class="video-navigation-menu__nav__block__footer__links__sign-in"
            >
              <a href="http://editor.blavity.com/login">Sign-out </a>
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
// import _$replace from 'lodash/replace'
import BoShare from '~/components/BoShare'
import SearchBar from '~/components/search/SearchBar'
const facebook = 'https://storage.googleapis.com/blavitynews/assets/images/social-share/fb-white-icon.svg'
const twitter = 'https://storage.googleapis.com/blavitynews/assets/images/social-share/tw-white-icon.svg'
const instagram = 'https://storage.googleapis.com/blavitynews/assets/images/social-share/ig-white-icon.svg'
const search = 'https://storage.googleapis.com/blavitynews/assets/images/search-icon.svg'
const write = 'https://storage.googleapis.com/blavitynews/assets/images/write-icon.svg'
const logo = 'https://storage.googleapis.com/blavitynews/assets/images/Blavity%20Original%20Logo.png'

export default {
  name: 'video-desktop-nav-menu',

  components: {
    BoShare,
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
      meta: null,
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
    // once auth endpoint is working
      return false
    },
    title () {
      return this.$store.state.meta.title
    },
    description () {
      return this.$store.state.meta.description
    },
    currentUrl () {
      return this.$store.state.meta.url
    }
  },

  mounted () {
    // For Debugging puposes
    // console.log('meta' + ' ' + this.$store.state.meta.url)
  },

  methods: {
    handleScroll (e) {
      if (this.$mq === 'desktop' && this.$route && this.$route.name === 'videos-slug') {
        const header = document.getElementById('video-desktop-nav')
        if (window.scrollY <= 700 && header) {
          header.style.background = 'transparent'
        } else {
          header.style.background = '#35312E'
        }
      }
    },

    handleClick () {
      const { open } = this
      const menu = document.getElementById('menu-icon')
      const nav = document.getElementById('toggle')
      const fullMenu = document.getElementById('video-desktop-nav')
      if (open === false) {
        nav.classList.toggle('show-nav')
        menu.classList.toggle('active')
        fullMenu.classList.toggle('active')
      } else if (open === true) {
        nav.classList.toggle('show-nav')
        menu.classList.toggle('active')
        fullMenu.classList.toggle('active')
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
 @import '~/stylesheets/components/videos/_desktop-nav.scss';
</style>

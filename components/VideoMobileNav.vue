<template>
  <div
    id="video-mobile-header"
    v-scroll="handleScroll"
    class="video-mobile-menu"
  >
    <div class="video-mobile-menu__header">
      <div
        id="video-mobile-menu-icon"
        class="video-mobile-menu__header__toggler"
        @click="handleClick"
      >
        <span class="first"></span>
        <span class="second"></span>
        <span class="third"></span>
        <span class="fourth"></span>
      </div>
      <div class="video-mobile-menu__header__logo">
        <nuxt-link to="/">
          <img
            v-lazy="images.logo"
            alt="Blavity: News, Media, Business, Culture"
          >
        </nuxt-link>
      </div>
      <div
        v-if="open.nav"
        class="video-mobile-menu__header__bo-mobile-search"
      >
        <a @click="openSearch">
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
        class="video-mobile-menu__header__newsletter-signup"
      >
        <no-ssr>
          <v-popover
            offset="24"
            placement="bottom"
            popover-class="video-mobile-menu__header__newsletter-signup__subscribe-box"
          >
            <a
              class="video-mobile-menu__header__bo-mobile-search"
              @click="openSearch"
            >
              <img
                v-lazy="images.search"
                width="15"
                height="14"
                alt="Search Icon"
              >
            </a>
            <div
              slot="popover"
            >
              <nav-subscribe-box></nav-subscribe-box>
            </div>
          </v-popover>
        </no-ssr>
      </div>
      <div
        v-if="search"
        id="video-mobile-search-box"
      >
        <div class="flex-column">
          <search-bar></search-bar>
        </div>
      </div>
    </div>
    <div
      v-show="open.nav"
      id="mobile-toggle"
      class="video-mobile-menu__nav"
    >
      <ul class="video-mobile-menu__nav__mega-dropdown">
        <ul
          id="newsletter"
          class="video-mobile-menu__nav__mega-dropdown__col"
        >
          <li class="video-mobile-menu__nav__mega-dropdown__col__heading">
            <nuxt-link to="/">
              Join Daily Newsletter
            </nuxt-link>
            <span
              id="toggle-newsletter"
              @click="openNewsLetter"
            >
              <img
                v-lazy="images.plusDark"
                alt="More Categories Icon"
              >
            </span>
          </li>
          <div
            v-if="open.newsletter"
            class="video-mobile-menu__nav__mega-dropdown__col__newsletter"
          >
            <form
              v-if="!emailSubmitted"
              class="video-mobile-menu__nav__mega-dropdown__col__newsletter__capture-form"
              @submit.prevent="submit"
            >
              <h3 class="video-mobile-menu__nav__mega-dropdown__col__newsletter__capture-form__heading">
                Get the freshest stories in your inbox, <span>every day.</span>
              </h3>
              <span class="video-mobile-menu__nav__mega-dropdown__col__newsletter__capture-form__email">
                <input
                  v-model="emailAddress"
                  class="video-mobile-menu__nav__mega-dropdown__col__newsletter__capture-form__email__input"
                  type="email"
                  placeholder="Your Email Address"
                  required
                >
                <button
                  class="video-mobile-menu__nav__mega-dropdown__col__newsletter__capture-form__email__submit"
                  type="submit"
                >
                  <img
                    v-lazy="images.arrow"
                    alt="Subscribe to Newsletter Button"
                  >
                </button>
              </span>
              <input
                id="termsCheck"
                class="video-mobile-menu__nav__mega-dropdown__col__newsletter__capture-form__checkbox"
                type="checkbox"
                required
              >
              <label for="termsCheck"><span class="video-mobile-menu__nav__mega-dropdown__col__newsletter__capture-form__checkbox__input-text">I agree to the &nbsp;<nuxt-link to="/terms-of-service">terms</nuxt-link>
                <span>&nbsp; & &nbsp;</span><nuxt-link to="/privacy">privacy</nuxt-link>&nbsp; policies.
              </span></label>
              <label
                v-show="emailError"
                class="video-mobile-menu__nav__mega-dropdown__col__newsletter__capture-form__error-text"
              >Please use a valid email address</label>
            </form>

            <div
              v-else
              class="video-mobile-menu__nav__mega-dropdown__col__newsletter__success"
            >
              <h2 class="video-mobile-menu__nav__mega-dropdown__col__newsletter__success__heading">
                Welcome to the family! Check your inbox for your confirmation.
              </h2>
            </div>
          </div>
        </ul>
        <ul
          id="news"
          class="video-mobile-menu__nav__mega-dropdown__col"
        >
          <li class="video-mobile-menu__nav__mega-dropdown__col__heading">
            <nuxt-link to="/categories/news">
              News
            </nuxt-link>
            <span
              id="toggle-news"
              @click="openDropdown('news','toggle-news')"
            >
              <img
                v-lazy="images.plus"
                alt="More Categories Icon"
              >
            </span>
          </li>
          <ul
            v-if="open.news"
            class="video-mobile-menu__nav__mega-dropdown__col__container"
          >
            <li
              v-for="(subCategory, index) in categories['news'].subCategories"
              :key="index"
              class="video-mobile-menu__nav__mega-dropdown__col__item"
            >
              <nuxt-link
                :to="`/categories/news/${subCategory.slug}`"
              >
                {{ subCategory.name }}
              </nuxt-link>
            </li>
          </ul>
        </ul>
        <ul
          id="politics"
          class="video-mobile-menu__nav__mega-dropdown__col"
        >
          <li class="video-mobile-menu__nav__mega-dropdown__col__heading">
            <nuxt-link
              to="/categories/politics"
            >
              Politics
            </nuxt-link>
            <span
              id="toggle-politics"
              to="/"
              @click="openDropdown('politics','toggle-politics')"
            >
              <img
                v-lazy="images.plus"
                alt="More Categories Icon"
              >
            </span>
          </li>
          <ul
            v-if="open.politics"
            class="video-mobile-menu__nav__mega-dropdown__col__container"
          >
            <li
              v-for="(subCategory, index) in categories['politics'].subCategories"
              :key="index"
              class="video-mobile-menu__nav__mega-dropdown__col__item"
            >
              <nuxt-link
                :to="`/categories/politics/${subCategory.slug}`"
              >
                {{ subCategory.name }}
              </nuxt-link>
            </li>
          </ul>
        </ul>
        <ul
          id="culture"
          class="video-mobile-menu__nav__mega-dropdown__col"
        >
          <li class="video-mobile-menu__nav__mega-dropdown__col__heading">
            <nuxt-link to="/categories/culture">
              Culture
            </nuxt-link>
            <span
              id="toggle-culture"
              @click="openDropdown('culture','toggle-culture')"
            >
              <img
                v-lazy="images.plus"
                alt="More Categories Icon"
              >
            </span>
          </li>
          <ul
            v-if="open.culture"
            class="video-mobile-menu__nav__mega-dropdown__col__container"
          >
            <li
              v-for="(subCategory, index) in categories['culture'].subCategories"
              :key="index"
              class="video-mobile-menu__nav__mega-dropdown__col__item"
            >
              <nuxt-link
                :to="`/categories/culture/${subCategory.slug}`"
              >
                {{ subCategory.name }}
              </nuxt-link>
            </li>
          </ul>
        </ul>
        <ul
          id="lifestyle"
          class="video-mobile-menu__nav__mega-dropdown__col"
        >
          <li class="video-mobile-menu__nav__mega-dropdown__col__heading">
            <nuxt-link to="/categories/lifestyle">
              Lifestyle
            </nuxt-link>
            <span
              id="toggle-lifestyle"
              to="/"
              @click="openDropdown('lifestyle','toggle-lifestyle')"
            >
              <img
                v-lazy="images.plus"
                alt="More Categories Icon"
              >
            </span>
          </li>
          <ul
            v-if="open.lifestyle"
            class="video-mobile-menu__nav__mega-dropdown__col__container"
          >
            <li
              v-for="(subCategory, index) in categories['lifestyle'].subCategories"
              :key="index"
              class="video-mobile-menu__nav__mega-dropdown__col__item"
            >
              <nuxt-link
                :to="`/categories/lifestyle/${subCategory.slug}`"
              >
                {{ subCategory.name }}
              </nuxt-link>
            </li>
          </ul>
        </ul>
        <ul class="video-mobile-menu__nav__mega-dropdown__col">
          <li class="video-mobile-menu__nav__mega-dropdown__col__item-head">
            <nuxt-link to="/categories/opinion">
              Op-Ed
            </nuxt-link>
          </li>
        </ul>
        <ul class="video-mobile-menu__nav__mega-dropdown__col">
          <li class="video-mobile-menu__nav__mega-dropdown__col__item-head">
            <a
              href="https://shop.blavity.com/"
              target="_blank"
              rel="noopener"
              style="margin-top: 10px;"
            >
              Shop
            </a>
          </li>
        </ul>
        <a
          class="video-mobile-menu__nav__write"
          href="http://editor.blavity.com/login"
        >
          <h3>Write A Story</h3>
          <img
            v-lazy="images.write"
            alt="Write A Story icon"
          >
        </a>
      </ul>
      <footer class="video-mobile-menu__nav__footer">
        <div class="video-mobile-menu__nav__footer__links">
          <div class="video-mobile-menu__nav__footer__links__my-account">
            <a
              v-if="isLoggedIn"
              href="http://editor.blavity.com/login"
            >
              <span>My Account</span>
            </a>
            <span v-else>&nbsp;</span>
          </div>
          <div class="video-mobile-menu__nav__footer__links__sign-in">
            <a
              v-if="!isLoggedIn"
              href="http://editor.blavity.com/login"
            >
              <span>Sign-in</span>
              <img
                v-lazy="images.write"
                alt="Write A Story icon"
              >
            </a>
            <nuxt-link
              v-else
              to="/"
            >
              <span>Sign-out</span>
              <img
                v-lazy="images.write"
                alt="Write A Story icon"
              >
            </nuxt-link>
          </div>
        </div>
        <div class="video-mobile-menu__nav__footer__social">
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
      </footer>
    </div>
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
const logo = 'https://storage.googleapis.com/blavitynews/assets/images/Blavity%20Original%20Logo.png'
const plus = 'https://storage.googleapis.com/blavitynews/images/header/plus-sign.svg'
const plusDark = 'https://storage.googleapis.com/blavitynews/images/header/plus-icon-dark.svg'
const arrow = 'https://storage.googleapis.com/blavitynews/assets/images/cta-arrow.svg'
const join = 'https://storage.googleapis.com/blavitynews/assets/images/newsletter-icon.svg'

export default {
  name: 'video-mobile-nav-menu',

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
      search: false,
      emailAddress: null,
      emailError: false,
      emailSubmitted: false,
      open: {
        nav: false,
        newsletter: false,
        news: false,
        politics: false,
        culture: false,
        lifestyle: false,
        currentActive: null
      },
      images: {
        facebook,
        twitter,
        instagram,
        search,
        write,
        logo,
        plus,
        plusDark,
        arrow,
        join
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
    handleScroll (e) {
      if (this.$mq === 'mobile' && this.$route && this.$route.name === 'blavity-original-slug') {
        const header = document.getElementById('video-mobile-header')
        if (window.scrollY <= 700 && header) {
          header.style.background = 'transparent'
        } else {
          header.style.background = '#35312E'
        }
      }
    },

    handleClick () {
      const {
        open
      } = this
      const menu = document.getElementById('video-mobile-menu-icon')
      const nav = document.getElementById('mobile-toggle')
      const fullMenu = document.getElementById('video-mobile-header')

      if (open.nav === false) {
        nav.classList.toggle('show-nav')
        menu.classList.toggle('active')
        fullMenu.classList.toggle('active')
      } else if (open.nav === true) {
        nav.classList.add('closing')
        setTimeout(() => {
          nav.classList.remove('closing')
        }, 1000)
        nav.classList.toggle('show-nav')
        menu.classList.toggle('active')
        fullMenu.classList.toggle('active')
      }
      this.open.nav = ! (this.open.nav)
      // If you open or close the nav with the trigger
      // Chances are you want to see the navigation
      // So always close the search if the nav is triggered
      this.search = false
    },
    openNewsLetter () {
      const {
        open
      } = this
      const trigger = document.getElementById('toggle-newsletter')
      const newsletter = document.getElementById('newsletter')
      if (open['newsletter'] === false) {
        this.open['newsletter'] = ! (this.open['newsletter'])
        newsletter.classList.toggle('show-container')
        trigger.classList.toggle('activate')
      } else if (open['newsletter'] === true) {
        newsletter.classList.add('closing')
        setTimeout(() => {
          newsletter.classList.remove('closing')
        }, 1000)
        newsletter.classList.toggle('show-container')
        trigger.classList.toggle('activate')
        this.open['newsletter'] = ! (this.open['newsletter'])
      }
    },
    openDropdown (colID, triggerID) {
      const {
        open
      } = this
      const trigger = document.getElementById(triggerID)
      const col = document.getElementById(colID)
      if (open[colID] === false && open.currentActive === null) {
        this.open[colID] = ! (this.open[colID])
        col.classList.toggle('show-container')
        trigger.classList.toggle('activate')
        open.currentActive = colID
      } else if (open[colID] === true) {
        col.classList.add('closing')
        setTimeout(() => {
          col.classList.remove('closing')
        }, 1000)
        col.classList.toggle('show-container')
        trigger.classList.toggle('activate')
        open.currentActive = null
        this.open[colID] = ! (this.open[colID])
      } else if (open[colID] === false && open.currentActive !== colID) {
        col.classList.toggle('show-container')
        trigger.classList.toggle('activate')
        document.getElementById(`toggle-${open.currentActive}`).classList.remove('activate')
        document.getElementById(`${open.currentActive}`).classList.remove('show-container')
        this.open[open.currentActive] = ! this.open[open.currentActive]
        open.currentActive = colID
        this.open[colID] = ! (this.open[colID])
      }
    },
    async submit () {
      const {
        emailAddress
      } = this
      try {
        await this.$axios.$post('https://api.blavity.io/subscribers/blavity?list=blavityDaily', { name: emailAddress, email: emailAddress })
        this.emailError = false
        this.submitDone = true
        this.emailSubmitted = true
      } catch (error) {
        this.$store.commit('setErrorMessage', error)
        this.emailError = true
        this.submitDone = false
      }
    },
    openSearch () {
      this.search = ! this.search
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/components/videos/_mobile-nav.scss';
</style>

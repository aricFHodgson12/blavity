<template>
  <div
    id="mobile-header"
    class="mobile-menu"
  >
    <div class="mobile-menu__header">
      <div
        id="mobile-menu-icon"
        class="mobile-menu__header__toggler"
        @click="handleClick"
      >
        <span class="first"></span>
        <span class="second"></span>
        <span class="third"></span>
        <span class="fourth"></span>
      </div>
      <div class="mobile-menu__header__logo">
        <nuxt-link to="/">
          <img
            v-lazy="images.logo"
            alt="Blavity: News, Media, Business, Culture"
          >
        </nuxt-link>
      </div>
      <div
        v-if="open.nav"
        class="mobile-menu__header__search"
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
        class="mobile-menu__header__newsletter-signup"
      >
        <no-ssr>
          <v-popover
            offset="24"
            placement="bottom"
            popover-class="mobile-menu__header__newsletter-signup__subscribe-box"
          >
            <a
              class="mobile-menu__header__newsletter-signup__subscribe-box--trigger"
            >
              Join
              <img
                v-lazy="images.join"
                alt="Join Newsletter Icon"
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
        id="mobile-search-box"
      >
        <div class="flex-column">
          <search-bar></search-bar>
        </div>
      </div>
    </div>
    <div
      v-show="open.nav"
      id="mobile-toggle"
      class="mobile-menu__nav"
    >
      <ul class="mobile-menu__nav__mega-dropdown">
        <ul
          id="newsletter"
          class="mobile-menu__nav__mega-dropdown__col"
        >
          <li class="mobile-menu__nav__mega-dropdown__col__heading">
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
            class="mobile-menu__nav__mega-dropdown__col__newsletter"
          >
            <form
              v-if="!emailSubmitted"
              class="mobile-menu__nav__mega-dropdown__col__newsletter__capture-form"
              @submit.prevent="submit"
            >
              <h3 class="mobile-menu__nav__mega-dropdown__col__newsletter__capture-form__heading">
                Get the freshest stories in your inbox, <span>every day.</span>
              </h3>
              <span class="mobile-menu__nav__mega-dropdown__col__newsletter__capture-form__email">
                <input
                  v-model="emailAddress"
                  class="mobile-menu__nav__mega-dropdown__col__newsletter__capture-form__email__input"
                  type="email"
                  placeholder="Your Email Address"
                  required
                >
                <button
                  class="mobile-menu__nav__mega-dropdown__col__newsletter__capture-form__email__submit"
                  type="submit"
                >
                  <img
                    v-lazy="images.arrow"
                    alt="Subscribe Button"
                  >
                </button>
              </span>
              <input
                id="termsCheck"
                class="mobile-menu__nav__mega-dropdown__col__newsletter__capture-form__checkbox"
                type="checkbox"
                required
              >
              <label for="termsCheck"><span class="mobile-menu__nav__mega-dropdown__col__newsletter__capture-form__checkbox__input-text">I agree to the &nbsp;<a href="/terms-of-service">terms</a>
                <span>&nbsp; & &nbsp;</span><a href="/privacy">privacy</a>&nbsp; policies.
              </span></label>
              <label
                v-show="emailError"
                class="mobile-menu__nav__mega-dropdown__col__newsletter__capture-form__error-text"
              >Please use a valid email address</label>
            </form>

            <div
              v-else
              class="mobile-menu__nav__mega-dropdown__col__newsletter__success"
            >
              <h2 class="mobile-menu__nav__mega-dropdown__col__newsletter__success__heading">
                Welcome to the family! Check your inbox for your confirmation.
              </h2>
            </div>
          </div>
        </ul>
        <ul class="mobile-menu__nav__mega-dropdown__col">
          <li
            v-for="category in getCategories"
            :key="category.slug"
            class="mobile-menu__nav__mega-dropdown__col__item-head"
          >
            <nuxt-link :to="`/categories/${category.slug}`">
              {{ category.name }}
            </nuxt-link>
          </li>
          <li
            class="mobile-menu__nav__mega-dropdown__col__item-head"
          >
            <a href="/finance">
              Finance
            </a>
          </li>
          <li
            class="mobile-menu__nav__mega-dropdown__col__item-head"
          >
            <a href="https://experience.afrotech.com/">
              AfroTech
            </a>
          </li>
          <li
            class="mobile-menu__nav__mega-dropdown__col__item-head"
          >
            <a href="https://summit21conference.com/">
              Summit21
            </a>
          </li>
        </ul>
        <ul class="mobile-menu__nav__mega-dropdown__col">
          <li class="mobile-menu__nav__mega-dropdown__col__item-head">
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
        <li class="mobile-menu__nav__write">
          <h3>Write A Story</h3>
          <img
            v-lazy="images.write"
            alt="Write A Story icon"
          >
        </li>
      </ul>
      <footer class="mobile-menu__nav__footer">
        <div class="mobile-menu__nav__footer__links">
          <div class="mobile-menu__nav__footer__links__my-account">
            <a
              v-if="isLoggedIn"
              href="#"
            >
              <span>My Account</span>
            </a>
            <span v-else>&nbsp;</span>
          </div>
          <div class="mobile-menu__nav__footer__links__sign-in">
            <a
              v-if="!isLoggedIn"
              href="/login"
            >
              <span>Sign-in</span>
              <img
                v-lazy="images.write"
                alt="Write A Story icon"
              >
            </a>
            <a
              v-else
              href="/login"
            >
              <span>Sign-out</span>
              <img
                v-lazy="images.write"
                alt="Write A Story icon"
              >
            </a>
          </div>
        </div>
        <div class="mobile-menu__nav__footer__social">
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
import { mapGetters } from 'vuex'

const facebook = 'https://storage.googleapis.com/blavitynews/assets/images/social-share/fb-white-icon.svg'
const twitter = 'https://storage.googleapis.com/blavitynews/assets/images/social-share/tw-white-icon.svg'
const instagram = 'https://storage.googleapis.com/blavitynews/assets/images/social-share/ig-white-icon.svg'
const search = 'https://storage.googleapis.com/blavitynews/assets/images/search-icon.svg'
const write = 'https://storage.googleapis.com/blavitynews/assets/images/write-icon.svg'
const logo = 'https://storage.googleapis.com/blavitynews/assets/images/Blavity-News-White%402x.png'
const plus = 'https://storage.googleapis.com/blavitynews/images/header/plus-sign.svg'
const plusDark = 'https://storage.googleapis.com/blavitynews/images/header/plus-icon-dark.svg'
const arrow = 'https://storage.googleapis.com/blavitynews/assets/images/cta-arrow.svg'
const join = 'https://storage.googleapis.com/blavitynews/assets/images/newsletter-icon.svg'

export default {
  name: 'legacy-mobile-navigation-menu',

  components: {
    NavSubscribeBox,
    SearchBar
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
    },
    ...mapGetters({
      'getCategories': 'legacyCategories/getCategories'
    })
  },
  methods: {
    handleClick () {
      const {
        open
      } = this
      const menu = document.getElementById('mobile-menu-icon')
      const nav = document.getElementById('mobile-toggle')
      if (open.nav === false) {
        nav.classList.toggle('show-nav')
        menu.classList.toggle('active')
      } else if (open.nav === true) {
        nav.classList.add('closing')
        setTimeout(() => {
          nav.classList.remove('closing')
        }, 1000)
        nav.classList.toggle('show-nav')
        menu.classList.toggle('active')
      }
      this.open.nav = ! (this.open.nav)
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
@import '~/stylesheets/components/_mobile-navigation-menu.scss';
</style>

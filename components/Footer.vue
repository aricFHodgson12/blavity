<template>
  <div class="footer">
    <no-ssr>
      <cookie-law
        theme="blood-orange"
        button-text="Accept"
      >
        <div slot="message">
          We use cookies to make our site work, to understand how it is used, and to tailor advertisements presented on our site. By clicking "Accept", you agree to us doing so. You can read more by clicking on our privacy policy <a href="https://blavity.com/privacy">here</a>.
        </div>
      </cookie-law>
    </no-ssr>
    <div class="footer__footer-container">
      <div class="footer__footer-container__main">
        <div class="footer__footer-container__main__social-callouts">
          <div class="footer__footer-container__main__social-callouts__blavity">
            <div class="footer__footer-container__main__social-callouts__blavity__logo"></div>
            <a href="https://www.instagram.com/blavity/">
              <div class="footer__footer-container__main__social-callouts__blavity__instagram"></div>
            </a>
            <a href="https://twitter.com/blavity">
              <div class="footer__footer-container__main__social-callouts__blavity__twitter"></div>
            </a>
            <a href="https://www.facebook.com/Blavity/">
              <div class="footer__footer-container__main__social-callouts__blavity__facebook"></div>
            </a>
          </div>
          <div
            v-if="isViewportMobile"
            class="footer__footer-container__main__social-callouts__line"
          >
          </div>
          <div class="footer__footer-container__main__social-callouts__paragraph">
            <p>Blavity is a community of the most exceptional multi-cultural creators and influencers in the world. We partner with diverse content creators and influencers to help them reach a wider audience, amplify their message, and fund their hustles. We believe that the world shifts according to the way people see it— and if you change the way people view the world, you can transform it. A subsidiary of <span> Blavity, Inc.</span></p>
          </div>
        </div>
        <div
          v-if="isViewportMobile"
          class="footer__footer-container__main__menu-items"
        >
          <ul class="footer__footer-container__main__menu-items__col">
            <li class="footer__footer-container__main__menu-items__col__item">
              <nuxt-link to="/categories/news">
                News
              </nuxt-link>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <nuxt-link to="/categories/politics">
                Politics
              </nuxt-link>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <nuxt-link to="/categories/culture">
                Culture
              </nuxt-link>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <nuxt-link to="/categories/lifestyle">
                Lifestyle
              </nuxt-link>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <nuxt-link to="/categories/opinion">
                Op-Eds
              </nuxt-link>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href="/login">
                Write A Story
              </a>
            </li>
          </ul>
          <ul class="footer__footer-container__main__menu-items__col">
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href="https://blavity.com/videos">
                Watch
              </a>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href="/login">
                My Account
              </a>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <nuxt-link to="/terms-of-service">
                Terms & Conditions
              </nuxt-link>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <nuxt-link to="/privacy">
                Privacy Policies
              </nuxt-link>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href="https://blavityinc.com/careers">
                Careers
              </a>
            </li>
          </ul>
        </div>
        <div
          v-if="!isViewportMobile"
          class="footer__footer-container__main__menu-items"
        >
          <ul class="footer__footer-container__main__menu-items__col">
            <li class="footer__footer-container__main__menu-items__col__item">
              <nuxt-link to="/categories/news">
                News
              </nuxt-link>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <nuxt-link to="/categories/politics">
                Politics
              </nuxt-link>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <nuxt-link to="/categories/culture">
                Culture
              </nuxt-link>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <nuxt-link to="/categories/lifestyle">
                Lifestyle
              </nuxt-link>
            </li>
          </ul>
          <ul class="footer__footer-container__main__menu-items__col">
            <li class="footer__footer-container__main__menu-items__col__item">
              <nuxt-link to="/categories/opinion">
                Op-Eds
              </nuxt-link>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href="https://blavity.com/videos">
                Watch
              </a>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href="/login">
                Write A Story
              </a>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href="/login">
                My Account
              </a>
            </li>
          </ul>
          <ul class="footer__footer-container__main__menu-items__col">
            <li class="footer__footer-container__main__menu-items__col__item">
              <nuxt-link to="/terms-of-service">
                Terms & Conditions
              </nuxt-link>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <nuxt-link to="/privacy">
                Privacy Policies
              </nuxt-link>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href="https://blavityinc.com/careers">
                Careers
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer__footer-container__line"></div>
      <div class="footer__footer-container__meta">
        <div class="footer__footer-container__meta__info">
          <p> &#169; Blavity, Inc., 2018</p>
          <a
            href="https://blavityinc.com/partner-with-us"
            target="_blank"
          >
            <button>Partner With Us</button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CookieLaw from 'vue-cookie-law'

export default {
  name: 'navigation-bottom',
  components: { CookieLaw },
  computed: {
    isViewportMobile () {
      return (this.$mq === 'mobile')
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/components/_footer.scss'
</style>

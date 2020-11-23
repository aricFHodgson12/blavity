<template>
  <div class="footer">
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
              <!-- <nuxt-link to="/"> -->
              <a href="/categories/news">
                News
              </a>
              <!-- </nuxt-link> -->
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href="/categories/politics">
                Politics
              </a>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href="/finance">
                Finance
              </a>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href="/categories/opinion">
                Opinion
              </a>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href="https://experience.afrotech.com/">
                AfroTech
              </a>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href="https://summit21conference.com/">
                Summit21
              </a>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href="/login">
                Write A Story
              </a>
            </li>
          </ul>
          <ul class="footer__footer-container__main__menu-items__col">
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href="/login">
                My Account
              </a>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href=" /terms-of-service">
                Terms & Conditions
              </a>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href="/privacy">
                Privacy Policies
              </a>
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
              <a href="/categories/news">
                News
              </a>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href="/categories/politics">
                Politics
              </a>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href="/categories/finance">
                Finance
              </a>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href="/categories/opinion">
                Opinion
              </a>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href="/login">
                Write A Story
              </a>
            </li>
          </ul>
          <ul class="footer__footer-container__main__menu-items__col">
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href="/login">
                My Account
              </a>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href=" /terms-of-service">
                Terms & Conditions
              </a>
            </li>
            <li class="footer__footer-container__main__menu-items__col__item">
              <a href="/privacy">
                Privacy Policies
              </a>
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

export default {
  name: 'navigation-bottom',

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

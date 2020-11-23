<template>
  <div class="nav-subscribe-box">
    <div
      class="nav-subscribe-box__capture-form"
    >
      <form
        v-if="!submitDone"
        method="post"
        @submit.prevent="submit"
      >
        <div class="nav-subscribe-box__capture-form__email">
          <input
            v-model="emailAddress"
            class="nav-subscribe-box__capture-form__email__input"
            type="email"
            placeholder="Your email address"
            required
          >
          <button
            class="nav-subscribe-box__capture-form__email__submit"
            type="submit"
          >
            <img
              v-lazy="images.arrow"
              alt="Subscribe Button"
            >
          </button>
        </div>
        <div class="nav-subscribe-box__capture-form__terms">
          <div class="nav-subscribe-box__capture-form__terms__input">
            <input
              id="termsCheck"
              class="nav-subscribe-box__capture-form__terms__checkbox"
              type="checkbox"
              required
            >
          </div>
          <div class="nav-subscribe-box__capture-form__terms__check-label">
            <label for="termsCheck">
              <span class="nav-subscribe-box__capture-form__terms__checkbox-label__text">
                I agree to the
                <nuxt-link
                  to="/terms-of-service"
                >terms</nuxt-link>
                and
                <nuxt-link
                  to="/privacy"
                >
                  privacy policies.
                </nuxt-link>
              </span>
            </label>
          </div>
        </div>
        <label
          v-show="emailError"
          class="nav-subscribe-box__capture-form__error-text"
        >
          Please use a valid email address
        </label>
      </form>
      <div
        v-else
        class="nav-subscribe-box__success-message"
      >
        <div
          v-close-popover
          class="mobile-menu__header__toggler active"
        >
          <span class="first"></span>
          <span class="second"></span>
          <span class="third"></span>
          <span class="fourth"></span>
        </div>
        <p class="nav-subscribe-box__success-message__heading">
          Welcome to the family! Check your inbox for your confirmation.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const arrow = 'https://storage.googleapis.com/blavitynews/images/header/white-arrow.png'
export default {
  name: 'nav-subscribe-box',
  data () {
    return {
      emailAddress: '',
      emailError: false,
      submitDone: false,
      errorMessage: null,
      images: { arrow }
    }
  },

  methods: {
    async submit () {
      const { emailAddress } = this
      try {
        await this.$axios.$post('https://api.blavity.io/subscribers/blavity?list=blavityDaily', { name: emailAddress, email: emailAddress })
        this.emailError = false
        this.submitDone = true
      } catch (error) {
        this.emailError = true
        this.submitDone = false
        this.errorMessage = error
      }
    }
  }

}
</script>

<style lang="scss">
@import '~/stylesheets/components/_nav-subscribe-box.scss';
</style>

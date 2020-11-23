<template>
  <div
    class="subscribe-box-component"
  >
    <div
      v-show="!submitDone"
      :class="classObject"
    >
      <div class="subscribe-box-component__text-area">
        <h2>Get the freshest stories in your inbox, <span>every day.</span></h2>
      </div>
      <div class="subscribe-box-component__input">
        <div class="subscribe-box-component__input__text-area-wrap">
          <form
            method="post"
            @submit.prevent="submit"
          >
            <div class="subscribe-box-component__input__text-area-wrap__email-input-wrap">
              <input
                v-model="emailAddress"
                class="subscribe-box-component__input__text-area-wrap__email-input-wrap__email-input"
                type="email"
                placeholder="Your email address"
                required
              >
              <button
                class="subscribe-box-component__input__text-area-wrap__email-input-wrap__btn_submit"
                type="submit"
              >
                <img
                  class="right-img"
                  src="https://storage.googleapis.com/blavitynews/assets/images/right-arrow.png"
                  width="30"
                  height="15"
                  alt="Navigate Right Icon"
                >
                <img
                  class="mob_right"
                  src="https://storage.googleapis.com/blavitynews/assets/images/right-arrow_black.png"
                  width="30"
                  height="15"
                  alt="Navigate Right Icon"
                >
              </button>
            </div>
            <div class="subscribe-box-component__input__text-area-wrap__input-wrap">
              <input
                id="termsCheck"
                class="subscribe-box-component__input__text-area-wrap__input-wrap__checkbox-input"
                type="checkbox"
                required
              >
              <label for="termsCheck">
                <span class="subscribe-box-component__input__text-area-wrap__input-wrap__checkbox-input-text">
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
            <label
              v-show="emailError"
              class="error-text"
            >
              Please use a valid email address
            </label>
          </form>
        </div>
      </div>
    </div>
    <div
      v-show="submitDone"
      class="inbox"
      :style="inboxStyle"
    >
      <h2
        class="submit-done"
      >
        Welcome to the family! Check your inbox for your confirmation.
      </h2>
      <div
        class="close-icon"
        @click="inboxStyle.visibility = 'hidden'"
      >
        <img
          src="https://storage.googleapis.com/blavitynews/assets/images/cancel.png"
          width="25"
          height="25"
          alt="Exit Confirmation"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'category-subscribe-box',

  data () {
    return {
      emailAddress: '',
      successMessage: '',
      emailError: false,
      submitDone: false,
      errorMessage: null,
      inboxStyle: {
        visibility: 'visible'
      }
    }
  },

  computed: {
    classObject () {
      if (this.$mq === 'mobile' || this.$mq === 'tablet') {
        return {
          inbox: false,
          'inbox__light': true
        }
      } else {
        return {
          inbox: true,
          'inbox__light': false
        }
      }
    }
  },

  methods: {
    async submit () {
      const { emailAddress } = this
      try {
        this.successMessage = await this.$axios.$post('https://api.blavity.io/subscribers/blavity?list=blavityDaily', { name: emailAddress, email: emailAddress })
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
// TODO: When you come back, please add more DIFFERENT articles than what's around the page when the component disappears
</script>

<style lang="scss" scoped>
  @import '~/stylesheets/components/category/_category-subscribe-box.scss';
</style>

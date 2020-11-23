<template>
  <div
    class="subscribe-box-component"
  >
    <div
      v-show="!submitDone"
      :class="classObject"
    >
      <div class="text-area">
        <h2>Get the freshest stories in your inbox, <span>every day.</span></h2>
      </div>
      <div class="text-area">
        <div class="text-area-wrap">
          <form
            method="post"
            @submit.prevent="submit"
          >
            <div class="emil-input-wrap">
              <input
                v-model="emailAddress"
                class="email-input"
                type="email"
                placeholder="Your email address"
                required
              >
              <button
                class="btn_submit"
                type="submit"
              >
                <img
                  class="right-img"
                  src="https://storage.googleapis.com/blavitynews/assets/images/right-arrow.png"
                  alt="Subscribe to Newsletter Button"
                >
                <img
                  class="mob_right"
                  src="https://storage.googleapis.com/blavitynews/assets/images/right-arrow_black.png"
                  alt="Subscribe to Newsletter Button"
                >
              </button>
            </div>
            <div class="input-wrap">
              <input
                id="termsCheck"
                class="checkbox-input"
                type="checkbox"
                required
              >
              <label for="termsCheck">
                <span class="checkbox-input-text">
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
          alt="Exit Subscription Confirmation Icon"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'subscribe-box-component',

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
  @import '~/stylesheets/components/_subscribe-box-component.scss';
</style>

<template>
  <div class="subscribe-form">
    <div
      v-show="!submitDone"
      class="subscribe-container"
    >
      <h1
        class="subscribe-box-title"
      >
        Like what you're reading?<br>Get more in <i>your inbox.</i>
      </h1>
      <form
        method="post"
        class="subscribe-form"
        @submit.prevent="submit"
      >
        <input
          v-model="emailAddress"
          type="email"
          placeholder="Your email address"
          required
        >
        <label class="opt-in">
          <input
            type="checkbox"
            required="required"
            class="form-check-input"
          >I agree to the <nuxt-link to="/terms-of-service">terms</nuxt-link> and <nuxt-link to="/privacy">privacy policies</nuxt-link>.</label>
        <button type="submit"></button>
      </form>
    </div>
    <div
      v-if="!isHidden"
      v-show="submitDone"
      class="submit-done"
    >
      <h2
        class="submit-done__title"
      >
        Welcome to the family! Check your inbox for your confirmation.
      </h2>
      <div
        class="submit-done__close-icon"
        @click="isHidden = true"
      >
        <img
          src="https://storage.googleapis.com/blavitynews/images/category/plus.svg"
          alt="More Categories Icon"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'subscribe-form',
  data () {
    return {
      emailAddress: '',
      emailError: false,
      submitDone: false,
      errorMessage: null,
      successMessage: '',
      isHidden: false

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
</script>

<style lang="scss">
  @import '~/stylesheets/components/_subscribe-form.scss';
</style>

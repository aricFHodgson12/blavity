<template>
  <div class="article-social-left">
    <social-sharing-button
      network="facebook"
      :description="decodeDescription"
      :title="decodeTitle"
      :current-url="decodeCurrentUrl"
    ></social-sharing-button>
    <social-sharing-button
      network="twitter"
      :description="decodeDescription"
      :title="decodeTitle"
      :current-url="decodeCurrentUrl"
    ></social-sharing-button>
    <social-sharing-button
      network="linkedin"
      :description="decodeDescription"
      :title="decodeTitle"
      :current-url="decodeCurrentUrl"
    ></social-sharing-button>
    <social-sharing-button
      v-if="!isViewportMobile"
      network="email"
      :description="decodeDescription"
      :title="decodeTitle"
      :current-url="decodeCurrentUrl"
    ></social-sharing-button>
  </div>
</template>

<script>
import he from 'he'
import SocialSharingButton from '~/components/SocialSharingButton'

export default {
  name: 'article-social-left',

  components: {
    SocialSharingButton
  },

  props: {
    description: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },
    currentUrl: {
      type: String,
      required: true
    }
  },

  computed: {
    isViewportMobile () {
      return (this.$mq === 'mobile')
    },
    decodeTitle () {
      return he.decode(this.title)
    },
    decodeDescription () {
      return he.decode(this.description)
    },
    decodeCurrentUrl () {
      return he.decode(this.currentUrl)
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/components/_article-social-left.scss';
</style>

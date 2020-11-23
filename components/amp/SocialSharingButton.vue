<template>
  <div class="social-sharing-button-wrapper">
    <a
      :href="shareUrl"
      :class="network"
      class="btn-social-sharing"
      target="_blank"
    >
    </a>
  </div>
</template>

<script>
import _$keys from 'lodash/keys'
import _$includes from 'lodash/includes'
import _$truncate from 'lodash/truncate'
import he from 'he'

const networks = {
  facebook: {
    getShareUrl: ({ title, description, currentUrl }) => {
      // const { href: currentUrl } = document.location
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}&quote=${encodeURIComponent(description)}`
      return shareUrl
    }
  },

  twitter: {
    getShareUrl: ({ title, currentUrl }) => {
      const tweet = `Check Out This Article: ${_$truncate(title, {
        'length': 80,
        'separator': /,? +/
      })}`
      // const { href: currentUrl } = document.location
      const shareUrl = `https://twitter.com/share?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(tweet)}`
      return shareUrl
    }
  }
}

export default {
  name: 'amp-social-sharing-button',

  props: {
    network: {
      type: String,
      required: true,

      validator: (value) => {
        const networkKeys = _$keys(networks)

        return _$includes(networkKeys, value)
      }
    },

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
    shareData () {
      return {
        description: he.decode(this.description),
        title: he.decode(this.title),
        currentUrl: he.decode(this.currentUrl)
      }
    },

    shareUrl () {
      return networks[this.network].getShareUrl(this.shareData)
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/amp/components/_social-sharing-button.scss';
</style>

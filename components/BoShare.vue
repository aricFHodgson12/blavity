<template>
  <div class="bo-social-sharing-button-wrapper">
    <button
      :id="network"
      class="bo-btn-social-sharing"
      @click="showShareWindow"
    >
    </button>
  </div>
</template>

<script>
import _$keys from 'lodash/keys'
import _$includes from 'lodash/includes'
import he from 'he'

const computeShareWindowFeatures = () => {
  const height = 640
  const width = 640
  const left = ((window.screen.width / 2) - (width / 2))
  const top = ((window.screen.height / 2) - (height / 2))

  return `height=${height},left=${left},menubar=no,scrollbars=no,toolbar=no,top=${top},width=${width}`
}

const networks = {
  facebook: {
    showShareWindow: ({ title, description, currentUrl }) => {
      // const { href: currentUrl } = document.location
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}&quote=${encodeURIComponent(description)}`

      window.open(shareUrl, 'Share this',
        computeShareWindowFeatures())
    }
  }
}

export default {
  name: 'bo-social-sharing-button',

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
        description: `${this.description}`,
        title: he.decode(this.title),
        currentUrl: he.decode(this.currentUrl)
      }
    }
  },

  methods: {
    showShareWindow () {
      if (! process.browser) {
        return
      }

      const network = networks[this.network]

      network.showShareWindow(this.shareData)
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/pages/_blavity-original.scss';
</style>

<template>
  <div class="social-sharing-button-wrapper">
    <button
      v-if="!isEmail"
      class="btn-social-sharing"
      :class="network"
      @click="showShareWindow"
    >
    </button>
    <a
      v-else
      class="btn-social-sharing"
      :class="network"
      :href="emailShareUrl"
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

const computeShareWindowFeatures = () => {
  const height = 640
  const width = 640
  const left = ((window.screen.width / 2) - (width / 2))
  const top = ((window.screen.height / 2) - (height / 2))

  return `height=${height},left=${left},menubar=no,scrollbars=no,toolbar=no,top=${top},width=${width}`
}

const networks = {
  email: {
    emailShareUrl: ({ currentUrl, title, description }) => {
      const message = `${_$truncate(description, {
        'length': 160
      })}`
      const shareUrl = `mailto:?subject=Check%20Out%20This%20Article%20&body=${encodeURIComponent(message)}%20${encodeURIComponent(currentUrl)}`
      return shareUrl
    }
  },

  facebook: {
    showShareWindow: ({ title, description, currentUrl }) => {
      // const { href: currentUrl } = document.location
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}&quote=${encodeURIComponent(description)}`

      window.open(shareUrl, 'Share this',
        computeShareWindowFeatures())
    }
  },

  twitter: {
    showShareWindow: ({ title, currentUrl }) => {
      const tweet = `Check Out This Article: ${_$truncate(title, {
        'length': 80,
        'separator': /,? +/
      })}`
      // const { href: currentUrl } = document.location
      const shareUrl = `https://twitter.com/share?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(tweet)}`

      window.open(shareUrl, 'Share this',
        computeShareWindowFeatures())
    }
  },

  linkedin: {
    showShareWindow: ({ title, description, currentUrl }) => {
      // const { href: currentUrl } = document.location
      const shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`

      window.open(shareUrl, 'Share this',
        computeShareWindowFeatures())
    }
  }
}

export default {
  name: 'social-sharing-button',

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
    emailShareUrl () {
      return networks.email.emailShareUrl(this.shareData)
    },

    isEmail () {
      return (this.network === 'email')
    },

    shareData () {
      return {
        description: he.decode(this.description),
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
@import '~/stylesheets/components/_social-sharing-button.scss';
</style>

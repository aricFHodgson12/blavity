<template>
  <no-ssr>
    <div
      :id="id"
      :key="key"
    >
    </div>
  </no-ssr>
</template>

<script>
import _$every from 'lodash/every'
import uuidv4 from 'uuid/v4'

export default {
  name: 'jw-player',

  props: {
    type: {
      required: false,
      type: String,
      default: 'native'
    },
    file: {
      type: String,
      required: false,
      default: ''
    },
    sources: {
      type: Array,
      required: false,
      default: () => []
    },
    image: {
      type: String,
      required: false,
      default: ''
    },
    autostart: {
      type: Boolean,
      required: false,
      default: false
    },
    width: {
      type: String,
      required: false,
      default: '100%'
    },
    aspectratio: {
      type: String,
      required: false,
      default: '16:9'
    }
  },
  data () {
    return {
      key: 1
    }
  },
  computed: {
    id () {
      return `jw-player-${uuidv4()}`
    },

    data () {
      const { file, image, sources } = this

      return { file, image, sources }
    },

    isViewportMobile () {
      return (this.$mq === 'mobile')
    }
  },

  watch: {
    data () {
      this.setup()
    }
  },

  mounted () {
    // let oldScript = document.getElementById('lastScript')

    let poll
    let timeout = 100
    // let jwplayerSource
    // if (this.type === 'native') {
    //   jwplayerSource = '//content.jwplatform.com/libraries/FuVoJsVB.js'
    // } else {
    //   jwplayerSource = '//cdn.jwplayer.com/libraries/dBZiIaBn.js'
    // }
    let jwplayerSource = '//cdn.jwplayer.com/libraries/dBZiIaBn.js'
    const scripts = document.getElementsByTagName('script')
    let jwplayerScript = document.createElement('script')

    // if (oldScript) {
    //   oldScript.setAttribute('src', `${jwplayerSource}`)
    //   this.key ++
    // } else {
    //   jwplayerScript.setAttribute('src', `${jwplayerSource}`)
    //   jwplayerScript.setAttribute('type', 'text/javascript')
    //   jwplayerScript.setAttribute('id', 'lastScript')
    //   jwplayerScript.setAttribute('async', true)
    //   document.body.appendChild(jwplayerScript)
    //   this.key ++
    // }
    jwplayerScript.setAttribute('src', `${jwplayerSource}`)
    jwplayerScript.setAttribute('type', 'text/javascript')
    jwplayerScript.setAttribute('id', 'lastScript')
    jwplayerScript.setAttribute('async', true)
    document.body.appendChild(jwplayerScript)
    poll = () => {
      setTimeout(() => {
        timeout --

        // eslint-disable-next-line
        if (typeof jwplayer !== 'undefined') {
          this.setup()
        } else if (timeout > 0) {
          poll()
        } else {
          this.$emit('fail-load')
        }
      }, 100)
    }

    if (_$every(scripts, ({ src }) => (src !== jwplayerSource))) {
      poll()
    } else {
      this.setup()
    }
  },

  methods: {
    setup () {
      let options = {
        primary: 'html5',
        image: this.image,
        width: this.width,
        autostart: this.autostart,
        aspectratio: this.aspectratio
      }

      if (this.file) {
        options = { ...options, file: this.file }
      } else if (this.sources) {
        options = { ...options, sources: this.sources }
      } else {
        return
      }

      // eslint-disable-next-line
      if (jwplayer) {
        // eslint-disable-next-line
        let playerInstance = jwplayer(this.id)

        playerInstance.setup(options)

        playerInstance.on('play', (data) => {
          this.$emit('play', data)

          if (this.isViewportMobile) {
            playerInstance.setFullscreen(true)
          }
        })

        playerInstance.on('pause', (data) => {
          this.$emit('pause', data)
        })

        playerInstance.on('complete', (data) => {
          this.$emit('complete', data)
        })
      }
    }
  }
}
</script>

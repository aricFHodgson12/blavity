<template>
  <div :id="slotId"></div>
</template>

<script>
import uuidv4 from 'uuid/v4'

/* eslint-disable */
export default {
  name: 'ad-base',

  props: {
    adType: {
      type: String,
      required: false,
      default: () => ''
    },
    position: {
      type: String,
      required: false,
      default: () => ''
    },
    allowTall: {
      type: Boolean,
      required: false,
      default: false
    },
    id: {
      type: [Number, String],
      required: false,
      default: () => uuidv4()
    },
    tagSlugs: {
      type: Array,
      required: false,
      default: () => null
    },
    categorySlug: {
      type: String,
      required: false,
      default: () => null
    },
    page: {
      type: String,
      required: false,
      default: () => null
    },
    brandSafe: {
      type: Boolean,
      required: false,
      default: () => false
    },
    keyValues: {
      type: Object,
      required: false,
      default: () => {}
    }
  },

  data () {
    return {
      slot: null,
      timeout: null
    }
  },

  computed: {
    slotId () {
      let prefix
      if (this.adType && this.position) {
          prefix = `ad-${this.adType}-${this.position}-slot-`
      } else if (this.adType === `teads`) {
          prefix = `ad-teads-slot-`
      }else if (this.adType === `sticky`) {
          prefix = `ad-mobile-sticky-slot`
      } else {
          prefix = `ad-`
      }
      return `${prefix}${this.id}`
    }
  },

  mounted () {
    // Set a timeout to prevent ads from loading if Vue renders the component
    // twice in a row within 50ms
    this.timeout = setTimeout(() => {
      this.setup()
      this.timeout = null
    }, 50)
  },

  beforeDestroy () {
    if (this.timeout) {
      clearTimeout(this.timeout)
    } else {
      this.destroySlot()
    }
  },

  methods: {
    setup () {
      const AdBridg = window.AdBridg
      var desktopSizes, mobileSizes

      if (this.adType === 'leaderboard') {
        desktopSizes = this.allowTall ? [[970, 250], [728, 90]] : [[728, 90]]
        mobileSizes = [[320, 50]]
      } else if (this.adType === 'rectangle') {
        desktopSizes = this.allowTall ? [[300, 250], [300, 600]] : [[300, 250]]
        mobileSizes = [[300, 250]]
      } else if (this.adType === 'sticky') {
        desktopSizes = [[320, 50]]
        mobileSizes = [[320, 50]]
      } else if (this.adType === 'teads') {
        desktopSizes = [[1, 1]]
        mobileSizes = [[1, 1]]
      } else {
        return
      }

      AdBridg.cmd.push(() => {
        var adPath = '/11462305847/bla'

        const sizeMapping = AdBridg.sizeMapping()
          .addSize([980, 0], desktopSizes)
          .addSize([0, 0], mobileSizes)
          .build()

        if (this.categorySlug) {
          adPath += ('/' + this.categorySlug)
        }

        this.slot = AdBridg.defineSlot(adPath, desktopSizes, this.slotId)
          .defineSizeMapping(sizeMapping)

        AdBridg.useSizeMapping(this.slot, sizeMapping)

        if (this.page) {
          this.slot.setTargeting('page', this.page)
        }

        if (this.position) {
          this.slot.setTargeting('pos', this.position)
        }

        if (Array.isArray(this.tagSlugs)) {
          this.slot.setTargeting('tags', this.tagSlugs)
        }

        if (typeof this.keyValues === 'object' && this.keyValues !== null) {
          for (var key in this.keyValues) {
            if (this.keyValues.hasOwnProperty(key)) {
              this.slot.setTargeting(key, this.keyValues[key])
            }
          }
        }

        if (this.brandSafe) {
          this.slot.setTargeting('brand_safe', 'yes')
        }

        AdBridg.display(this.slotId)
        AdBridg.serve()
      })
    },

    destroySlot () {
      const AdBridg = window.AdBridg

      AdBridg.cmd.push(() => {
        AdBridg.destroySlots([this.slot])
      })
    }
  }
}
</script>
<style lang="scss">
@import '~/stylesheets/components/_ad-mobile-sticky.scss'
</style>

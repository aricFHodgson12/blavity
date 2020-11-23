<template>
  <amp-ad
    width="320"
    height="50"
    type="doubleclick"
    :data-slot="slot"
  ></amp-ad>
</template>

<script>
export default {
  name: 'amp-ad-leaderboard',

  props: {
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
    }
  },

  computed: {
    slot () {
      var adPath = '/11462305847/bla/amp'
      if (this.categorySlug) {
        adPath += ('/' + this.categorySlug)
      }
      return adPath
    }
  }
}
</script>

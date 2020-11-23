<template>
  <amp-ad
    width="300"
    height="1"
    type="teads"
    layout="responsive"
    :data-pid="slot"
  ></amp-ad>
</template>

<script>
export default {
  name: 'amp-ad-teads',

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
      return '97649'
      // var adPath = '/11462305847/bla'
      // if (this.categorySlug) {
      //   adPath += ('/' + this.categorySlug)
      // }
      // return adPath
    }
  }
}
</script>

<template>
  <div class="sponsored-campaign-component">
    <h5
      class="sponsored-campaign-component__title"
    >
      SPONSORED BY
    </h5>
    <div class="sponsored-campaign-component__logo">
      <amp-img
        :src="sponsorLogo"
        width="310"
        height="61"
        layout="responsive"
      ></amp-img>
    </div>
    <div class="sponsored-campaign-component__pent-tile">
      <SponsoredPentTile
        :sponsored-articles="sponsoredArticles"
      >
      </SponsoredPentTile>
    </div>
  </div>
</template>

<script>
import SponsoredPentTile from '~/components/amp/sponsored/SponsoredPentTile'
import { testArticles } from '~/utils/dataStructures.js'

const logo = 'https://storage.googleapis.com/blavitynews/assets/images/Sponsor%20Logo.svg'
const defaultPosts = testArticles
export default {
  name: 'amp-sponsored-campaign-component',
  components: { SponsoredPentTile },
  props: {
    sponsoredArticles: {
      required: true,
      type: Array,
      default: () => ([...defaultPosts])
    }
  },
  data () {
    return {
      sponsorLogo: logo
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/amp/components/_sponsored-campaign-component.scss';
</style>

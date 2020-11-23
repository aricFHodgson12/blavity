<template>
  <div class="header-wrapper">
    <mobile-navigation-menu></mobile-navigation-menu>
    <amp-sidebar
      id="mobile-sidebar"
      class="sidebar-nav-wrapper"
      layout="nodisplay"
      side="left"
    >
      <div class="sidebar-header">
        <amp-img
          :src="images.logo"
          alt="Blavity News Logo"
          width="125"
          height="16"
        ></amp-img>
        <button
          on="tap:mobile-sidebar.close"
          class="btn-sidebar-close"
        >
          x
        </button>
      </div>
      <div class="sidebar-nav">
        <ul class="sidebar-nav-list">
          <li
            v-for="cat in mainCats"
            :key="cat"
            class="sidebar-nav-item"
          >
            <nuxt-link :to="`/categories/${categories[cat].slug}`">
              {{ categories[cat].name }}
            </nuxt-link>
            <ul class="sidebar-nav-list">
              <li
                v-for="(subCategory, index) in categories[cat].subCategories"
                :key="index"
                class="sidebar-nav-item"
              >
                <nuxt-link
                  :to="`/categories/${categories[cat].slug}/${subCategory.slug}`"
                >
                  {{ subCategory.name }}
                </nuxt-link>
              </li>
            </ul>
          </li>
          <li class="sidebar-nav-item">
            <nuxt-link to="/categories/opinion">
              Op-Ed
            </nuxt-link>
          </li>
        </ul>
      </div>
    </amp-sidebar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MobileNavigationMenu from '~/components/amp/MobileNavigationMenu'

const logo = 'https://storage.googleapis.com/blavitynews/assets/images/Blavity-News-White%402x.png'

export default {
  name: 'amp-navigation',
  components: {
    MobileNavigationMenu
  },
  data () {
    return {
      mainCats: ['news', 'politics', 'culture', 'lifestyle'],
      images: {
        logo
      }
    }
  },
  computed: {
    ...mapGetters({
      categories: 'blavityCategories/getCategoryObject'
    })
  }
}
</script>

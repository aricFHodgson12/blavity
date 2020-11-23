<template>
  <div class="category-dropdown">
    <h1 class="category-dropdown__heading">
      <nuxt-link
        :to="`/categories/${category.slug}`"
        class="category-dropdown__heading__text"
      >
        {{ category.name }}
      </nuxt-link>
      <div class="category-dropdown__heading__trigger">
        <amp-img
          id="category-dropdown-button"
          class="category-dropdown__heading__trigger__image active"
          :src="plus"
          alt="More Categories Icon"
          width="16"
          height="24"
          layout="fixed"
        ></amp-img>
      </div>
    </h1>
    <ul
      id="category-dropdown-toggle"
      class="category-dropdown__list show-drop"
    >
      <li
        v-for="(subCategory, index) in category.subCategories "
        :id="`${subCategory.slug}`"
        :key="index"
        class="category-dropdown__list__subcategory"
        :class="{ selected : checkSelect(subCategory.slug) }"
      >
        <nuxt-link
          :to="`/categories/${category.slug}/${subCategory.slug}`"
          class=""
        >
          {{ subCategory.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
const plus = 'https://storage.googleapis.com/blavitynews/images/category/plus.svg'

export default {
  name: 'amp-category-dropdown',

  props: {
    category: {
      type: Object,
      required: true
    },
    shouldOpen: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data () {
    return {
      errorMessage: null,
      open: true,
      clicked: this.$route.params.slug,
      plus
    }
  },
  computed: {
    ...mapGetters({
      getCurrentSubCategory: 'blavityCategories/getCurrentSubCategory'
    })
  },
  methods: {
    checkSelect (data) {
      return data === this.clicked
    }
  },
  ...mapMutations({
    setSubCategory: 'blavityCategories/setSubCategory'
  })
}
</script>

<style lang="scss">
@import'~/stylesheets/amp/components/category/_category-dropdown.scss';
</style>

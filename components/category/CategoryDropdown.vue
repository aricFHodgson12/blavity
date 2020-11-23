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
        <img
          id="category-dropdown-button"
          v-lazy="plus"
          class="category-dropdown__heading__trigger__image"
          alt="More Categories Icon"
          @click="handleDropdown"
        >
      </div>
    </h1>
    <ul
      v-show="open"
      id="category-dropdown-toggle"
      class="category-dropdown__list"
    >
      <li
        v-for="(subCategory, index) in category.subCategories "
        :id="`${subCategory.slug}`"
        :key="index"
        class="category-dropdown__list__subcategory"
        :class="{ selected : checkSelect(subCategory.slug) }"
        @click="handleClick(subCategory.slug)"
      >
        {{ subCategory.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
const plus = 'https://storage.googleapis.com/blavitynews/images/category/plus.svg'

export default {
  name: 'category-dropdown',

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
      open: false,
      clicked: this.$route.params.slug,
      plus
    }
  },
  computed: {
    ...mapGetters({
      getCurrentSubCategory: 'blavityCategories/getCurrentSubCategory'
    })
  },
  mounted () {
    this.handleDropdown()
  },
  methods: {
    checkSelect (data) {
      return data === this.clicked
    },
    highlightSubCategory (subCategoryName) {
      if (subCategoryName === this.getCurrentSubCategory) {
        return true
      } else {
        return false
      }
    },
    handleDropdown () {
      const {
        open
      } = this
      const drop = document.getElementById('category-dropdown-toggle')
      const button = document.getElementById('category-dropdown-button')
      if (open === false) {
        drop.classList.add('show-drop')
        button.classList.add('active')
      } else if (open === true) {
        drop.classList.remove('show-drop')
        button.classList.remove('active')
      }
      this.open = ! (this.open)
    },
    handleClick (clickedID) {
      const { category } = this.$route.params
      this.clicked = clickedID
      this.$store.commit('blavityCategories/setSubCategory', this.clicked)
      this.$router.push(`/categories/${category}/${this.clicked}`)
    }
  },
  ...mapMutations({
    setSubCategory: 'blavityCategories/setSubCategory'
  })
}
</script>

<style lang="scss">
@import'~/stylesheets/components/category/_category-dropdown.scss';
</style>

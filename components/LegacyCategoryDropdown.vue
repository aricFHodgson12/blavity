<template>
  <div class="category-dropdown">
    <h1 class="category-dropdown__heading">
      <span class="category-dropdown__heading__text">{{ category }}</span>
    </h1>
  </div>
</template>

<script>
const plus = 'https://storage.googleapis.com/blavitynews/images/category/plus.svg'

export default {
  name: 'category-dropdown',

  props: {
    category: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      errorMessage: null,
      open: false,
      plus
    }
  }
}
</script>

<style lang="scss">
@import'~/stylesheets/components/category/_category-dropdown.scss';
</style>

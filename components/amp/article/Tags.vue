<template>
  <div
    class="tags"
  >
    <div
      v-for="(tag, index) in tags"
      :key="index"
    >
      {{ tag.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'amp-tags',
  props: {
    tags: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/amp/components/_tags.scss';
</style>

<template>
  <div
    class="tags"
  >
    <div
      v-for="(tag, index) in tags"
      :key="index"
    >
      <nuxt-link
        :to="'/tags/'+tag.slug"
        class="slug"
      >
        {{ name(tag) }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tags',
  props: {
    tags: {
      type: Array,
      required: true
    }
  },

  methods: {
    name (tag) {
      if (process.browser) {
        const changeStyle = document.getElementsByClassName('tags')
        if (tag === null) {
          for (var i = 0; i < changeStyle.length; i ++) {
            changeStyle[i].style.display = 'none'
          }
        } else {
          return tag.name
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/stylesheets/components/_tags.scss';
</style>

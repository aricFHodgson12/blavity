<template>
  <div class="home-videos-tags">
    <p>
      <span
        v-for="tag in tags"
        :key="tag"
        class="tag"
        v-text="tag"
      ></span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'home-videos-tags',

  props: {
    tags: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
.home-videos-tags {
  .tag {
    color: #FF542F;
    line-height: 1.5rem;
    text-transform: capitalize;

    &:not(:last-child):after {
      content: ' / ';
    }
  }
}
</style>

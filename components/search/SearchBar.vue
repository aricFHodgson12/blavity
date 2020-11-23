<template>
  <div
    id="blavity-original-search"
    class="search-bar"
  >
    <form>
      <div class="form-row">
        <div class="col-9">
          <input
            v-model="query"
            class="form-control"
            type="search"
            placeholder="Search..."
            aria-label="Search"
          >
        </div>
        <div class="col">
          <nuxt-link
            :to="`/search/${query}`"
          >
            <button
              class="btn my-2 my-sm-0"
            >
              Search
            </button>
          </nuxt-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'search-bar',
  data () {
    return {
      query: null
    }
  },
  methods: {
    handleQuery () {
      this.$router.push(`/search/${this.query}`)
    }
  }

}
</script>

<style lang="scss" scoped>
  @import '~/stylesheets/components/search/_search-bar.scss';
</style>

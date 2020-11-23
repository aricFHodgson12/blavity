<template lang="html">
  <div class="mounted">
  </div>
</template>

<script>
export default {
  name: 'politics',
  mounted () {
    let redirect = true
    if (window) {
      while (redirect) {
        window.location.assign('https://politics.blavity.com')
        redirect = false
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>

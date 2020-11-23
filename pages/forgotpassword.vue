<template lang="html">
  <div class="mounted">
  </div>
</template>

<script>
export default {
  name: 'forgotpassword',
  mounted () {
    let redirect = true
    if (window) {
      while (redirect) {
        window.location.assign('https://editor.blavity.com/forgotpassword')
        redirect = false
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>

<template lang="html">
  <div class="mounted">
  </div>
</template>

<script>
export default {
  name: 'mail',
  mounted () {
    let redirect = true
    if (window) {
      while (redirect) {
        const myPath = window.location.pathname
        window.location.assign(`https://editor.blavity.com${myPath}`)
        redirect = false
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>

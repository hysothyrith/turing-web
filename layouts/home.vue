<template>
  <div class="wrapper">
    <nav-bar style="position: fixed; top: 0" />
    <Nuxt />
    <login-modal />
    <signup-modal />
  </div>
</template>

<script>
export default {
  errorCaptured(err) {
    if (process.env.NODE_ENV !== 'production') {
      this.$toast.error(err.message)
    } else {
      this.$toast.error(
        'Sorry, something went wrong on our end. Please try again later.'
      )
      return false
    }
  },
}
</script>

<style scoped>
.wrapper {
  background-color: var(--color-bg);
}
</style>

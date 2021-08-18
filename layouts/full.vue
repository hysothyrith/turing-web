<template>
  <div class="wrapper">
    <NavBar />
    <Nuxt />
    <login-modal />
    <signup-modal />
  </div>
</template>

<script>
export default {
  provide: {
    size: 22,
    weight: 'light',
    mirrored: false,
  },
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

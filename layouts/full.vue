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
}
</script>

<style scoped>
.wrapper {
  background-color: var(--color-bg);
}
</style>

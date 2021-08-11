<template>
  <div class="wrapper">
    <nav-bar style="position: fixed; top: 0" />
    <Nuxt />
    <login-modal />
    <signup-modal />
  </div>
</template>

<style scoped>
.wrapper {
  background-color: var(--color-bg);
}
</style>

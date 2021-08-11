<template>
  <div class="wrapper">
    <NavBar />
    <div class="body__wrapper">
      <div class="body__wrapper-inner">
        <Nuxt />
      </div>
    </div>
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

.body__wrapper {
  margin: var(--spacing-side);
  margin-top: var(--spacing-4);
  position: relative;
  display: flex;
  justify-content: center;
}

.body__wrapper-inner {
  width: 100%;
  max-width: var(--width-max);
}

@media only screen and (min-width: 720px) {
  .body__wrapper {
    margin-top: var(--spacing-8);
  }
}
</style>

<template>
  <small class="rating">
    <slot />
  </small>
</template>

<style scoped>
.rating {
  color: var(--color-less-prominent);
  border: 1px solid var(--color-less-prominent);
  padding: 2px var(--spacing-2);
}
</style>

<template>
  <button>
    <slot />
  </button>
</template>

<style scoped>
button {
  background: none;
  cursor: pointer;
  color: var(--color-less-prominent);
  padding: var(--spacing-2) var(--spacing-4);
  border: 2px solid var(--color-less-prominent);
  border-radius: 4px;
}

button:hover {
  color: var(--color-prominent);
  border: 2px solid var(--color-prominent);
}
</style>

<template>
  <button
    v-bind="$attrs"
    :disabled="loading"
    :class="['button', { loading: loading, text: variant === 'text' }]"
    v-on="$listeners"
  >
    <span class="spinner__wrapper">
      <client-only>
        <spinner
          :animation-duration="1000"
          :size="24"
          color="black" /></client-only
    ></span>
    <span class="slot__wrapper">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'rg',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'regular',
    },
  },
}
</script>

<style scoped>
.button {
  padding: var(--spacing-3) var(--spacing-4);
  font-size: 0.889rem;
  border-radius: var(--b-radius);
  border: var(--b-width) solid var(--color-primary);
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: background-color 100ms ease, border-color 100ms ease;
  background-color: var(--color-prominent);
}

.button:active {
  background-color: var(--color-less-prominent);
  border-color: var(--color-less-prominent);
}

.button:disabled {
  cursor: not-allowed;
}

.button.text {
  background-color: transparent;
  color: var(--color-prominent);
  border: none;
  padding: 0;
}

.slot__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading .slot__wrapper {
  visibility: hidden;
}

.spinner__wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: none;
}

.loading .spinner__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

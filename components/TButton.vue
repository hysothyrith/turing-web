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
    <span
      :class="[
        'slot__wrapper',
        { 'slot__wrapper--primary': color === 'primary' },
        { 'slot__wrapper--prominent': color === 'prominent' },
      ]"
    >
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
    color: {
      type: String,
      default: 'prominent',
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
  background-color: var(--color-prominent);
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: background-color 100ms ease, border-color 100ms ease;
}

.button:focus,
.button:hover {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.button:active {
  background-color: var(--color-less-prominent);
  border-color: var(--color-less-prominent);
}

.button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.button.text {
  background-color: transparent;
  border: none;
  padding: var(--spacing-2);
}

.button.text:hover,
.button.text:focus {
  background-color: var(--color-muted);
}

.slot__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading .slot__wrapper {
  visibility: hidden;
}

.button.text .slot__wrapper--primary {
  color: var(--color-primary);
}

.button.text:hover .slot__wrapper--primary {
  color: var(--color-prominent);
}

.button.text .slot__wrapper--prominent {
  color: var(--color-prominent);
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

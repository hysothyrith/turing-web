<template>
  <span
    :style="{
      display: 'inline-block',
      width: width,
      minWidth: width,
      height: height,
      minHeight: height,
    }"
  />
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: '1',
    },
    axis: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    width() {
      return this.axis === 'vertical' ? 1 : `var(--spacing-${this.size})`
    },
    height() {
      return this.axis === 'horizontal' ? 1 : `var(--spacing-${this.size})`
    },
  },
}
</script>

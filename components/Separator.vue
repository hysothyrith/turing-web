<template>
  <div :class="axis" />
</template>

<script>
export default {
  props: {
    axis: {
      type: String,
      default: 'horizontal',
    },
  },
}
</script>

<style scoped>
.horizontal {
  border-top: var(--b-width) solid var(--color-muted);
  width: 100%;
  height: 1px;
  max-height: 1px;
  min-height: 1px;
}

.vertical {
  border-left: var(--b-width) solid var(--color-muted);
  height: 100%;
  width: 1px;
  min-width: 1px;
  min-height: 1px;
}
</style>

<template>
  <div v-show="isActive" role="tabpanel">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isActive: false,
    }
  },
  mounted() {
    this.isActive = this.selected
  },
}
</script>

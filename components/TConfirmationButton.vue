<template>
  <t-button
    v-if="!showConfirmation"
    v-bind="$attrs"
    v-on="$listeners"
    @click.stop="showConfirmation = true"
  >
    <slot />
  </t-button>
  <span
    v-else
    class="confirmation"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    {{ message }}
    <t-button
      variant="text"
      class="ml-2"
      @click="
        showConfirmation = false
        $emit('on-confirm')
      "
      >Yes</t-button
    >
    <t-button variant="text" @click="showConfirmation = false">Cancel</t-button>
  </span>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: 'Are you sure?',
    },
  },
  data() {
    return {
      showConfirmation: false,
      dismissTimeout: null,
    }
  },
  methods: {
    onMouseEnter() {
      clearTimeout(this.dismissTimeout)
    },
    onMouseLeave() {
      this.dismissTimeout = setTimeout(() => {
        this.showConfirmation = false
      }, 1000)
    },
  },
}
</script>

<style scoped>
.wrapper {
  display: inline-flex;
  position: relative;
}

.confirmation {
  display: inline-flex;
  font-size: 0.889rem;
  align-items: center;
}
</style>

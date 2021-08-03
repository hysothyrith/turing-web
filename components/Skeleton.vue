<template>
  <div
    class="skeleton"
    :style="{ width, height, animationDelay: `${delay * 0.1}s` }"
  />
</template>

<script>
export default {
  props: {
    delay: {
      type: Number,
      default: 0,
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
  },
}
</script>

<style scoped>
.skeleton {
  background-color: grey;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    background-color: grey;
  }
  70% {
    background-color: #454545;
  }
  100% {
    background-color: grey;
  }
}
</style>

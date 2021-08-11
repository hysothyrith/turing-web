<template>
  <div
    class="skeleton"
    :style="{
      width,
      height,
      animationDelay: `${delay * 0.1}s`,
      borderRadius: borderRadius,
    }"
  ></div>
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
    borderRadius: {
      type: String,
      default: '0',
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

<template>
  <div
    :class="['skeleton', { show }]"
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
    enterDelay: {
      type: Number,
      default: 200,
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
  data() {
    return {
      show: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.show = true
    }, this.enterDelay)
  },
}
</script>

<style scoped>
.skeleton {
  background-color: grey;
  animation: pulse 2s infinite;
  opacity: 0;
  transition: opacity 200ms ease;
}

.skeleton.show {
  opacity: 1;
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

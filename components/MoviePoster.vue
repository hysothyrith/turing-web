<template>
  <div class="wrapper">
    <sized-image
      :src="src"
      :size="size"
      :alt="`${movieTitle} poster`"
      class="poster"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'w500',
    },
    movieTitle: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  padding-top: calc(40 / 27 * 100%);
  position: relative;
}

.poster {
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
}
</style>

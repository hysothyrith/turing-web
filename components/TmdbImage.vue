<template>
  <img
    :src="`https://image.tmdb.org/t/p/${size}${src}`"
    :alt="alt"
    @load="$emit('load')"
  />
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
      default:
        'w500' /* also available in w45, w92, w154, w185, w300, w500, and original */,
    },
    alt: {
      type: String,
      required: true,
    },
  },
}
</script>

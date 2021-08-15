<template>
  <img
    :src="`${$config.BASE_URL}/uploads/images/w500${src}`"
    :srcset="`
      ${$config.BASE_URL}/uploads/images/w300${src} 300w,
      ${$config.BASE_URL}/uploads/images/w500${src} 500w,
      ${$config.BASE_URL}/uploads/images/original${src} 2000w
    `"
    :alt="alt"
    :sizes="sizes"
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
    alt: {
      type: String,
      required: true,
    },
    sizes: {
      type: String,
      default: undefined,
    },
  },
}
</script>

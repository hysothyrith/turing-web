<template>
  <div class="wrapper">
    <sized-image
      :src="src"
      :alt="`${movieTitle} backdrop`"
      :size="size"
      class="backdrop"
      @load="$emit('load')"
    />
    <div v-if="overlay" class="overlay" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    movieTitle: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'original',
    },
    overlay: {
      type: Boolean,
    },
  },
}
</script>

<style scoped>
.wrapper {
  position: relative;
}

.backdrop {
  object-fit: cover;
  object-position: top;
}

.overlay {
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.5690651260504201) 20%,
    rgba(0, 0, 0, 0.20211834733893552) 60%,
    rgba(0, 0, 0, 0) 100%
  );
}
</style>

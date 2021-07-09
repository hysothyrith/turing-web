<template>
  <div class="wrapper">
    <img
      :src="movie.backdrop"
      :alt="`${movie.title} backdrop`"
      class="backdrop"
      @load="$emit('load')"
    />
    <div class="overlay" />
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
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

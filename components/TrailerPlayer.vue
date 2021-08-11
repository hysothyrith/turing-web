<template>
  <modal name="trailer-player" :adaptive="true" :width="900" height="auto">
    <div class="wrapper">
      <div class="iframe__wrapper">
        <iframe
          class="iframe"
          :src="`https://www.youtube.com/embed/${src}?autoplay=1&rel=0`"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  padding-top: calc(9 / 16 * 100%);
  position: relative;
}

.iframe__wrapper {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

.iframe {
  width: 100%;
  height: 100%;
  border: none;
  background-color: var(--color-bg);
}
</style>

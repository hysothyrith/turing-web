<template>
  <nav>
    <nuxt-link to="/" class="brand">Turing Cinemas</nuxt-link>
    <div class="links">
      <nuxt-link to="/cinemas" class="link">Cinemas</nuxt-link>
      <nuxt-link to="/showtimes" class="link">Showtime</nuxt-link>
      <nuxt-link to="/concession" class="link">Concession</nuxt-link>
    </div>
    <div class="background" :style="{ opacity: backgroundOpacity }"></div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      backgroundOpacity: 0,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateBackgroundOpacity)
  },
  destroyed() {
    window.removeEventListener('scroll', this.updateBackgroundOpacity)
  },
  methods: {
    updateBackgroundOpacity() {
      this.backgroundOpacity = window.scrollY.toFixed() * 0.01
    },
  },
}
</script>

<style scoped>
nav {
  height: 48px;
  display: flex;
  align-items: center;
  padding: var(--spacing-2) 0;
  width: 100%;
  z-index: 2;
  position: fixed;
  top: 0;
}

.background {
  background: var(--color-bg);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.brand {
  text-decoration: none;
  color: inherit;
  font-weight: 600;
  margin: 0 var(--spacing-side);
}

.links {
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  margin: 0 var(--spacing-side);
}

.brand,
.links {
  z-index: 3;
}

.link {
  text-decoration: none;
  color: inherit;
  margin-left: var(--spacing-4);
}
</style>

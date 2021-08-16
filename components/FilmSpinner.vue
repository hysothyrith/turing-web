<template>
  <img
    src="~/static/film_spinner.svg"
    alt="Loading indicator"
    class="film-spinner"
  />
</template>

<style scoped>
.film-spinner {
  animation: spin 2s linear infinite;
  width: 1.6rem;
  opacity: 0.8;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

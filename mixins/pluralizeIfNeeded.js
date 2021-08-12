export default {
  methods: {
    pluralizeIfNeeded(text, count) {
      return count > 1 ? text + 's' : text
    },
  },
}

export default {
  methods: {
    pluralizeIfNeeded(count, noun, suffix = 's') {
      return count === 1 ? noun : noun + suffix
    },
  },
}

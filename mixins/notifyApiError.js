export default {
  methods: {
    notifyApiError(err) {
      if (!err.response) {
        this.$toast.error(
          'An unexpected application error occured. Please try again later.'
        )
      }

      const { data } = err.response
      switch (data.type) {
        case 'ConstraintViolationError':
          this.$toast.error(data.message)
          break
        case 'InvalidRequestError':
          data.messages.forEach((msg) => this.$toast.error(msg))
          break
        default:
          this.$toast.error(
            'An unexpected error occured. Please try again later.'
          )
          break
      }
    },
  },
}

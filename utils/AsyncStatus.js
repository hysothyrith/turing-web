export default class AsyncStatus {
  status = 'idle'
  timeout = setTimeout(() => {}, 0)

  isIdle() {
    return this.status === 'idle'
  }

  isLoading() {
    return this.status === 'loading'
  }

  isResolved() {
    return this.status === 'resolved'
  }

  isRejected() {
    return this.status === 'rejected'
  }

  beginLoading(delay = 200) {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.status = 'loading'
    }, delay)
  }

  resolve() {
    clearTimeout(this.timeout)
    this.status = 'resolved'
  }

  reject() {
    clearTimeout(this.timeout)
    this.status = 'rejected'
  }
}

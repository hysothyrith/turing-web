export const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

export function runTimedPromise(promise, timeout) {
  return Promise.race([promise, sleep(timeout)])
}

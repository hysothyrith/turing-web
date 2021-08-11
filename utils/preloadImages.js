function preloadImages(srcs) {
  return new Promise((resolve, reject) => {
    let loaded = 0
    srcs.forEach((src) => {
      const img = new Image()
      img.onload = () => {
        if (++loaded === srcs.length) {
          resolve()
        }
      }
      img.onerror = () => {
        reject(new Error(`Failed to load ${src}`))
      }
      img.src = src
    })
  })
}

export default preloadImages

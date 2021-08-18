function preloadImages(srcs) {
  return new Promise((resolve, reject) => {
    let loaded = 0
    const imgs = []
    srcs.forEach((src) => {
      const img = new Image()
      imgs.push(img)
      img.onload = () => {
        if (++loaded === srcs.length) {
          resolve(imgs)
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

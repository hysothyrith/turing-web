export const mapKeys = (map) => (obj) => {
  const resObj = {}
  Object.keys(obj).forEach((key) => {
    if (map[key]) {
      if (obj[map[key]]) {
        throw new Error('Duplicate keys detected while mapping')
      }
      resObj[map[key]] = obj[key]
    } else {
      resObj[key] = obj[key]
    }
  })
  return resObj
}

export default function grabSentences(text, n, charLimit = 100) {
  // eslint-disable-next-line no-useless-escape
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g)

  if (sentences.length < 2 || text.length < charLimit) return text

  let res = ''
  for (let i = 0; i < n; i++) {
    if (res.length >= charLimit && i > 0) break
    res += i < n - 1 ? ' ' + sentences[i] : sentences[i]
  }

  return res
}

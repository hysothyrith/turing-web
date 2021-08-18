export function formatTime(timeString) {
  const date = new Date(`2020-01-01T${timeString}`)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString([], {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

export function formatDateAndTime(dateString, timeString) {
  return formatDate(dateString) + ' at ' + formatTime(timeString)
}

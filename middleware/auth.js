import { Mutations } from '~/constants'

export default function ({ store }) {
  if (process.server) {
    return
  }

  function setAuthData() {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (user && token) {
      store.commit(Mutations.SET_AUTH_DATA, { user: JSON.parse(user), token })
    }
  }

  setAuthData()
}

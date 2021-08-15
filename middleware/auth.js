import { Mutations } from '~/constants'

export default function ({ store, route, redirect }) {
  if (process.server) {
    return
  }

  const user = localStorage.getItem('user')
  const token = localStorage.getItem('token')
  if (user && token) {
    store.commit(Mutations.SET_AUTH_DATA, { user: JSON.parse(user), token })
  } else {
    const isProtected = route.meta.some(
      (meta) => meta.auth && meta.auth.protected
    )
    if (isProtected) {
      return redirect('/')
    }
  }
}

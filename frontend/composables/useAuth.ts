export function useAuth() {
  const token = useState<string | null>('token', () => null)
  const user = useState<IUser | null>('user', () => null)

  const authenticate = (newToken: string, newUser: IUser) => {
    setToken(newToken)
    setUser(newUser)
  }

  const logout = () => {
    token.value = null
    localStorage.removeItem('token')
    user.value = null
    localStorage.removeItem('user')
  }

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const setUser = (newUser: IUser) => {
    user.value = newUser
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const userAvatar = computed(
    () => 'https://avatar.iran.liara.run/public/' + (user.value?._id || '')
  )

  const isAuthenticated = computed(() => !!token.value)

  const initAuthentication = () => {
    const localStorageToken = localStorage.getItem('token')
    if (localStorageToken) setToken(localStorageToken)
    const localStorageUser = localStorage.getItem('user')
    if (localStorageUser) setUser(JSON.parse(localStorageUser))
  }

  return {
    authenticate,
    initAuthentication,
    isAuthenticated,
    logout,
    setToken,
    setUser,
    token,
    user,
    userAvatar,
  }
}

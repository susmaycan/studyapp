export function useAuth() {
  const token = useState<string | null>('token', () => null)
  const user = useState<IUser | null>('user', () => null)

  const authenticate = (newToken: string, newUser: IUser) => {
    setToken(newToken)
    setUser(newUser)
  }

  const logout = () => {
    token.value = null
    user.value = null
  }

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const setUser = (newUser: IUser) => {
    user.value = newUser
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const isAuthenticated = computed(() => !!token.value)

  const initAuthentication = () => {
    debugger
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
  }
}

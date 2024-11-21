export default defineNuxtPlugin(() => {
  const { initAuthentication } = useAuth()

  initAuthentication()
})

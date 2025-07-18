import { Stack } from 'expo-router'

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="sets/[id]" />
      <Stack.Screen name="play/[id]" />
    </Stack>
  )
}

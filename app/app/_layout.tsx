import { Slot } from 'expo-router'
import { MD3DarkTheme, PaperProvider } from 'react-native-paper'

const RootScreen = () => {
  const theme = {
    ...MD3DarkTheme, // or MD3DarkTheme
    // roundness: 2,
    colors: {
      ...MD3DarkTheme.colors,
      primary: '#4d1d92',
    },
  }

  return (
    <PaperProvider theme={theme}>
      <Slot />
    </PaperProvider>
  )
}

export default RootScreen

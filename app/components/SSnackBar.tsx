import { ReactNode } from 'react'
import { Portal, Snackbar } from 'react-native-paper'
import { Text } from 'react-native'

interface SnackBarProps {
  children: ReactNode
  color?: string
  isVisible: boolean
  onDismiss: () => void
}

const SSnackBar = ({
  children,
  color,
  isVisible,
  onDismiss,
}: SnackBarProps) => {
  return (
    <Portal>
      <Snackbar
        duration={2000}
        onDismiss={onDismiss}
        rippleColor={color}
        theme={{ colors: { inverseOnSurface: color || 'primary' } }}
        visible={isVisible}
      >
        {children}
      </Snackbar>
    </Portal>
  )
}

export default SSnackBar

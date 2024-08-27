import { GestureResponderEvent, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

interface SButtonProps {
  disabled?: boolean
  icon?: string
  isLoading?: boolean
  onPress: (event: Event | GestureResponderEvent) => void
  title: string
}

export default function SButton({
  disabled,
  icon,
  isLoading,
  onPress,
  title,
}: SButtonProps) {
  return (
    <Button
      disabled={disabled}
      icon={icon}
      loading={isLoading}
      mode="contained"
      onPress={(event) => onPress(event)}
      style={styles.button}
    >
      {title}
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
  },
})

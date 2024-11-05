import { Text, StyleSheet, View } from 'react-native'
import SButton from '@/components/SButton'
import { EGameType } from '@/types/EGameType'

interface SetGameButtonsProps {
  areButtonsDisabled?: boolean
  isLoading?: boolean
  startGame(mode: string): void
}

export default function SetGameButtons({
  areButtonsDisabled,
  isLoading,
  startGame,
}: SetGameButtonsProps) {
  return (
    <View style={styles.playContainer}>
      <Text style={styles.playText}>Learn by playing</Text>
      <View style={styles.playButtons}>
        <SButton
          title="Easy 😌"
          isLoading={isLoading}
          onPress={() => startGame(EGameType.choose)}
          disabled={areButtonsDisabled}
        />
        <SButton
          title="Hard 🥵"
          isLoading={isLoading}
          onPress={() => startGame(EGameType.write)}
          disabled={areButtonsDisabled}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  playContainer: {
    marginVertical: 10,
  },
  playButtons: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  playText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
  },
})

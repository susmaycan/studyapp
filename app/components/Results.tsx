import { Text, StyleSheet, View } from 'react-native'
import SButton from '@/components/SButton'
import { ITerm } from '@/types/ITerm'

interface GameResultsProps {
  results: ITerm[] | string[]
  terms: ITerm[]
  mode?: string
  initGame: () => void
}

export default function GameResult({
  results,
  terms,
  mode,
  initGame,
}: GameResultsProps) {
  const stats = () => {
    let stats = { ok: 0, ko: 0, total: terms.length }
    terms.forEach((term, index) => {
      let isCorrect = false
      if (mode === 'front' && term.back === results[index].back)
        isCorrect = true
      else if (mode === 'back' && term.front === results[index].front)
        isCorrect = true
      else if (!mode && term.back === results[index]) isCorrect = true

      if (isCorrect) stats.ok++
      else stats.ko++
    })
    return stats
  }
  return (
    <>
      <View style={styles.resultContainer}>
        <Text style={styles.results}>
          Result: {stats().ok} / {stats().total}
        </Text>
        {stats().ok === stats().total ? (
          <Text>Congrats! You got it all right! 🎉</Text>
        ) : (
          <Text>You'll get it next time!💪</Text>
        )}
      </View>
      <Text>Wanna start again?</Text>
      <SButton title="Reset game" onPress={initGame} />
    </>
  )
}

const styles = StyleSheet.create({
  results: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultContainer: {
    marginBottom: 10,
  },
})

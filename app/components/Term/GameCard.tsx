import { Text, StyleSheet, View, Pressable } from 'react-native'
import { ITerm } from '@/types/ITerm'

interface TermGameCardProps {
  term: ITerm
  show: 'front' | 'back'
  result: true | false | null
  onPress: () => void
}

export default function TermGameCard({
  onPress,
  result,
  show,
  term,
}: TermGameCardProps) {
  const onPressCard = () => {
    onPress()
  }
  const joinedStyles = () => {
    const styleList = []
    styleList.push(styles.termCard)

    if (show === 'back') styleList.push(styles.termCardBack)
    if (show === 'front') styleList.push(styles.termCardFront)

    if (result === true) styleList.push(styles.success)
    if (result === false) styleList.push(styles.error)

    return styleList
  }

  const textStyles = () => {
    const styleList = []
    styleList.push(styles.termTitle)

    if (result === true) styleList.push(styles.successText)
    if (result === false) styleList.push(styles.errorText)

    return styleList
  }
  return (
    <Pressable onPress={onPressCard}>
      <View style={joinedStyles()}>
        <Text style={textStyles()}>
          {show === 'front' ? term.front : term.back}
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  termCard: {
    width: 120,
    height: 120,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 5,
    borderRadius: 10,
    margin: 10,
  },
  termCardFront: {
    backgroundColor: '#be97f6',
  },
  termCardBack: {
    backgroundColor: '#81d1d8',
  },
  success: {
    backgroundColor: '#94c88d',
  },
  error: {
    backgroundColor: '#ff7e7e',
  },
  successText: {
    color: '#2a7300',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#6f0101',
    fontWeight: 'bold',
  },
  termTitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 500,
  },
})

import { Text, StyleSheet, Pressable, Animated } from 'react-native'
import { ITerm } from '@/types/ITerm'
import { useRef, useState } from 'react'
import useSpeech from '@/hooks/useSpeech'

interface TermCardProps {
  term: ITerm
}

export default function TermCard({ term }: TermCardProps) {
  const { speak } = useSpeech()

  const flipAnimation = useRef(new Animated.Value(0)).current
  let flipRotation = 0
  flipAnimation.addListener(({ value }) => (flipRotation = value))
  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  }
  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  }

  const flipToFront = () => {
    speak(term.back)
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }
  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Pressable onPress={() => (!!flipRotation ? flipToBack() : flipToFront())}>
      <Animated.View
        style={[styles.termCard, styles.termCardFront, flipToFrontStyle]}
      >
        <Text style={styles.termTitle}>{term.front}</Text>
      </Animated.View>
      <Animated.View
        style={[styles.termCard, styles.termCardBack, flipToBackStyle]}
      >
        <Text style={styles.termTitle}>{term.back}</Text>
      </Animated.View>
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
    flexWrap: 'wrap',
    rowGap: 5,
    borderRadius: 10,
    margin: 5,
  },
  termCardFront: {
    backgroundColor: '#be97f6',
    position: 'absolute',
  },
  termCardBack: {
    backgroundColor: '#81d1d8',
    backfaceVisibility: 'hidden',
  },
  termTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

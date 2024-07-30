import { Text, StyleSheet, View, Pressable, Animated } from 'react-native'

import { ITerm } from '@/types/ITerm'
import { useRef, useState } from 'react'

interface TermCardProps {
  term: ITerm
}

export default function TermCard({ term }: TermCardProps) {
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
    width: 200,
    height: 270,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 5,
    borderRadius: 10,
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
    fontWeight: 600,
  },
})

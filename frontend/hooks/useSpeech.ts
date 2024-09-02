import * as Speech from 'expo-speech'

export default function useSpeech() {
  const speak = (text: string) => {
    Speech.speak(text, { language: 'ko', rate: 0.7 })
  }

  return { speak }
}

export function useSpeechAPI() {
  const synth = computed(() => window?.speechSynthesis)
  const speech = computed(() =>
    window ? new window.SpeechSynthesisUtterance() : null
  )
  const voiceList = computed(() => synth.value?.getVoices() || [])
  const voiceListCode = computed(() =>
    (synth.value?.getVoices() || []).map((voice) => voice.lang)
  )

  const japaneseVoice = computed(() =>
    voiceList.value.find(
      (voice) =>
        voice.lang === 'jp' ||
        voice.lang === 'ja' ||
        voice.lang === 'ja-JP' ||
        voice.name.includes('Japanese') ||
        voice.name.includes('japanese') ||
        voice.name.includes('jp') ||
        voice.name.includes('JP')
    )
  )

  const isCompatible = computed(
    () =>
      !!window &&
      synth.value &&
      voiceList.value.length > 0 &&
      !!japaneseVoice.value
  )

  const speak = (text: string | number, speed?: number) => {
    if (!isCompatible.value || !speech.value) return

    synth.value.cancel()
    speech.value.text = text.toString()
    speech.value.voice = japaneseVoice.value!
    speech.value.rate = speed || 0.7
    synth.value.speak(speech.value)
  }

  return { voiceList, voiceListCode, isCompatible, speak, japaneseVoice }
}

export function useGame(
  termList: ITerm[],
  mode: Ref<IGameMode>,
  gameType: IGameType
) {
  const optionList = ref<ITerm[]>(termList)
  const index = ref(0)

  const userResultList = ref<ITerm[] | string[]>([])
  const choiceList = ref<ITerm[]>([])

  /** Computed */
  /** Current displayed term to guess */
  const selectedTerm = computed(() =>
    optionList.value.length ? optionList.value[index.value] : null
  )
  /** Current correct result */
  const selectedUserResult = computed(
    (): ITerm | string | null => userResultList.value[index.value]
  )

  const isFinished = computed(() => index.value === optionList.value.length)

  const canShowList = computed(() => !isFinished.value && termList.length)

  const shuffleList = (list: ITerm[]) => {
    return list
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }

  const getChoices = (options: ITerm[], resetIndex: number) => {
    const selected = options[resetIndex]
    const otherChoices = shuffleList(options)
      .filter((term) => term.id !== selected?.id)
      .slice(0, 3)
    const correctChoice = selected

    choiceList.value =
      otherChoices && correctChoice
        ? shuffleList([...otherChoices, correctChoice])
        : []
  }

  const selectChoice = (term: ITerm) => {
    const userResultListModified = [...userResultList.value] as ITerm[]
    userResultListModified[index.value] = term
    userResultList.value = userResultListModified

    setTimeout(() => goNext(), 1000)
  }

  const writeResult = (term: string) => {
    const userResultListModified = [...userResultList.value] as string[]
    userResultListModified[index.value] = term
    userResultList.value = userResultListModified
  }

  const goNext = () => {
    index.value = index.value + 1

    getChoices(optionList.value, index.value)
  }
  const goBack = () => {
    index.value = index.value - 1
  }

  const initGame = () => {
    optionList.value = shuffleList(termList)
    userResultList.value = []
    index.value = 0
    getChoices(optionList.value, index.value)
  }

  const isCorrectResult = computed(
    () =>
      !!selectedUserResult.value &&
      !!selectedTerm.value &&
      checkCorrectResult(selectedUserResult.value, selectedTerm.value)
  )

  const formatWord = (value: string) =>
    value
      .replaceAll(' ', '')
      .replaceAll('.', '')
      .replaceAll('　', '')
      .toLowerCase()

  const checkCorrectResult = (userInput: ITerm | string, result: ITerm) => {
    if (gameType === EGameType.choose) {
      const userInputValue = userInput as ITerm

      return userInputValue.id === result.id
    } else if (
      gameType === EGameType.write ||
      gameType === EGameType.listening
    ) {
      const userInputValue = formatWord(userInput as string)

      if (mode.value === EGameMode.front)
        return (
          userInputValue === formatWord(result.back) ||
          (
            result?.back_alternatives
              ?.split(',')
              .map((alternative) => formatWord(alternative)) || []
          ).includes(userInputValue)
        )
      else return userInputValue === formatWord(result.front)
    }
  }

  const gameStats = computed<IGameStats>(() => {
    let stats = { ok: 0, ko: 0, total: optionList.value.length }
    optionList.value.forEach((term, index) => {
      let isCorrect = checkCorrectResult(userResultList.value[index], term)

      if (isCorrect) stats.ok++
      else stats.ko++
    })

    return stats
  })

  watch(
    () => mode.value,
    (newValue, oldValue) => {
      if (newValue !== oldValue) initGame()
    }
  )

  return {
    canShowList,
    checkCorrectResult,
    choiceList,
    gameStats,
    goBack,
    goNext,
    initGame,
    isCorrectResult,
    isFinished,
    mode,
    optionList,
    selectChoice,
    selectedTerm,
    selectedUserResult,
    userResultList,
    writeResult,
  }
}

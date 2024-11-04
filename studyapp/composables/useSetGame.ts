export function useGame(termList: ITerm[]) {
  const optionList = ref<ITerm[]>(termList)
  const index = ref(0)
  const mode = ref<GAME_CHOOSE_TYPE.FRONT | GAME_CHOOSE_TYPE.BACK>(
    GAME_CHOOSE_TYPE.FRONT
  )

  const resultList = ref<ITerm[]>([])
  const choiceList = ref<ITerm[]>([])

  const selectedTerm = computed(() =>
    optionList.value.length ? optionList.value[index.value] : null
  )

  const selectedResult = computed(
    (): ITerm | null => resultList.value[index.value]
  )

  const isFinished = computed(() => index.value === optionList.value.length)

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
    const resultListModified = [...resultList.value]
    resultListModified[index.value] = term
    resultList.value = resultListModified

    setTimeout(() => goNext(), 1000)
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
    resultList.value = []
    mode.value =
      Math.floor(Math.random() * 2) === 0
        ? GAME_CHOOSE_TYPE.FRONT
        : GAME_CHOOSE_TYPE.BACK
    index.value = 0
    getChoices(optionList.value, index.value)
  }

  return {
    selectedTerm,
    choiceList,
    goNext,
    goBack,
    isFinished,
    initGame,
    mode,
    selectChoice,
    resultList,
    optionList,
    selectedResult,
  }
}

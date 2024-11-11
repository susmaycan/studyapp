export function useGame(termList: ITerm[], mode: Ref<IGameMode>) {
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
    debugger
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
      (selectedUserResult.value &&
        selectedTerm.value?.id === (selectedUserResult.value as ITerm).id) ||
      (mode.value === EGameMode.front &&
        selectedUserResult.value === selectedTerm.value?.back) ||
      (selectedTerm.value?.back_alternatives?.split(',') || []).includes(
        selectedUserResult.value as string
      ) ||
      (mode.value === EGameMode.back &&
        selectedUserResult.value === selectedTerm.value?.front)
  )

  watch(
    () => mode.value,
    (newValue, oldValue) => {
      if (newValue !== oldValue) initGame()
    }
  )

  return {
    canShowList,
    choiceList,
    goNext,
    goBack,
    initGame,
    isCorrectResult,
    isFinished,
    mode,
    optionList,
    selectedTerm,
    selectChoice,
    selectedUserResult,
    userResultList,
    writeResult,
  }
}

export function useSetWrittenGame(termList: ITerm[]) {
  const optionList = ref<ITerm[]>(termList)
  const index = ref(0)
  const resultList = ref<string[]>([])
  const selectedTerm = computed(() =>
    optionList.value.length ? optionList.value[index.value] : null
  )

  const selectedResult = computed(
    (): string => resultList.value[index.value] || ''
  )

  const currentResult = computed((): ITerm => optionList.value[index.value])

  const isFinished = computed(() => index.value === optionList.value.length)

  const shuffleList = (list: ITerm[]) => {
    return list
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }

  const writeResult = (term: string) => {
    const resultListModified = [...resultList.value]
    resultListModified[index.value] = term
    resultList.value = resultListModified
  }

  const goNext = () => {
    index.value = index.value + 1
  }
  const goBack = () => {
    index.value = index.value - 1
  }

  const initGame = () => {
    optionList.value = shuffleList(termList)
    index.value = 0
    resultList.value = []
  }

  return {
    selectedTerm,
    goNext,
    goBack,
    isFinished,
    initGame,
    writeResult,
    resultList,
    optionList,
    selectedResult,
    currentResult,
  }
}

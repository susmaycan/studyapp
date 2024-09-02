import { ITerm } from '@/types/ITerm'
import { useState } from 'react'

export default function useSetWrittenGame(termList: ITerm[]) {
  const [optionList, setOptionList] = useState<ITerm[]>(termList)
  const [currentResult, setCurrentResult] = useState<string>('')
  const [index, setIndex] = useState(0)

  const [resultList, setResultList] = useState<string[]>([])

  const selectedTerm = () => (optionList.length ? optionList[index] : null)

  const selectedResult = (): string => resultList[index] || ''

  const shuffleList = (list: ITerm[]) => {
    return list
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }

  const writeResult = (term: string) => {
    const resultListModified = [...resultList]
    resultListModified[index] = term
    setResultList(resultListModified)
  }

  const goNext = () => {
    setIndex(index + 1)
  }
  const goBack = () => {
    setIndex(index - 1)
  }

  const initGame = () => {
    const options = shuffleList(termList)
    const index = 0
    setOptionList(options)
    setResultList([])
    setIndex(index)
  }

  const isFinished = () => index === optionList.length

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
    setCurrentResult,
  }
}

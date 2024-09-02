import { ITerm } from '@/types/ITerm'
import { useState } from 'react'

export default function useGame(termList: ITerm[]) {
  const [optionList, setOptionList] = useState<ITerm[]>(termList)
  const [index, setIndex] = useState(0)
  const [mode, setMode] = useState<'front' | 'back'>('front')

  const [resultList, setResultList] = useState<ITerm[]>([])
  const [choiceList, setChoiceList] = useState<ITerm[]>([])

  const selectedTerm = () => (optionList.length ? optionList[index] : null)

  const selectedResult = (): ITerm | null => resultList[index]

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

    setChoiceList(
      otherChoices && correctChoice
        ? shuffleList([...otherChoices, correctChoice])
        : []
    )
  }

  const selectChoice = (term: ITerm) => {
    const resultListModified = [...resultList]
    resultListModified[index] = term
    setResultList(resultListModified)

    setTimeout(() => goNext(), 1000)
  }

  const goNext = () => {
    setIndex(index + 1)
    getChoices(optionList, index + 1)
  }
  const goBack = () => {
    setIndex(index - 1)
  }

  const initGame = () => {
    const options = shuffleList(termList)
    const index = 0
    setOptionList(options)
    setResultList([])
    setMode(Math.floor(Math.random() * 2) === 0 ? 'front' : 'back')
    setIndex(index)
    getChoices(options, index)
  }

  const isFinished = () => index === optionList.length

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

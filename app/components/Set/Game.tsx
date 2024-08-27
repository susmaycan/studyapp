import Loader from '@/components/Loader'
import ScreenSection from '@/components/ScreenSection'
import ScreenTitle from '@/components/ScreenTitle'
import ScrollList from '@/components/ScrollList'

import { Text, StyleSheet, View, FlatList } from 'react-native'
import { ISet } from '@/types/ISet'
import useGame from '@/hooks/useSetGame'
import TermGameCard from '../Term/GameCard'
import { ITerm } from '@/types/ITerm'
import { useEffect } from 'react'
import GameResult from '@/components/Results'
import useSpeech from '@/hooks/useSpeech'
import { IconButton } from 'react-native-paper'

interface SetDetailProps {
  set?: ISet | null
  isLoading?: boolean
}

export default function SetGame({ set, isLoading }: SetDetailProps) {
  const {
    selectedTerm,
    choiceList,
    optionList,
    resultList,
    isFinished,
    initGame,
    mode,
    selectChoice,
    selectedResult,
    goNext,
  } = useGame(set?.terms || [])

  const { speak } = useSpeech()

  const canShowList = () => !isLoading && !isFinished() && set?.terms?.length

  const isCorrect = () => {
    return selectedTerm()?.id === selectedResult()?.id
  }
  useEffect(() => {
    initGame()
  }, [set])

  const selectOption = (choice: ITerm) => {
    if (selectedTerm()?.back) speak(selectedTerm()!.back)

    selectChoice(choice)
  }

  return (
    <ScrollList>
      <ScreenSection>
        {isLoading && <Loader />}
        {canShowList() && (
          <View style={styles.gameContainer}>
            <View style={styles.subtitle}>
              <Text>Select the correct word for </Text>
              <IconButton
                icon="volume-high"
                size={30}
                onPress={() => speak(selectedTerm()!.back)}
              />
            </View>
            <ScreenTitle>
              {mode === 'front' ? selectedTerm()?.front : selectedTerm()?.back}
            </ScreenTitle>
            <FlatList
              data={choiceList}
              renderItem={({ item: choice }) => (
                <TermGameCard
                  key={choice.id}
                  show={mode === 'front' ? 'back' : 'front'}
                  term={choice}
                  result={
                    selectedResult()?.id === choice.id
                      ? isCorrect()
                      : null ||
                        (selectedResult() && choice.id === selectedTerm()?.id)
                      ? true
                      : null
                  }
                  onPress={() => selectOption(choice)}
                />
              )}
              numColumns={2}
            />
          </View>
        )}
        {isFinished() && !isLoading && (
          <GameResult
            results={resultList}
            terms={optionList}
            mode={mode}
            initGame={initGame}
          />
        )}
      </ScreenSection>
    </ScrollList>
  )
}

const styles = StyleSheet.create({
  termList: {
    flex: 2,
    flexDirection: 'row',
    marginHorizontal: 'auto',
  },
  term: {
    flexDirection: 'row',
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
})

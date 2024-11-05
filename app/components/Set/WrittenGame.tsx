import Loader from '@/components/Loader'
import ScreenSection from '@/components/ScreenSection'
import ScreenTitle from '@/components/ScreenTitle'
import ScrollList from '@/components/ScrollList'
import useSpeech from '@/hooks/useSpeech'

import { Text, StyleSheet, View, FlatList, TextInput } from 'react-native'
import { ISet } from '@/types/ISet'
import { ITerm } from '@/types/ITerm'
import { useEffect, useState } from 'react'
import GameResult from '@/components/Results'
import STextInput from '../STextInput'
import useSetWrittenGame from '@/hooks/useSetWrittenGame'
import SButton from '../SButton'
import { IconButton } from 'react-native-paper'
import SSnackBar from '../SSnackBar'
import useSnackBar from '@/hooks/useSnackBar'

interface WrittenGameProps {
  set?: ISet | null
  isLoading?: boolean
}

export default function WrittenGame({ set, isLoading }: WrittenGameProps) {
  const {
    selectedTerm,
    optionList,
    resultList,
    isFinished,
    initGame,
    writeResult,
    selectedResult,
    goNext,
  } = useSetWrittenGame(set?.terms || [])
  const { speak } = useSpeech()

  const { displaySnackBar, hideSnackBar, showSnackBar, snackBarText } =
    useSnackBar()

  const canShowList = () => !isLoading && !isFinished() && set?.terms?.length

  useEffect(() => {
    initGame()
  }, [set])

  const isCorrect = () => selectedResult() === selectedTerm()?.back

  const selectOption = () => {
    if (selectedTerm()?.back) {
      speak(selectedTerm()!.back)
      const text = isCorrect()
        ? `Correct! ✅`
        : `Incorrect! ❌ Correct answer is ${
            selectedTerm()?.back[selectedTerm]
          } `

      displaySnackBar(text)
    }

    setTimeout(
      () => {
        hideSnackBar()
        goNext()
      },
      isCorrect() ? 1000 : 2000
    )
  }

  return (
    <ScrollList>
      <ScreenSection>
        {isLoading && <Loader />}
        {canShowList() && (
          <View style={styles.gameContainer}>
            <View style={styles.subtitle}>
              <Text>How do you say </Text>
              <IconButton
                icon="volume-high"
                size={30}
                onPress={() => speak(selectedTerm()!.back)}
              />
            </View>
            <ScreenTitle>{selectedTerm()?.front}</ScreenTitle>

            <STextInput
              value={selectedResult()}
              onChange={(newValue) => writeResult(newValue)}
              onSubmit={selectOption}
              returnTypeKey="next"
            />
            <SButton
              title="Accept"
              onPress={selectOption}
              disabled={!selectedResult()}
            />
          </View>
        )}

        {isFinished() && !isLoading && (
          <GameResult
            results={resultList}
            terms={optionList}
            initGame={initGame}
          />
        )}
      </ScreenSection>
      {showSnackBar && (
        <ScreenSection
          style={isCorrect() ? styles.successContainer : styles.errorContainer}
        >
          <Text style={isCorrect() ? styles.successText : styles.errorText}>
            {snackBarText}
          </Text>
        </ScreenSection>
      )}
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
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  subtitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  successContainer: {
    padding: 20,
    backgroundColor: '#94c88d',
    color: '#2a7300',
  },
  errorContainer: {
    padding: 20,
    backgroundColor: '#ff7e7e',
    color: '#bb0404',
  },
  successText: {
    color: '#2a7300',
    fontSize: 15,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#6f0101',
    fontSize: 15,
    fontWeight: 'bold',
  },
})

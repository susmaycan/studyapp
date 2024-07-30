import { useEffect } from 'react'

import Loader from '@/components/Loader'
import ScreenSection from '@/components/ScreenSection'
import ScreenTitle from '@/components/ScreenTitle'
import { ScreenView } from '@/components/ScreenView'
import ScrollList from '@/components/ScrollList'

import useAPI from '@/hooks/useAPI'

import { ITermList } from '@/types/ITermList'
import { ISetList } from '@/types/ISetList'
import { Text } from 'react-native'
import SetCard from '@/components/Set/Card'

export default function Index() {
  const {
    fetchData: fetchTerms,
    data: termsData,
    isLoading: isLoadingTerms,
  } = useAPI<ITermList>()
  const {
    fetchData: fetchSets,
    data: setsData,
    isLoading: isLoadingSets,
  } = useAPI<ISetList>()

  useEffect(() => {
    fetchSets('sets')
    fetchTerms('terms')
  }, [])

  const termList = () => {
    return termsData ? termsData.results : []
  }

  const setList = () => {
    return setsData ? setsData.results : []
  }

  return (
    <ScreenView>
      <ScreenSection>
        <ScreenTitle>StudyApp 📚</ScreenTitle>
      </ScreenSection>
      <ScreenSection title="Latest sets">
        <ScrollList horizontal={true}>
          {isLoadingSets && <Loader />}
          {!isLoadingSets &&
            setList().map((set) => <SetCard key={set.id} set={set} />)}
        </ScrollList>
      </ScreenSection>
      <ScreenSection title="Latest terms">
        <ScrollList horizontal={true}>
          {isLoadingTerms && <Loader />}
          {!isLoadingTerms &&
            termList().map((term) => (
              <Text key={term.id}>
                {term.front} - {term.back}
              </Text>
            ))}
        </ScrollList>
      </ScreenSection>
    </ScreenView>
  )
}

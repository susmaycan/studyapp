import { useEffect } from 'react'

import Loader from '@/components/Loader'
import ScreenSection from '@/components/ScreenSection'
import ScreenTitle from '@/components/ScreenTitle'
import { ScreenView } from '@/components/ScreenView'
import ScrollList from '@/components/ScrollList'

import useAPI from '@/hooks/useAPI'

import { ISetList } from '@/types/ISetList'
import SetCard from '@/components/Set/Card'

export default function SetsScreen() {
  const {
    fetchData: fetchSets,
    data: setsData,
    isLoading: isLoadingSets,
  } = useAPI<ISetList>()

  useEffect(() => {
    fetchSets('sets')
  }, [])

  const setList = () => {
    return setsData ? setsData.results : []
  }

  return (
    <ScreenView>
      <ScreenSection>
        <ScreenTitle>Sets 📚</ScreenTitle>
      </ScreenSection>
      <ScreenSection>
        <ScrollList>
          {isLoadingSets && <Loader />}
          {!isLoadingSets &&
            setList().map((set) => <SetCard key={set.id} set={set} />)}
        </ScrollList>
      </ScreenSection>
    </ScreenView>
  )
}

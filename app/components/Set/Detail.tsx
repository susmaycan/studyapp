import Loader from '@/components/Loader'
import ScreenSection from '@/components/ScreenSection'
import ScreenTitle from '@/components/ScreenTitle'
import ScrollList from '@/components/ScrollList'
import TermCard from '@/components/Term/Card'
import SetPicture from '@/components/Set/Picture'
import { useRouter } from 'expo-router'

import { Text, StyleSheet, FlatList, View } from 'react-native'
import { ISet } from '@/types/ISet'
import SButton from '@/components/SButton'
import { EGameType } from '@/types/EGameType'
import SetGameButtons from './SetGameButtons'

interface SetDetailProps {
  set?: ISet | null
  isLoading?: boolean
}

export default function SetDetail({ set, isLoading }: SetDetailProps) {
  const router = useRouter()
  const startGame = (mode: string) => {
    router.push(`/play/${set?.id}?mode=${mode}`)
  }

  const emptyTermsLength = () => set?.terms.length === 0
  return (
    <ScrollList>
      <ScreenSection>
        <SetPicture
          alt={`Picture of ${set?.name}`}
          height={100}
          url={set?.picture}
        />
        <ScreenTitle>{set?.name}</ScreenTitle>
        {set?.description && <Text>{set?.description}</Text>}
        <SetGameButtons
          areButtonsDisabled={emptyTermsLength()}
          isLoading={isLoading}
          startGame={startGame}
        />
      </ScreenSection>
      <ScreenSection title="Terms">
        {isLoading && <Loader />}
        <FlatList
          data={set?.terms}
          renderItem={({ item: term }) => (
            <TermCard key={term.id} term={term} />
          )}
          numColumns={2}
        />
        {emptyTermsLength() && <Text>No terms in this set.</Text>}
      </ScreenSection>
    </ScrollList>
  )
}

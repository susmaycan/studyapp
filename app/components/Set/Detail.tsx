import Loader from '@/components/Loader'
import ScreenSection from '@/components/ScreenSection'
import ScreenTitle from '@/components/ScreenTitle'
import { ScreenView } from '@/components/ScreenView'
import ScrollList from '@/components/ScrollList'
import TermCard from '@/components/Term/Card'
import AImage from '@/components/AImage'

import { Text, StyleSheet } from 'react-native'
import { ISet } from '@/types/ISet'

interface SetDetailProps {
  set?: ISet | null
  isLoading?: boolean
}

export default function SetDetail({ set, isLoading }: SetDetailProps) {
  return (
    <ScreenView>
      <ScreenSection>
        <ScreenTitle>{set?.name} set 📚</ScreenTitle>
        <AImage
          url={
            set?.picture ||
            'https://abocados-s3-bucket.s3.eu-west-3.amazonaws.com/recipes/no_photo'
          }
          alt={`Picture of ${set?.name}`}
          width={200}
          height={200}
          style={styles.setImage}
        />
        {set?.description && <Text>{set?.description}</Text>}
      </ScreenSection>
      <ScreenSection title="Terms">
        <ScrollList>
          {isLoading && <Loader />}
          {!isLoading &&
            set?.terms.map((term) => <TermCard key={term.id} term={term} />)}
        </ScrollList>
      </ScreenSection>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  setImage: {
    borderRadius: 10,
  },
})

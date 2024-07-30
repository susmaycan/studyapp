import { router } from 'expo-router'
import { Text, Pressable, StyleSheet, View } from 'react-native'

import AImage from '@/components/AImage'

import { ISet } from '@/types/ISet'

interface SetCardProps {
  set: ISet
}

export default function SetCard({ set }: SetCardProps) {
  const navigateToDetailPage = () => {
    router.push(`/sets/${set.id}`)
  }
  return (
    <Pressable onPress={navigateToDetailPage}>
      <View style={styles.setCard}>
        <AImage
          url={
            set.picture ||
            'https://abocados-s3-bucket.s3.eu-west-3.amazonaws.com/recipes/no_photo'
          }
          alt={`Picture of ${set.name}`}
          width={200}
          height={200}
          style={styles.setImage}
        />
        <Text style={styles.setTitle}>{set.name}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  setCard: {
    width: 200,
    height: 270,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 5,
  },
  setImage: {
    borderRadius: 10,
  },
  setTitle: {
    fontSize: 16,
    fontWeight: 600,
  },
  setDuration: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  },
  setInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
})

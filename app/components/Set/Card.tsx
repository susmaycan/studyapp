import { router } from 'expo-router'
import { Text, Pressable, StyleSheet, View } from 'react-native'
import { ISet } from '@/types/ISet'
import SetPicture from '@/components/Set/Picture'

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
        <SetPicture
          alt={`Picture of ${set?.name}`}
          height={200}
          url={set?.picture}
          width={200}
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
  setTitle: {
    fontSize: 16,
    fontWeight: 'bold',
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

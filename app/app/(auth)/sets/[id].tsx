import useAPI from '@/hooks/useAPI'
import { useEffect } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { IconButton, PaperProvider } from 'react-native-paper'
import { ISet } from '@/types/ISet'
import SetDetail from '@/components/Set/Detail'
import { ScreenView } from '@/components/ScreenView'

export default function SetDetailPage() {
  const params = useLocalSearchParams()
  const router = useRouter()

  const setId = () => params.id

  const { fetchData, data, isLoading } = useAPI<ISet>()

  useEffect(() => {
    fetchData(`sets/${setId()}`)
  }, [])

  const handleDismiss = () => {
    router.dismiss()
  }

  const goToSets = () => {
    router.replace('/sets')
  }

  const canGoBack = () => router.canGoBack()

  return (
    <PaperProvider>
      <Stack.Screen
        options={{
          title: data ? data.name : 'Set',
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              size={20}
              onPress={canGoBack() ? handleDismiss : goToSets}
            />
          ),
        }}
      />
      <ScreenView>
        <SetDetail set={data} isLoading={isLoading} />
      </ScreenView>
    </PaperProvider>
  )
}

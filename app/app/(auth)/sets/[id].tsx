import useAPI from '@/hooks/useAPI'
import { useEffect } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { IconButton, PaperProvider } from 'react-native-paper'
import { ISet } from '@/types/ISet'
import SetDetail from '@/components/Set/Detail'

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

  const goToRecipes = () => {
    router.replace('/sets')
  }

  const canGoBack = () => router.canGoBack()

  return (
    <PaperProvider>
      <Stack.Screen
        options={{
          title: '',
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              size={20}
              onPress={canGoBack() ? handleDismiss : goToRecipes}
            />
          ),
        }}
      />
      <SetDetail set={data} isLoading={isLoading} />
    </PaperProvider>
  )
}

import useAPI from '@/hooks/useAPI'
import { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { IconButton, PaperProvider } from 'react-native-paper'
import { ISet } from '@/types/ISet'
import SetGame from '@/components/Set/Game'
import { ScreenView } from '@/components/ScreenView'
import ScreenSection from '@/components/ScreenSection'
import ScreenTitle from '@/components/ScreenTitle'
import WrittenGame from '@/components/Set/WrittenGame'
import { EGameType } from '@/types/EGameType'
import Loader from '@/components/Loader'
import SetPicture from '@/components/Set/Picture'
import SetGameButtons from '@/components/Set/SetGameButtons'

export default function SetGamePage() {
  const params = useLocalSearchParams()
  const router = useRouter()

  const setId = () => params.id

  const { fetchData, data, isLoading } = useAPI<ISet>()

  const [mode, setMode] = useState<string>(EGameType.NONE)

  useEffect(() => {
    if (params.mode) setMode(params.mode)
    fetchData(`sets/${setId()}`)
  }, [])

  const handleDismiss = () => {
    router.dismiss()
  }

  const goToSetList = () => {
    router.replace('/sets')
  }

  const canGoBack = () => router.canGoBack()

  const emptyTermsLength = () => data?.terms.length === 0

  return (
    <PaperProvider>
      <Stack.Screen
        options={{
          title: data ? data.name : 'Set',
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              size={20}
              onPress={canGoBack() ? handleDismiss : goToSetList}
            />
          ),
        }}
      />
      <ScreenView>
        {isLoading && (
          <ScreenSection>
            <Loader />
            <ScreenTitle>Loading game...</ScreenTitle>
          </ScreenSection>
        )}
        {!isLoading && (
          <ScreenSection>
            <SetPicture
              alt={`Picture of ${data?.name}`}
              height={100}
              url={data?.picture}
            />
            <ScreenTitle>{data?.name}</ScreenTitle>
            {mode == EGameType.NONE && (
              <SetGameButtons
                areButtonsDisabled={emptyTermsLength()}
                isLoading={isLoading}
                startGame={setMode}
              />
            )}
          </ScreenSection>
        )}
        {!isLoading && mode == EGameType.choose && (
          <SetGame set={data} isLoading={isLoading} />
        )}
        {!isLoading && mode == EGameType.write && (
          <WrittenGame set={data} isLoading={isLoading} />
        )}
      </ScreenView>
    </PaperProvider>
  )
}

'use client'

import SetCard from '@/components/components/Set/Card/Card'
import useAPI from '@/components/hooks/useAPI'
import { ISetList } from '@/components/types/ISetList'
import { ITermList } from '@/components/types/ITermList'
import { useEffect } from 'react'

export default function SetList() {
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
  }, [])

  const termList = () => {
    return termsData ? termsData.results : []
  }

  const setList = () => {
    return setsData ? setsData.results : []
  }

  return (
    <section>
      <div className="text-center my-4">
        <h1 className="text-2xl">StudyApp 📚</h1>
      </div>
      <div title="Latest sets">
        <div>
          {isLoadingSets && <p>Loading...</p>}
          {!isLoadingSets &&
            setList().map((set) => <SetCard key={set.id} set={set} />)}
        </div>
      </div>
    </section>
  )
}

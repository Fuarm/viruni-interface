import { DemoData, toggleService } from "@viruni/demos"
import { useCallback, useEffect } from "react"
import { useAtom } from 'jotai'
import { atomWithImmer } from 'jotai/immer'

const mangaAtom = atomWithImmer({
  loading: false,
  result: {} as DemoData
})

export function useDemo() {
  const [query, setQuery] = useAtom(mangaAtom)

  const fn = useCallback(() => {
    toggleService.send('FETCH')
  }, [])

  useEffect(() => {
    toggleService.onTransition(state => {
      if (state.value === 'loading') {
        setQuery(draft => {
          draft.loading = true
        })
      }
      if (state.value === 'success') {
        setQuery(draft => {
          draft.loading = true
          draft.result = (state.context as any).user
        })
      }
    })
  }, [])

  return [query, fn]
}
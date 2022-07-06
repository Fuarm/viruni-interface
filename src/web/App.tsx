import useAsyncFn from './hooks/useAsyncFn'
import { fetchCuteAnimals } from '@viruni/demos'

export const Demo = () => {
  const [ state, doFetch ] = useAsyncFn(fetchCuteAnimals, [])
  return (
    <div>
      {state.loading ? (
        <div>Loading...</div>
      ) : state.error ? (
        <div>Error: {state.error.message}</div>
      ): (
        <div>Value: {state.value?.data}</div>
      )}
      <button onClick={() => doFetch()}>Start loading</button>
    </div>
  )
}
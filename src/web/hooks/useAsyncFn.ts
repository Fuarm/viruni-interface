import { DependencyList, useCallback, useState, useRef } from "react";
import { FunctionReturningPromise, PromiseType } from "./misc/type";
import useMountedState from "./useMountedState";

type AsyncState<T> =
  | {
      loading: boolean;
      error?: undefined;
      value?: undefined;
    }
  | {
      loading: true;
      error?: Error | undefined;
      value?: T;
    }
  | {
      loading: false;
      error: Error;
      value?: undefined;
    }
  | {
      loading: false;
      error?: undefined;
      value: T;
    };

type StateFromFunctionReturningPromise<T extends FunctionReturningPromise> = AsyncState<PromiseType<ReturnType<T>>>

type AsyncFnReturn<T extends FunctionReturningPromise = FunctionReturningPromise> = [StateFromFunctionReturningPromise<T>, T]

export default function useAsyncFn<T extends FunctionReturningPromise>(
  fn: T,
  deps: DependencyList[],
  initialState: StateFromFunctionReturningPromise<T> = { loading: false }
): AsyncFnReturn {
  const lastCallId = useRef(0)
  const isMounted = useMountedState()
  const [state, setState] = useState(initialState)
  const hooksDeps = [fn, isMounted, state.loading]

  if (deps.length > 0) {
    (<typeof hooksDeps & DependencyList[]>hooksDeps).push(deps)
  }

  const callback = useCallback((...args: Parameters<T>): ReturnType<T> => {
    const callId = ++lastCallId.current
    setState({ loading: true })
    return fn(...args).then(
      value => {
        isMounted() && callId === lastCallId.current && setState({ value, loading: false })
        return value
      },
      error => {
        isMounted() && callId === lastCallId.current && setState({ error, loading: false })
        return error
      }
    ) as ReturnType<T>
  }, [...hooksDeps])
  return [state, callback as unknown as T]
}
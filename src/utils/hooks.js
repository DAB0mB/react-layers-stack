import { useCallback, useEffect, useLayoutEffect, useState, useRef } from 'react';

export const useMountState = (initialState = false) => {
  const mountState = useRef(initialState);

  useEffect(() => {
    mountState.current = true;

    return () => {
      mountState.current = false;
    };
  }, [true]);

  return mountState;
};

const createAsyncEffectHook = (useEffect) => (fn, input) => {
  const cbQueueRef = useRef([]);
  const [result, setResult] = useState(null);
  const [iterator, setIterator] = useState(null);

  const cleanup = useCallback(() => {
    for (let callback of cbQueueRef.current) {
      callback();
    }
  }, [iterator]);

  const onCleanup = useCallback((fn) => {
    cbQueueRef.current.push(fn);
  }, [true]);

  const next = useCallback((value) => {
    if (result && result.done) {
      return;
    }

    setResult(iterator.next(value));
  }, [result, iterator]);

  const throwback = useCallback((error) => {
    if (result && result.done) {
      return;
    }

    setResult(iterator.throw(error));
  }, [result]);

  useEffect(() => {
    cbQueueRef.current = [];
    setResult(null);

    const iterator = fn(onCleanup);

    setIterator(iterator);
    setResult(iterator.next());

    return cleanup;
  }, input);

  useEffect(() => {
    if (!result) return;

    let mounted = true;

    if (result.value instanceof Promise) {
      result.value.then((value) => {
        if (mounted) {
          next(value);
        }
      }).catch((error) => {
        if (mounted) {
          throwback(error);
        }
      });
    }
    else {
      next(result.value);
    }

    return () => {
      mounted = false;
    };
  }, [result]);
};
export const useAsyncEffect = createAsyncEffectHook(useEffect);
export const useAsyncLayoutEffect = createAsyncEffectHook(useLayoutEffect);

export const useAsyncCallback = (fn, input) => {
  const mountState = useMountState(true);

  return useCallback(async (...args) => {
    const iterator = fn(...args);
    let result = { value: undefined, done: false };

    while (!result.done && mountState.current) {
      try {
        if (result.value instanceof Promise) {
          result = iterator.next(await result.value);
        }
        else {
          result = iterator.next(result.value);
        }
      }
      catch (e) {
        if (mountState.current) {
          result = iterator.throw(e);
        }
      }
    }

    return result.value;
  }, input);
};

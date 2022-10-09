import { useCallback, useEffect, useRef } from 'react';

export type UseTimeoutFnReturn = [() => boolean | null, () => void, () => void];

/**
 * Calls given function after specified amount of milliseconds
 * @param fn function that will be called
 * @param ms delay in milliseconds
 * @returns [isReady, clear, reset]
 */
export function useTimeoutFn(fn: Function, ms: number = 0): UseTimeoutFnReturn {
  const ready = useRef<boolean | null>(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const callback = useRef(fn);

  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(() => {
    ready.current = false;
    timeout.current && clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);

  const cancel = useCallback(() => {
    ready.current = null;
    timeout.current && clearTimeout(timeout.current);
  }, []);

  // update ref when function changes
  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  // set on mount, clear on unmount
  useEffect(() => {
    set();

    return cancel;
  }, [cancel, ms, set]);

  return [isReady, cancel, set];
}

import { useEffect, useRef, useState } from 'react';

type UseSmoothLoadingOptions = {
  showDelayMs?: number;
  minVisibleMs?: number;
};

const useSmoothLoading = (isBusy: boolean, options?: UseSmoothLoadingOptions) => {
  const showDelayMs = options?.showDelayMs ?? 80;
  const minVisibleMs = options?.minVisibleMs ?? 220;
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);
  const shownAtMsRef = useRef(0);

  useEffect(() => {
    let timeoutId: number | undefined;

    if (isBusy) {
      if (!isLoadingVisible) {
        timeoutId = window.setTimeout(() => {
          shownAtMsRef.current = Date.now();
          setIsLoadingVisible(true);
        }, showDelayMs);
      }

      return () => {
        if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      };
    }

    if (!isLoadingVisible) return undefined;

    const elapsedMs = Date.now() - shownAtMsRef.current;
    const remainingMs = Math.max(0, minVisibleMs - elapsedMs);

    timeoutId = window.setTimeout(() => {
      setIsLoadingVisible(false);
    }, remainingMs);

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [isBusy, isLoadingVisible, minVisibleMs, showDelayMs]);

  return isLoadingVisible;
};

export default useSmoothLoading;

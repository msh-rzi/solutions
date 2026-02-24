import { useCallback, useEffect, useRef, useState, type TransitionStartFunction } from 'react';

const INITIAL_VIRTUAL_ROWS = 1200;
const VIRTUAL_ROWS_BATCH = 2000;

type UseVirtualRowsControllerParams = {
  virtualization: boolean;
  targetRowsCount: number;
  startTransition: TransitionStartFunction;
};

const useVirtualRowsController = ({ virtualization, targetRowsCount, startTransition }: UseVirtualRowsControllerParams) => {
  const [virtualLoadedRowsCount, setVirtualLoadedRowsCount] = useState(targetRowsCount);
  const wasVirtualizationEnabledRef = useRef(virtualization);

  useEffect(() => {
    const wasVirtualizationEnabled = wasVirtualizationEnabledRef.current;
    wasVirtualizationEnabledRef.current = virtualization;

    startTransition(() => {
      setVirtualLoadedRowsCount((previousRowsCount) => {
        if (!virtualization) return targetRowsCount;

        if (!wasVirtualizationEnabled) {
          return Math.min(targetRowsCount, INITIAL_VIRTUAL_ROWS);
        }

        if (previousRowsCount > targetRowsCount) {
          return targetRowsCount;
        }

        return previousRowsCount;
      });
    });
  }, [virtualization, targetRowsCount, startTransition]);

  const loadMoreVirtualRows = useCallback(() => {
    if (!virtualization) return;

    startTransition(() => {
      setVirtualLoadedRowsCount((previousRowsCount) => {
        if (previousRowsCount >= targetRowsCount) return previousRowsCount;
        return Math.min(previousRowsCount + VIRTUAL_ROWS_BATCH, targetRowsCount);
      });
    });
  }, [virtualization, startTransition, targetRowsCount]);

  const effectiveRowsCount = virtualization ? virtualLoadedRowsCount : targetRowsCount;
  const hasMoreVirtualRows = virtualization && effectiveRowsCount < targetRowsCount;

  return {
    effectiveRowsCount,
    hasMoreVirtualRows,
    loadMoreVirtualRows,
  };
};

export default useVirtualRowsController;

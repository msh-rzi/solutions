import { useCallback, useEffect, useRef, type RefObject } from 'react';

const VIRTUAL_SCROLL_LOAD_THRESHOLD_PX = 220;

type UseVirtualEndReachParams = {
  virtualization: boolean;
  canLoadMoreVirtualRows: boolean;
  isLoadingMoreVirtualRows: boolean;
  onVirtualEndReached?: () => void;
  dataLength: number;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
};

const useVirtualEndReach = ({
  virtualization,
  canLoadMoreVirtualRows,
  isLoadingMoreVirtualRows,
  onVirtualEndReached,
  dataLength,
  scrollContainerRef,
}: UseVirtualEndReachParams) => {
  const lastLoadRequestDataLengthRef = useRef(0);

  const handleVirtualScroll = useCallback(() => {
    if (!virtualization || !canLoadMoreVirtualRows || isLoadingMoreVirtualRows || !onVirtualEndReached) return;

    const scrollElement = scrollContainerRef.current;
    if (!scrollElement) return;

    const distanceToBottom = scrollElement.scrollHeight - scrollElement.scrollTop - scrollElement.clientHeight;
    if (distanceToBottom > VIRTUAL_SCROLL_LOAD_THRESHOLD_PX) return;
    if (lastLoadRequestDataLengthRef.current === dataLength) return;

    lastLoadRequestDataLengthRef.current = dataLength;
    onVirtualEndReached();
  }, [virtualization, canLoadMoreVirtualRows, isLoadingMoreVirtualRows, onVirtualEndReached, dataLength, scrollContainerRef]);

  useEffect(() => {
    if (!virtualization) {
      lastLoadRequestDataLengthRef.current = 0;
      return;
    }

    handleVirtualScroll();
  }, [virtualization, dataLength, handleVirtualScroll]);

  return handleVirtualScroll;
};

export default useVirtualEndReach;

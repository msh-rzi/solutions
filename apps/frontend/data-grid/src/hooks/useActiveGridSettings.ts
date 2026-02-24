import { useEffect, useState, useTransition } from 'react';

type GridSettings = {
  rowCount: number;
  columnCount: number;
};

const useActiveGridSettings = (rowCount: number, columnCount: number) => {
  const [isPending, startTransition] = useTransition();
  const [activeGridSettings, setActiveGridSettings] = useState<GridSettings>(() => ({ rowCount, columnCount }));

  useEffect(() => {
    startTransition(() => {
      setActiveGridSettings((previousSettings) => {
        if (previousSettings.rowCount === rowCount && previousSettings.columnCount === columnCount) {
          return previousSettings;
        }

        return { rowCount, columnCount };
      });
    });
  }, [rowCount, columnCount, startTransition]);

  return {
    activeGridSettings,
    isPending,
    startTransition,
  };
};

export default useActiveGridSettings;

import { useState } from "react";

export interface UseAppLoader {
  (): {
    setAppLoading: (state: boolean) => void
    showAppLoader: () => void
    hideAppLoader: () => void
  }
}

export const useAppLoader: UseAppLoader = () => {
  const [loading, setLoading] = useState(false);

  return {
    setAppLoading: setLoading,
    showAppLoader: () => setLoading(true),
    hideAppLoader: () => setLoading(false)
  };
};

import { appLoaderActions } from "~/layouts/Main/Loader/slice";
import { useAppDispatch } from "~/store";

export interface UseAppLoader {
  (): {
    setAppLoading: (state: boolean) => void;
    showAppLoader: () => void;
    hideAppLoader: () => void;
  };
}

export const useAppLoader: UseAppLoader = () => {
  const dispatch = useAppDispatch();

  const setLoading = (loading: boolean) => {
    dispatch(appLoaderActions.setLoading(loading));
  };

  return {
    setAppLoading: setLoading,
    showAppLoader: () => setLoading(true),
    hideAppLoader: () => setLoading(false),
  };
};

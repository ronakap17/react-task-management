import { AppHeaderDataState, appDataActions } from "~/app/slice";
import { useAppDispatch } from "~/store";
import useTranslation from "./useTranslation";
import { useCallback } from "react";

export interface UseAppHeader {
  (): {
    setData: (payload: AppHeaderDataState) => void;
    clearData: () => void;
  };
}

export const useAppHeader: UseAppHeader = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("app");

  const setPageTitle = useCallback((pageTitle: string = "") => {
    document.title = t("title") + (pageTitle ? ` - ${pageTitle}` : "");
  }, [t]);

  const setData = (payload) => {
    setPageTitle(payload.title);
    dispatch(appDataActions.setHeaderData(payload));
  };
  const clearData = () => {
    setPageTitle();
    dispatch(appDataActions.clearHeaderData());
  };

  return {
    setData,
    clearData,
  };
};

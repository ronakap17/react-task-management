import { TFunction, i18n, TOptions } from 'i18next';
import { useCallback } from 'react';
import { useTranslation as useReactTranslation } from 'react-i18next';

import { useAppLoader } from './useAppLoader';
import { Languages } from './../i18n';

export interface UseTranslation {
  (prefix?: string): {
    currentLanguage: Languages
    t: (key: string, options?: TOptions) => string
    i18n: i18n
    ready: boolean
    changeLanguage: (language: Languages, withLoader?: boolean) => Promise<TFunction>
  }
}

const useTranslation: UseTranslation = prefix => {
  const { t, i18n, ...rest } = useReactTranslation();

  const { showAppLoader, hideAppLoader } = useAppLoader();

  if (prefix && !(/(\.)$/g.test(prefix))) {
    prefix += '.'
  }

  const changeLanguage = useCallback((language: Languages, withLoader) => {
    if (withLoader) {
      showAppLoader();

      return i18n.changeLanguage(language).finally(() => {
        setTimeout(() => {
          hideAppLoader();
        }, 500);
      });
    }

    return i18n.changeLanguage(language);
  }, [hideAppLoader, i18n, showAppLoader]);

  return {
    currentLanguage: i18n.language as Languages,
    t: (key: string, options?: TOptions) => t((prefix || '') + key, options),
    i18n,
    ...rest,
    changeLanguage
  };
};

export default useTranslation

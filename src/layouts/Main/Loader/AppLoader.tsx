import { useAppSelector } from '~/store';
import React from 'react';

import Loader from '~/components/Loader';

export type AppLoaderComponent = React.FC

export const AppLoader: AppLoaderComponent = () => {
  const loading = useAppSelector((state) => state.layout.appLoader.loading)

  if (!loading) {
    return null;
  }

  return <Loader withDimmer page size="32" />;
};

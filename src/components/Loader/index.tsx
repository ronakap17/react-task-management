import React from 'react';
import classNames from 'classnames';

import Dimmer from '../Dimmer';

import classes from './style.module.scss';

export interface LoaderProps {
  className?: string
  size?: '12' | '14' | '16' | '20' | '24' | '32' | '60'
  inline?: boolean | 'center'
  inverse?: boolean
  withDimmer?: boolean
  page?: boolean
}

export type LoaderComponent = React.FC<LoaderProps>

const Loader: LoaderComponent = ({ className, size = '24', inline, inverse, withDimmer, page }) => {
  const loader: React.ReactElement = (
    <div
      className={classNames(classes['loader'], classes['size-' + size], {
        [classes['inline']]: !!inline,
        [classes['center']]: inline === 'center',
        [classes['inverse']]: inverse
      }, className)}
    >
      <svg className={classes['spinner']} viewBox="0 0 66 66">
        <circle className={classes['path']} cx="33" cy="33" r="30" />
      </svg>
    </div>
  );

  if (withDimmer) {
    return <Dimmer className={classes['dimmer']} page={page}>{loader}</Dimmer>;
  }

  return loader;
};

export default Loader

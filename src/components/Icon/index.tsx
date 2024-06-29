import React from 'react';
import classNames from 'classnames';

import { bxIcons as Icons } from './icons';

import classes from './style.module.scss';

export interface IconProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  className?: string
  name?: Icons
  flip?: 'horizontal' | 'vertical'
  big?: boolean
  small?: boolean
  size?: string | number
}

export type IconComponent = React.FC<IconProps>

const Icon: IconComponent = ({ className, name, flip, big, small, size = '24', ...props }) => (
  <i
    {...props}
    className={classNames('bx', name, classes['icon'], className, flip, {
      [classes['flip-' + flip]]: flip !== undefined,
      [classes['big']]: big,
      [classes['small']]: small
    }, classes['size-' + size])}
  >
  </i>
);

export type MaterialIcons = Icons

export default Icon

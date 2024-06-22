import React from 'react';
import classNames from 'classnames';

import classes from './style.module.scss';
import { getShortName } from '~/utils/getShortName';

export interface UserAvatarProps {
  name: string
  className?: string
  active?: boolean
  hovering?: boolean
  onClick?: () => void
}

export type UserAvatarComponent = React.FC<UserAvatarProps>

export const UserAvatar: UserAvatarComponent = ({ name, className, active, hovering, onClick }) => {

  const cN = classNames(classes['user-avatar'], className, {
    [classes['active']]: active,
    [classes['hovering']]: hovering
  });

  return <div className={cN} onClick={onClick}>{getShortName(name)}</div>;
};

export default UserAvatar

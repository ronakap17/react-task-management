import React, {useCallback, useEffect, useMemo} from 'react';
import isFunction from 'lodash/isFunction';
import classes from './style.module.scss';
import classNames from 'classnames';

export interface ToggleSwitchProps {
    enabled?: boolean
    onStateChanged?: (enabled) => void,
    onClick?: () => void,
    className?: string
}

export type ToggleSwitchComponent = React.FC<ToggleSwitchProps>

const ToggleSwitch: ToggleSwitchComponent = props => {
    const {enabled, onClick, className, onStateChanged, ...restProps} = props;

    useEffect(() => {
        isFunction(onStateChanged) && onStateChanged(enabled);
    }, [enabled, onStateChanged]);

    const toggleSwitch = useCallback(() => {
        isFunction(onClick) && onClick();
    }, [onClick]);

    const toggleClass = useMemo(() => `switch-toggle--${enabled ? 'on' : 'off'}`, [enabled]);

    return (
        <div className={classNames(classes["toggle-switch"], className)} onClick={toggleSwitch} {...restProps}>
            <span className={classNames(classes["switch"], classes[toggleClass])}></span>
        </div>
    )
}

export default ToggleSwitch;
import React, { useLayoutEffect, useRef, useState } from 'react';

import classes from './style.module.scss';

export interface SlideDownProps {
  show?: boolean
  duration?: number
  children?: React.ReactNode
}

export type SlideDownComponent = React.FC<SlideDownProps>

const SlideDown: SlideDownComponent = ({ show, duration, children }) => {
  const wrapElRef = useRef<HTMLDivElement>(null);

  const [showed, setShowed] = useState<boolean>(false);
  const [height, setHeight] = useState<number | undefined>(0);

  useLayoutEffect(() => {
    setTimeout(() => {
      if (show) {
        setShowed(true);
        setHeight(0);

        setTimeout(() => {
          if (wrapElRef.current && wrapElRef.current.firstElementChild) {
            setHeight((wrapElRef.current.firstElementChild as HTMLDivElement).offsetHeight);

            setTimeout(() => {
              setHeight(undefined);
            }, (duration || 150));
          }
        }, 10);
      } else {
        if (wrapElRef.current && wrapElRef.current.firstElementChild) {
          setHeight((wrapElRef.current.firstElementChild as HTMLDivElement).offsetHeight);

          setTimeout(() => {
            setHeight(0);

            setTimeout(() => {
              setShowed(false);
            }, (duration || 150));
          }, 10);
        }
      }
    });
  }, [duration, show]);

  if (!showed) {
    return null;
  }

  return (
    <div ref={wrapElRef} className={classes['wrap']} style={{ height, transitionDuration: duration + 'ms' }}>
      <div>{children}</div>
    </div>
  );
};

export default SlideDown

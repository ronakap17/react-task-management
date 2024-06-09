import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';

import Transition from './../Transition';

import AnimationContent, { AnimationContentComponent } from './AnimationContent';

import classes from './style.module.scss';

export interface DimmerProps {
  className?: string
  show?: boolean
  showTimeout?: number
  page?: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  children?: React.ReactNode
}

export interface DimmerComponent extends React.FC<DimmerProps> {
  AnimationContent: AnimationContentComponent
}

const Dimmer: DimmerComponent = ({ className, show = true, showTimeout = 150, page, children, onClick }) => {
  const dimmerElRef = useRef<HTMLDivElement>(null);
  const [isShowed, setIsShowed] = useState<boolean>(false);

  const transitionEnteredHandler = useCallback(() => {
    setIsShowed(true);
  }, []);
  const transitionExitHandler = useCallback(() => {
    setIsShowed(false);
  }, []);

  const dimmerClickHandler = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (onClick && e.target === dimmerElRef.current) {
      onClick(e);
    }
  }, [onClick]);

  let animationContent: React.ReactNode | undefined = undefined;

  React.Children.forEach(children, child => {
    // @ts-ignore
    if (child && child.type && child.type.displayName === 'AnimationContent') {
      animationContent = child;
    }
  });

  return (
    <Transition
      in={show}
      timeout={showTimeout}
      classNames={{
        enter: classes['dimmer-enter'],
        enterActive: classes['dimmer-enter-active'],
        exit: classes['dimmer-exit'],
        exitActive: classes['dimmer-exit-active'],
      }}
      onEntered={transitionEnteredHandler}
      onExit={transitionExitHandler}
    >
      <div
        ref={dimmerElRef}
        className={classNames(classes['dimmer'], { [classes['page']]: page }, className)}
        onClick={dimmerClickHandler}
      >
        {(
          animationContent
            ? React.cloneElement(animationContent, { in: isShowed })
            : children
        )}
      </div>
    </Transition>
  );
};

Dimmer.AnimationContent = AnimationContent;

export default Dimmer

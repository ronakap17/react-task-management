import React from 'react';
import CSSTransition, { CSSTransitionProps } from 'react-transition-group/CSSTransition';

import SlideDown from './SlideDown';

export interface TransitionProps extends Omit<CSSTransitionProps, 'timeout'>{
  timeout?: number
}

export interface TransitionComponent extends React.FC<TransitionProps> {
  SlideDown: typeof SlideDown
}

const Transition: TransitionComponent = ({ timeout, children, ...props }) => (
  <CSSTransition
    timeout={timeout || 150}
    mountOnEnter
    unmountOnExit
    {...props}
  >
    {children}
  </CSSTransition>
);

Transition.SlideDown = SlideDown;

export default Transition

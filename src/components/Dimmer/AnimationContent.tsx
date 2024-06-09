import React from 'react';

import Transition, { TransitionProps } from './../Transition';

export type AnimationContentComponent = React.FC<TransitionProps>

const AnimationContent: AnimationContentComponent = ({ children, ...props }) => (
  <Transition {...props}>
    {children}
  </Transition>
);

AnimationContent.displayName = 'AnimationContent';

export default AnimationContent;

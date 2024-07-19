import React, { forwardRef } from 'react';

const ForwardedComponent = forwardRef(({ children, ...props }, ref) => {
  // 使用 cloneElement 传递 ref 和其他 props
  return React.cloneElement(children, { ref, ...props });
});

export default ForwardedComponent;

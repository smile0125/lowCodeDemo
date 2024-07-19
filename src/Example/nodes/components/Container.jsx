import React, { forwardRef } from "react";

const Container = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="h-lc-container" {...props}>
      {props.children}
    </div>
  );
});

export default Container;

import React, { forwardRef } from "react";

const Image = forwardRef((props, ref) => {
  return <img ref={ref} className="h-lc-img" {...props.attr} {...props} />;
});

export default Image;

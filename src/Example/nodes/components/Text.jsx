import React, { forwardRef } from "react";

const Text = forwardRef((props, ref) => (
  <p ref={ref} className="h-lc-p" {...props}>
    {props.attr.text}
  </p>
));

export default Text;

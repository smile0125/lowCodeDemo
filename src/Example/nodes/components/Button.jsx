import React, { forwardRef } from "react";

const Button = forwardRef((props, ref) => {
  return (
    <button ref={ref} className="h-lc-button" {...props}>
      {props.attr.text}
    </button>
  );
});

export default Button;

// 可拖拽组件
import React, { useContext, forwardRef } from "react";
import { useDrag } from "react-dnd";
// import styled from "styled-components";
import ItemTypes from "../ItemTypes.js";

const Draggable = forwardRef((props, ref) => {
  const {
    children,
    component,
    isPanel,
    showHover,
    dropId,
    ...otherProps
  } = props;

  const [{ isDragging }, dragRef] = useDrag({
    type: ItemTypes.COMPONENT,
    item: { ...component, isPanel },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const combinedRef = (node) => {
    dragRef(node);
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  };


  return React.cloneElement(children, {
    ref: combinedRef,
    style: {
      ...children?.props?.style,
      cursor: 'move',
      opacity: isDragging ? 0.5 : 1,
      isPanel,
    },
    ...otherProps,
  })
});

export default Draggable;

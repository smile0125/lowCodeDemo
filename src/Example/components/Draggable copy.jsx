// 可拖拽组件
import React, { useContext } from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";
import ItemTypes from "../ItemTypes.js";
import { DataContext } from "../Context/DataContext.js";

const DraggableWrapper = styled.div`
  margin: ${(props) => (props.style.isPanel ? "10px 0" : "unset")};
  background: ${(props) => (props.style.isPanel ? "#f0f0f0" : "unset")};
  height: ${(props) => (props.style.isPanel ? "50px" : "unset")};
  text-align: ${(props) => (props.style.isPanel ? "center" : "unset")};
  line-height: ${(props) => (props.style.isPanel ? "50px" : "unset")};
  transition: all 0.3s;
  cursor: grab;
`;
const Draggable = (props) => {
  const {
    children,
    component,
    isPanel,
    showHover,
    dropId,
  } = props;
  const { state, dispatch } = useContext(DataContext);
  const selectedComponentId = state.getIn(["selectedComponent", "id"]);
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemTypes.COMPONENT,
    item: { ...component, isPanel },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <DraggableWrapper
      ref={dragRef}
      className="h-lc-draggable"
      style={{ opacity: isDragging ? 0.5 : 1, isPanel, showHover }}
    >
      {children}
    </DraggableWrapper>
  );
};

export default Draggable;

/**
 * 网上针对这种选中时有边框效果的，是做了一个通用的边框组件，在每次选中一个组件时通过宽高定位动态改变这个组件的大小和位置
 */
// 这是组件区，包含各种可以拖拽的组件。
import React from "react";
import ItemTypes from "../ItemTypes.js";
import Components from "../nodes/index.js";
import Draggable from "./Draggable.jsx";
import styled from "styled-components";

const ComponentPanelWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 20px;
  height: 100%;
  width: 18%;
  position: fixed;
  left: 0;
  top: 20px;
  padding: 15px;
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
  // box-shadow: 4px 6px 6px 0
  //   var(--color-block-background-shallow, rgba(31, 50, 88, 0.08));
`;

const ComponentPanel = () => {
  return (
    <ComponentPanelWrapper className="h-lc-component-panel">
      {Object.values(Components).map((component) => (
        <Draggable
          key={component.type}
          component={component}
          type={ItemTypes.COMPONENT}
          isPanel={true}
          {...component}
        >
          <div className="h-lc-component-panel-item">{component.name}</div>
        </Draggable>
      ))}
    </ComponentPanelWrapper>
  );
};

export default ComponentPanel;

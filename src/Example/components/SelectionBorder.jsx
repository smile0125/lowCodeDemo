import React from "react";
import styled from "styled-components";

const Border = styled.div`
  position: absolute;
  pointer-events: none;
  border: ${({ isHovered }) =>
    isHovered ? "1px dashed #1890ff" : "1px solid #1890ff"};
`;

const ActionsButton = styled.div`
  position: absolute;
  top: -26px;
  right: 2px;
  padding: 4px 8px;
  font-size: 12px;
`;

const SelectionBorder = ({ x, y, width, height, isHovered, id, handleDeleteComponent }) => {
  return (
    <Border
      className="h-lc-border"
      isHovered={isHovered}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "visible",
        transform: `translate3d(${x}px, ${y}px, 0)`,
        width: `${width}px`,
        height: `${height}px`,
        zIndex: 99,
      }}
    >
      {!isHovered && <ActionsButton>
        <button onClick={() => handleDeleteComponent(id)}>删除</button>
      </ActionsButton>}
    </Border>
  );
};

export default SelectionBorder;

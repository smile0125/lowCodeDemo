// 可放置组件
import React from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import ItemTypes from "../ItemTypes.js";
import { get, uniqueId } from "lodash";

const DroppableWrapper = styled.div`
  transition: all 0.3s;
`;
const Droppable = ({ dropId, children, onDrop, onMouseEnter, onMouseLeave, onClick }) => {
  const isRootDrop = dropId === "root";

  const [{ isOverCurrent, canDrop }, dropRef] = useDrop({
      accept: ItemTypes.COMPONENT,
      drop: (item, monitor) => {
        // 拖入的组件是否是新组件
        const isPanel = get(item, "isPanel");
        const prefix = `${Date.now()}_`;
        // 拖入时的组件ID
        const newId = isPanel ? uniqueId(prefix) : item.id;

        const didDrop = monitor.didDrop();
        if (didDrop) return;
        // 放置新组件
        onDrop({...item, isPanel: false, id: newId}, dropId);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
  });

  return (
    <DroppableWrapper
      className={["h-lc-droppable", isRootDrop ? "h-lc-droppable-root" : ""].join(" ")}
      ref={dropRef}
      style={{
        background: isOverCurrent ? "#1890ff1a" : "#eeeeee",
        height: isRootDrop ? "100%" : "60px",
        border: '1px dotted #1890ff',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {children}
    </DroppableWrapper>
  );
};

export default Droppable;

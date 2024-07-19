// 这是设计区中被拖拽和放置的组件。
import React, { useState, useContext } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../ItemTypes.js";
import { DataContext } from "../Context/DataContext.js";
import * as Components from "../nodes/components/index.js";

const DraggableComponent = (props) => {
  const { component, onSelectComponent, onDeleteComponent } = props;
  const { state, dispatch } = useContext(DataContext);
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COMPONENT,
    item: {
      id: component.id,
      type: component.type,
      isContainer: component.isContainer,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div
        ref={drag}
        className={`draggable-component ${isDragging ? "dragging" : ""}`}
        onClick={() => onSelectComponent(component)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {renderComponent(component)}
        {isHovered && (
          <div className="component-toolbar">
            <button onClick={() => onDeleteComponent(component.id)}>
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const renderComponent = (componentData) => {
  const { type, props } = componentData;
  return Components[type](props);
};

export default DraggableComponent;

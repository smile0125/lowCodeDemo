import React, { useState, useContext } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../ItemTypes.js";
import DraggableComponent from "./_DraggableComponent.jsx";
import { DataContext } from "../Context/DataContext.js";
import Action from "../Context/Action.js";

const DropZone = ({ components, onSelectComponent }) => {
  const [movingComponent, setMovingComponent] = useState(null);
  const { state, dispatch } = useContext(DataContext);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.COMPONENT,
    drop: (item, monitor) => {
      if (movingComponent) {
        moveComponent(movingComponent.id, item.id);
        setMovingComponent(null);
      } else {
        addComponent(item);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const addComponent = (item) => {
    dispatch({
      type: Action.SET_PAGE_DATA,
      payload: [...components, item],
    });
  };

  const moveComponent = (sourceId, targetId) => {
    const newComponents = [...components];
    const [sourceComponent] = newComponents.filter(
      (component) => component.id === sourceId
    );
    const targetIndex = newComponents.findIndex(
      (component) => component.id === targetId
    );
    newComponents.splice(targetIndex + 1, 0, sourceComponent);
    dispatch({
      type: Action.SET_PAGE_DATA,
      payload: newComponents,
    });
  };

  const handleSelectComponent = (component) => {
    onSelectComponent(component);
  };

  /**
   * @description 删除组件
   * @param {*} id 
   */
  const handleDeleteComponent = (id) => {
    const newComponents = components.filter((component) => component.id !== id);
    dispatch({
      type: Action.SET_PAGE_DATA,
      payload: newComponents,
    });
    onSelectComponent(null);
  };

  /**
   * @description 渲染可拖拽的组件
   * 是否可以实现一个通用的拖拽组件和一个通用的放置组件，这样的话，被包裹的组件自动拥有可拖拽和可放置的能力
   * @param {*} renderComponents 
   * @returns 返回组件
   */
  const renderDraggableComponents = (renderComponents) => {
    return renderComponents.map((component, index) => {
      if (component?.children?.length > 0) {
        return renderDraggableComponents(component.children);
      }
      return (
        <DraggableComponent
          key={index}
          component={component}
          onSelectComponent={handleSelectComponent}
          onDeleteComponent={handleDeleteComponent}
        />
      );
    });
  };

  return (
    <div
      ref={drop}
      className={`dropzone ${isOver && canDrop ? "highlight" : ""}`}
    >
      {renderDraggableComponents(components)}
    </div>
  );
};

export default DropZone;

import React, {
  useContext,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
import Droppable from "./Droppable.jsx";
import { DataContext } from "../Context/DataContext.js";
import Draggable from "./Draggable.jsx";
import * as Components from "../nodes/components/index.js";
import styled from "styled-components";
import Action from "../Context/Action.js";
import SelectionBorder from "./SelectionBorder.jsx";
// import ForwardedComponent from './ForwardedComponent.jsx';

const PageComponentWrapper = styled.div`
  background-color: #ffffff;
  height: 100%;
`;

const PageComponent = () => {
  const { state, dispatch } = useContext(DataContext);
  const pageData = state.get("pageData");
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [hoveredComponent, setHoveredComponent] = useState(null);
  const containerRef = useRef(null);
  const components = state.getIn(["pageData", "children"], []).toJS();

  const onDrop = useCallback(
    (data, id) => {
      console.log("onDrop", id, data);
      dispatch({
        type: Action.SET_PAGE_DATA,
        payload: {
          targetId: id,
          data,
        },
      });
    },
    [dispatch, components, pageData]
  );

  const handleComponentClick = (e, component) => {
    e.stopPropagation();
    const { left, top, width, height } = e.target.getBoundingClientRect();
    setHoveredComponent(null);
    setSelectedComponent({ ...component, x: left, y: top, width, height });
    dispatch({
      type: Action.SET_SELECTED_COMPONENT,
      payload: {
        data: component,
      },
    });
  };

  const handleMouseEnter = (e, component) => {
    e.stopPropagation();
    const { left, top, width, height } = e.target.getBoundingClientRect();
    setHoveredComponent({ ...component, x: left, y: top, width, height });
  };

  const handleMouseLeave = () => {
    setHoveredComponent(null);
  };

  /**
   * @description 渲染可拖拽的组件
   * 是否可以实现一个通用的拖拽组件和一个通用的放置组件，这样的话，被包裹的组件自动拥有可拖拽和可放置的能力
   * @param {*} renderComponents
   * @returns 返回组件
   */
  const renderComponent = (components) => {
    return components.map((component) => {
      const { id, props, isContainer, children = [], name } = component;
      const resolvedProps = { ...props };
      const Component = Components[name];
      if (!Component) return null;

      if (isContainer) {
        return (
          <Droppable
            key={id}
            dropId={id}
            onDrop={onDrop}
            onClick={(e) => handleComponentClick(e, component)}
            onMouseEnter={(e) => handleMouseEnter(e, component)}
            onMouseLeave={handleMouseLeave}
          >
            <Component
              style={{ position: "relative", margin: "5px 0 5px 0" }}
              {...resolvedProps}
              onClick={(e) => handleComponentClick(e, component)}
              onMouseEnter={(e) => handleMouseEnter(e, component)}
              onMouseLeave={handleMouseLeave}
            >
              {children.length ? renderComponent(children) : null}
            </Component>
          </Droppable>
        );
      }

      return (
        <Draggable key={id} dropId={id} showHover component={component}>
          <Component
            style={{ position: "relative", margin: "5px 0 5px 0" }}
            {...resolvedProps}
            onClick={(e) => handleComponentClick(e, component)}
            onMouseEnter={(e) => handleMouseEnter(e, component)}
            onMouseLeave={handleMouseLeave}
          />
        </Draggable>
      );
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setSelectedComponent(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  const handleDeleteComponent = (targetId) => {
    console.log("handleDeleteComponent");
    dispatch({
      type: Action.DELETE_COMPONENT,
      payload: {
        targetId,
      },
    });
  };

  return (
    <PageComponentWrapper className="h-lc-page-component">
      <Droppable dropId="root" onDrop={onDrop}>
        {renderComponent(components)}
      </Droppable>
      {selectedComponent && (
        <SelectionBorder
          x={selectedComponent.x}
          y={selectedComponent.y}
          width={selectedComponent.width}
          height={selectedComponent.height}
          isHovered={false}
          id={selectedComponent.id}
          handleDeleteComponent={handleDeleteComponent}
        />
      )}
      {hoveredComponent && (
        <SelectionBorder
          x={hoveredComponent.x}
          y={hoveredComponent.y}
          width={hoveredComponent.width}
          height={hoveredComponent.height}
          isHovered={true}
        />
      )}
    </PageComponentWrapper>
  );
};

export default PageComponent;

// 这是设置区，用于显示和编辑选中组件的属性。
import React, { useContext } from "react";
import styled from "styled-components";
import { DataContext } from "../Context/DataContext.js";
import ACTION from "../Context/Action.js";
import { Input } from "antd";

const PropertyPanelWrapper = styled.div`
  width: 20%;
  background-color: #ffffff;
  border-left: 1px solid #e0e0e0;
  position: fixed;
  right: 0;
  width: 20%;
  position: fixed;
  right: 0;
  top: 20px;
  height: 100%;
`;

const PropertyPanel = () => {
  console.log("PropertyPanel------------------------");
  const { state, dispatch } = useContext(DataContext);
  const selectedComponent = state.get("selectedComponent");
  const style = state.getIn(["selectedComponent", "props", "style"], {});
  const attr = state.getIn(["selectedComponent", "props", "attr"], {});
  const id = state.getIn(["selectedComponent", "id"]);
  console.log("selectedComponent", selectedComponent);

  const fields = [...Object.keys(attr), ...Object.keys(style)];

  const handleChange = (e, key) => {
    console.log("handleChange", id, e.target.value);
    const newStyle = { ...style, [key]: +e.target.value };
    // 更新选中的组件
    const newSelectedComponent = {
      ...selectedComponent,
      props: {
        ...selectedComponent.props,
        style: newStyle,
      },
    };
    dispatch({
      type: ACTION.SET_SELECTED_COMPONENT,
      payload: {
        targetId: id,
        data: newSelectedComponent,
      },
    });

    // 通过 id 更新组件
    dispatch({
      type: ACTION.UPDATE_NODE_BY_ID,
      payload: {
        targetId: id,
        data: newSelectedComponent,
      },
    });
  };

  if (!selectedComponent) {
    return (
      <PropertyPanelWrapper className="h-lc-property-panel">
        Select a component to edit its properties
      </PropertyPanelWrapper>
    );
  }

  return (
    <PropertyPanelWrapper className="h-lc-property-panel">
      <h3>编辑 {selectedComponent.name} 属性</h3>
      {selectedComponent.name}
      <div>
        {fields.map((key) => {
          const value = style[key];
          return (
            <div key={key}>
              <label>{key}</label>
              <Input
                type="text"
                name={key}
                value={value}
                onChange={(e) => handleChange(e, key)}
              />
            </div>
          );
        })}
      </div>
    </PropertyPanelWrapper>
  );
};

export default PropertyPanel;

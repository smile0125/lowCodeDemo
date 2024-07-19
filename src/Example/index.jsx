import React, { useState, useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ComponentPanel from "./components/Panel";
// import DropZone from "./components/DropZone.jsx";
import PropertyPanel from "./components/Property.jsx";
import { DataContext } from "./Context/DataContext.js";
import PageComponent from "./components/Page.jsx";
import Page from "./nodes/components/Page.jsx";
// import styled from "styled-components";
import Draggable from "./components/Draggable.jsx";
import Droppable from "./components/Droppable.jsx";
import { fromJS } from "immutable";
import "./app.css";

const iObj = fromJS({
  a: 1,
  b: 2,
  c: {
    d:3,
  }
});

const newData = iObj.update('c', c => c.merge({d:5, e:6}));

console.log("newData", newData.toJS());

// const AppWrapper = styled.div`
//   display: flex;
//   height: 100vh;
// `;

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const { state, dispatch } = useContext(DataContext);
  console.log("app-state", state.toJS());
  const components = state.getIn(["pageData", "children"]);

  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="app">
      <DndProvider backend={HTML5Backend}>
        <ComponentPanel />
        <div className="app-drop">
          <PageComponent />
          {/* <Droppable>
            <Droppable>
              <Draggable>
                <Draggable>
                  <button>1</button>
                </Draggable>
                <button>2</button>
              </Draggable>
            </Droppable>
            <Droppable>
              <Draggable>
                <button>2</button>
              </Draggable>
            </Droppable>
            <Droppable>
              <Draggable>
                <button>3</button>
              </Draggable>
            </Droppable>
          </Droppable> */}
        </div>
        <PropertyPanel
          selectedComponent={selectedComponent}
          components={components}
        />
      </DndProvider>
    </div>
  );
};

export default App;

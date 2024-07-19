import React from "react";
import Example from "./Example";
import { DataProvider } from "./Example6/Context/DataContext";
import "./App.css";

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Example />
      </div>
    </DataProvider>
  );
}

export default App;

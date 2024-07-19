import React, { createContext, useReducer } from "react";
import ACTION from "./Action.js";
import pageData from "../data";
import { addNodeById, updateNodeById, deleteComponentById } from "./Reducer.js";
import { fromJS } from "immutable";

// 初始状态
const initialState = fromJS({
  pageData,
  // pageData: {
  //   id: "root",
  //   name: "Page",
  //   props: {},
  //   isContainer: true,
  //   children: [],
  // }, // 存放页面数据的状态
  selectedComponent: null, // 存放当前 setter 的组件及状态
});

// 创建 Context
export const DataContext = createContext();

// Reducer 函数
const dataReducer = (state, action) => {
  console.log("action", action);
  switch (action.type) {
    case ACTION.SET_PAGE_DATA:
      return state.update("pageData", (pageData) => { 
        return addNodeById(pageData, action.payload)
      });
    case ACTION.SET_SELECTED_COMPONENT:
      return state.update("selectedComponent", () => action.payload.data);
    case ACTION.UPDATE_NODE_BY_ID:
      return state.update("pageData", (pageData) => {
        return updateNodeById(pageData, action.payload);
      })
    case ACTION.DELETE_COMPONENT:
      return state.update("pageData", (pageData) => {
        return deleteComponentById(pageData, action.payload);
      })
      // return deleteComponentById(state, action.payload);
    default:
      return state;
  }
};

// DataContext Provider 组件
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

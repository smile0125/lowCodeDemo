import { fromJS } from "immutable";

// 将组件添加到目标ID组件中
export const addNodeById = (pageData, payload) => {
  const { targetId, data } = payload;

  if (pageData.get("id") === targetId) {
    return pageData.update("children", (children) =>
      children.push(fromJS(data))
    );
  }
  return pageData.update("children", (children) => {
    return (children || []).map((child) => {
      return addNodeById(child, { targetId, data });
    });
  });
};

// 根据ID修改某条数据
export const updateNodeById = (pageData, payload) => {
  const { targetId, data } = payload;
  if (pageData.get("id") === targetId) {
    return pageData.merge(data);
  }
  return pageData.update("children", (children) => {
    if (children) {
      return children.map((child) => updateNodeById(child, { targetId, data }));
    }
  });
};

// 根据ID删除某条数据
export const deleteComponentById = (pageData, payload) => {
  const { targetId } = payload;
  if (pageData.get("id") === targetId) {
    return null;
  }
  return pageData.update("children", (children) => {
    if (children) {
      return children.map((child) => deleteComponentById(child, { targetId }));
    }
  });
};

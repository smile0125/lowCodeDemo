import { fromJS } from "immutable";

/**
 * @description 根据ID查找节点并更新其子节点
 * @param {Object} data - 当前节点
 * @param {number} id - 要查找的节点ID
 * @param {Object} newData - 要添加的新子节点
 * @returns {Object} 更新后的节点
 */
export const findAndAddChild = (data, targetId, newData) => {
  if (data.id === targetId) {
    data.children.push(newData);
  } else if (data.children && data.children.length > 0) {
    for (let i = 0; i < data.children.length; i++) {
      if (findAndAddChild(data.children[i], targetId, newData)) {
        return true;
      }
    }
  }
  return data;
};

// 递归查找并添加子节点
export const addNodeById = (node, parentId, newNode) => {
  if (node.get('id') === parentId) {
      return node.update('children', children => children.push(fromJS(newNode)));
  }
  return node.update('children', children =>
      children.map(child => addNodeById(child, parentId, newNode))
  );
};
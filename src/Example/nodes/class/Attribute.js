import ComponentType from '../const/componentType.js';

import {
  ContainerPropsJSON,
  TextPropsJSON,
  ButtonPropsJSON,
  ImagePropsJSON,
} from "../Schema/attribute.js";
class Attribute {
  constructor() {
    this.attributeMap = {
      [ComponentType.CONTAINER]: ContainerPropsJSON,
      [ComponentType.TEXT]: TextPropsJSON,
      [ComponentType.BUTTON]: ButtonPropsJSON,
      [ComponentType.IMAGE]: ImagePropsJSON,
    };
  }
}

// 根据name匹配到对应的属性
export default class ComponentAttribute extends Attribute {
  constructor(name) {
    super();
    this.attribute = this.attributeMap[name];
  }
}

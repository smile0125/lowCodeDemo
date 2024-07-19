import CreateComponent from "./CreateComponent.js";
import ComponentType from '../const/componentType.js';

// 创建图片组件
export default class CreateContainerComponent extends CreateComponent {
  constructor() {
    super(ComponentType.CONTAINER, true);
  }
}
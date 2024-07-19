import CreateComponent from "./CreateComponent";
import ComponentType from '../const/componentType.js';

// 创建文本组件
export default class CreateTextComponent extends CreateComponent {
  constructor() {
    super(ComponentType.TEXT, false);
  }
}
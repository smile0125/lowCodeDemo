import CreateComponent from "./CreateComponent";
import ComponentType from '../const/componentType.js';

// 创建图片组件
export default class CreateTextComponent extends CreateComponent {
  constructor(defaultStyle, defaultAttr) {
    super(ComponentType.IMAGE, false, defaultStyle, defaultAttr);
  }
}
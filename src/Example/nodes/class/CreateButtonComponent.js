import CreateComponent from "./CreateComponent";
import ComponentType from "../const/componentType.js";

// 创建按钮组件
export default class CreateButtonComponent extends CreateComponent {
  constructor(defaultStyle, defaultAttr) {
    super(ComponentType.BUTTON, false, defaultStyle, defaultAttr);
  }
}

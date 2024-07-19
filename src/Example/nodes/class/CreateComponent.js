import Style from "./Style.js";
import ComponentAttribute from "./Attribute.js";

export default // 创建组件
class CreateComponent {
  constructor(name, isContainer, styleConfig = {}, attributeConfig = {}) {
    this.name = name;
    this.isContainer = isContainer;
    // 初始化属性
    this.initAttribute = {
      attr: {
        ...new ComponentAttribute(this.name).attribute,
        ...attributeConfig,
      }
    };
    // 初始化样式
    this.initStyle = {
      style: {
        ...new Style().style,
        ...styleConfig,
      },
    };

    this.component = {
      name: this.name,
      isContainer: this.isContainer,
      props: {
        ...this.initAttribute,
        ...this.initStyle,
      },
    };
    if (this.isContainer) {
      this.component.children = [];
    }
  }
}

import {
  LayoutSetterJSON,
  TextSetterJSON,
  BackgroundSetterJSON,
  BorderSetterJSON,
} from "../Schema/style";
export default class Style {
  constructor() {
    this.style = {
      ...LayoutSetterJSON,
      ...TextSetterJSON,
      ...BackgroundSetterJSON,
      ...BorderSetterJSON,
    };
  }
}

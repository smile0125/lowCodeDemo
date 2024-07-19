import { uniqueId } from "lodash";

const Page = {
  name: "Page",
  isContainer: true,
  props: {
    style: {
      color: "##ffffff",
      background: "#1890ff",
    },
    // 设置区字段
    setter: {
      color: '',
      background: '',
    },
  },
};
export default Page;

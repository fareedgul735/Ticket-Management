import { Spin } from "antd";

const loadingHOC = (comp, isLoading) => {
  if (isLoading) return <Spin size="large" />;
  else return comp;
};

export default loadingHOC;

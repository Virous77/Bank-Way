import { formatDate } from "../../Utils/data";

const Sidebar = () => {
  return <div>{formatDate(new Date())}</div>;
};

export default Sidebar;

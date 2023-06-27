import { List } from "./settings.style";

type TabListType = {
  data: {
    id: number;
    name: string;
    value: string;
    message: string;
  };
  setActive: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const TabList: React.FC<TabListType> = ({ data, setActive }) => {
  return (
    <List onClick={() => setActive(data.value)}>
      <h3>{data.name}</h3>
      <span>{data.message}</span>
    </List>
  );
};

export default TabList;

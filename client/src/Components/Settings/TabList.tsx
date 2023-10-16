import { useAuthContext } from "../../Store/AuthContext";
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
  const { logoutUser } = useAuthContext();

  return (
    <List
      onClick={() => {
        if (data.name === "Logout") {
          logoutUser();
        } else {
          setActive(data.value);
        }
      }}
      style={{ background: data.name === "Logout" ? "red" : "" }}
    >
      <h3>{data.name}</h3>
      <span>{data.message}</span>
    </List>
  );
};

export default TabList;

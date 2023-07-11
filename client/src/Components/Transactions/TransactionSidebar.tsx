import { displayCenter } from "../Common/variable.style";
import { Aside } from "./transaction.style";
import { BiSearch } from "react-icons/bi";
import { useGlobalContext } from "../../Store/globalContext";

const TransactionSidebar = () => {
  const { state, setState } = useGlobalContext();
  return (
    <Aside $style={displayCenter}>
      <header>
        <BiSearch size={21} />
        <input
          type="text"
          value={state.search}
          onChange={(e) => setState({ ...state, search: e.target.value })}
          placeholder="Search Transactions"
        />
      </header>
    </Aside>
  );
};

export default TransactionSidebar;

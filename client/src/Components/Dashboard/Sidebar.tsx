import { formatDate } from "../../Utils/data";
import { Aside, List } from "./dashboard.style";
import TransactionList from "../Transactions/TransactionList";
import { useActivity } from "../../Store/ActivityContext";
import { displayCol } from "../Common/variable.style";
import ModalHeader from "../Modal/ModalHeader";
import { Modal } from "../Modal/Modal";
import EditTransaction from "../Transactions/EditTransaction";

const Sidebar = () => {
  const { data, setEditData, editData } = useActivity();

  return (
    <Aside>
      <header>
        <p>{formatDate(new Date())}</p>
      </header>

      <List $style={displayCol}>
        {data?.getAllActivity.data?.map((transaction) => (
          <TransactionList key={transaction.id} transaction={transaction} />
        ))}
      </List>

      {editData?.amount && (
        <Modal isOpen="isOpen" onClose={() => setEditData(undefined)}>
          <ModalHeader
            name="Edit Transaction"
            onClose={() => setEditData(undefined)}
          />
          <EditTransaction />
        </Modal>
      )}
    </Aside>
  );
};

export default Sidebar;

import { formatDate } from "../../Utils/data";
import { Aside, List, NDiv } from "./dashboard.style";
import TransactionList from "../Transactions/TransactionList";
import { useActivity } from "../../Store/ActivityContext";
import { displayCol } from "../Common/variable.style";
import ModalHeader from "../Modal/ModalHeader";
import { Modal } from "../Modal/Modal";
import EditTransaction from "../Transactions/EditTransaction";
import noTransaction from "../../assets/no-transaction.svg";


const Sidebar = () => {
  const { data, setEditData, editData } = useActivity();

  return (
    <Aside>
      <header>
        <p>{formatDate(new Date())}</p>
      </header>

      {data && data?.getAllActivity.data?.length > 0 ? (
        <List $style={displayCol}>
          {data?.getAllActivity.data?.map((transaction) => (
            <TransactionList key={transaction.id} transaction={transaction} />
          ))}
        </List>
      ) : (
        <NDiv>
          <img src={noTransaction} alt="no-transaction" />
          <p>Start tracking your daily spend.</p>
        </NDiv>
      )}

      {editData?.amount && editData.amount > 0 ? (
        <Modal
          isOpen="isOpen"
          onClose={() => setEditData(undefined)}
          size="450px"
        >
          <ModalHeader
            name="Edit Transaction"
            onClose={() => setEditData(undefined)}
          />
          <EditTransaction />
        </Modal>
      ) : null}
    </Aside>
  );
};

export default Sidebar;

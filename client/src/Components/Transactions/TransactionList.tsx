import { Transaction } from "../../Interface/interface";
import {
  LI,
  SvgDiv,
  ParentIconDiv,
  TDiv,
  LiWrap,
  TDetails,
} from "./transaction.style";
import { ImageIcon, SvgIcon } from "../../Utils/icons";
import { dateFormat } from "../../Utils/data";
import { displayAllCenter, displayFlex } from "../Common/variable.style";
import { LuFileEdit } from "react-icons/lu";
import { useActivity } from "../../Store/ActivityContext";
import { expenseType, incomeType } from "../../Utils/activity";

type TransactionListType = {
  transaction: Transaction;
};

const TransactionList: React.FC<TransactionListType> = ({ transaction }) => {
  const { editData, setEditData } = useActivity();
  const imgIcon = true;

  const handleUpdate = (data: Transaction) => {
    const types =
      data.type_name.toLowerCase() === "expense" ? expenseType : incomeType;
    const isOther = types.find((type) => type.name === data.type);

    setEditData({
      ...editData,
      name: data.name,
      note: data.note,
      date: data.date,
      type: isOther ? data.type : "others",
      amount: data.amount,
      type_name: data.type_name,
      other: isOther ? "" : data.type,
      id: data.id,
    });
  };

  const iconTypes =
    transaction.type_name?.toLowerCase() === "expense"
      ? expenseType
      : incomeType;

  const isHaveIcon = iconTypes.find((type) => type.name === transaction.type);
  const Icons = SvgIcon[isHaveIcon ? transaction.type : "others"]?.value;

  return (
    <LI $style={transaction.type_name}>
      <LiWrap>
        <ParentIconDiv $style={displayAllCenter}>
          {imgIcon ? (
            <img
              src={ImageIcon[isHaveIcon ? transaction.type : "others"].value}
              alt={transaction.type}
            />
          ) : (
            <SvgDiv>
              <Icons size={25} />
            </SvgDiv>
          )}
        </ParentIconDiv>
        <TDiv $style={displayFlex}>
          <div>
            <b>{transaction.type}</b>
            <span>{dateFormat(transaction.date)}</span>
          </div>

          <h4>₹{transaction.amount}</h4>
        </TDiv>
      </LiWrap>
      <TDetails $style={displayFlex}>
        <div>
          {transaction.name && <span>Name: {transaction.name}</span>}
          {transaction.note && <span>Notes: {transaction.note}</span>}
        </div>
        <button>
          <LuFileEdit size={15} onClick={() => handleUpdate(transaction)} />
        </button>
      </TDetails>
    </LI>
  );
};

export default TransactionList;

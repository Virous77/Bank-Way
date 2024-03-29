import { ITransaction } from "../../Interface/interface";
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
import { useState } from "react";
import { useGlobalContext } from "../../Store/globalContext";
import { daysAgo } from "../../Utils/data";

type TTransactionList = {
  transaction: ITransaction;
  title?: string;
};

const TransactionList: React.FC<TTransactionList> = ({
  transaction,
  title,
}) => {
  const [details, setDetails] = useState("");
  const { editData, setEditData } = useActivity();
  const { handleSetNotification, data } = useGlobalContext();

  const handleUpdate = (data: ITransaction) => {
    const DaysAgo = daysAgo(1);
    const date = new Date(Number(data.createdAt));

    if (DaysAgo > date)
      return handleSetNotification({
        message: "Transaction older than 24hr can't be edited.",
        status: "error",
      });

    if (data.is_edited)
      return handleSetNotification({
        message: "Transaction can't edited multiple time.",
        status: "error",
      });

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
      id: data._id,
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
      <LiWrap
        onClick={() => {
          if (details) {
            setDetails("");
          } else {
            setDetails(transaction._id);
          }
        }}
      >
        <ParentIconDiv $style={displayAllCenter}>
          {data?.transaction_icon_type ? (
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
      {details === transaction._id && (
        <TDetails $style={displayFlex}>
          <div>
            {transaction.name && <span>Name: {transaction.name}</span>}
            {transaction.note && <span>Notes: {transaction.note}</span>}
          </div>

          {title === "dashboard" && (
            <>
              {transaction.type_name !== "refund" && (
                <button onClick={() => handleUpdate(transaction)}>
                  <LuFileEdit size={15} />
                </button>
              )}
            </>
          )}
        </TDetails>
      )}
    </LI>
  );
};

export default TransactionList;

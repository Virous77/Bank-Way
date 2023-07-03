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

type TransactionListType = {
  transaction: Transaction;
};

const TransactionList: React.FC<TransactionListType> = ({ transaction }) => {
  const imgIcon = true;

  const Icons = SvgIcon[transaction.type].value;

  return (
    <LI $style={transaction.type_name}>
      <LiWrap>
        <ParentIconDiv $style={displayAllCenter}>
          {imgIcon ? (
            <img
              src={ImageIcon[transaction.type].value}
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
          <LuFileEdit size={15} />
        </button>
      </TDetails>
    </LI>
  );
};

export default TransactionList;

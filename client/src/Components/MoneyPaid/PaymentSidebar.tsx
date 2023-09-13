import { useGlobalContext } from "../../Store/globalContext";
import { PSide, WrapD, SDiv } from "./money.style";
import { daysAgo, formatDate } from "../../Utils/data";
import { displayCol } from "../Common/variable.style";
import { NDiv } from "../Transactions/transaction.style";
import noTransaction from "../../assets/no-transaction.svg";

const PaymentSidebar = () => {
  const { state } = useGlobalContext();
  const total = state.payment
    ?.filter((trans) => !trans.isCompleted)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const mostTransfer = state.payment
    ?.map((payment) => payment.transfer_to.toLowerCase())
    .reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {} as any);

  const topThreeTransfer = Object.keys(mostTransfer)
    .sort((a, b) => mostTransfer[b] - mostTransfer[a])
    .slice(0, 3);

  const last30Days = state.payment
    ?.filter((payment) => new Date(payment.createdAt) >= daysAgo(30))
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <>
      {state.payment && state.payment?.length === 0 ? (
        <NDiv style={{ width: "90%" }}>
          <img src={noTransaction} alt="no-transaction" />
          <p>Start tracking your daily spend.</p>
        </NDiv>
      ) : (
        <PSide>
          <h2>Payment Details</h2>

          <WrapD $style={displayCol}>
            <div>
              <p>Last Transfer :</p>
              <b>
                {state.payment &&
                  formatDate(
                    new Date(
                      state.payment[0]?.createdAt.includes("T")
                        ? state.payment[0]?.createdAt
                        : Number(state.payment[0]?.createdAt)
                    )
                  )}
              </b>
            </div>

            <SDiv>
              <p>Most Time Transfer Top Three :</p>
              <b>[{topThreeTransfer.toString()}]</b>
            </SDiv>

            <div>
              <p>Last 30 days Payments :</p>
              <b>₹{last30Days}</b>
            </div>

            <div>
              <h3>Total</h3>
              <h3>₹{total}</h3>
            </div>
          </WrapD>
        </PSide>
      )}
    </>
  );
};

export default PaymentSidebar;

import MainForm from "./MainForm";
import { Main } from "./activity.style";
import { expenseType } from "../../../Utils/activity";

const Expense = () => {
  return (
    <Main>
      <MainForm types={expenseType} title="Expense" />
    </Main>
  );
};

export default Expense;

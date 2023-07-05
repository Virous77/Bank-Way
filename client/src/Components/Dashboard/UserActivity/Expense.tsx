import MainForm from "./MainForm";
import { Main } from "./activity.style";
import { expenseType } from "../../../Utils/activity";
import { useActivity } from "../../../Store/ActivityContext";

const Expense = () => {
  const { handleCreateData, isLoading, activityData } = useActivity();
  return (
    <Main>
      <MainForm
        types={expenseType}
        title="Expense"
        handleCreateData={handleCreateData}
        isLoading={isLoading}
        activityData={activityData}
      />
    </Main>
  );
};

export default Expense;

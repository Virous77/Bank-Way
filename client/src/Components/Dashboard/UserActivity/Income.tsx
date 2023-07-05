import { incomeType } from "../../../Utils/activity";
import { Main } from "./activity.style";
import MainForm from "./MainForm";
import { useActivity } from "../../../Store/ActivityContext";

const Income = () => {
  const { handleCreateData, isLoading, activityData } = useActivity();

  return (
    <Main>
      <MainForm
        types={incomeType}
        title="Income"
        isLoading={isLoading}
        handleCreateData={handleCreateData}
        activityData={activityData}
      />
    </Main>
  );
};

export default Income;

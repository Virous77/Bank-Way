import { refundType } from "../../../Utils/activity";
import MainForm from "./MainForm";
import { Main } from "./activity.style";
import { useActivity } from "../../../Store/ActivityContext";

const Refund = () => {
  const { handleCreateData, isLoading, activityData } = useActivity();

  return (
    <Main>
      <MainForm
        types={refundType}
        title="Refund"
        isLoading={isLoading}
        handleCreateData={handleCreateData}
        activityData={activityData}
      />
    </Main>
  );
};

export default Refund;

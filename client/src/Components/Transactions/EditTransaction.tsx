import MainForm from "../Dashboard/UserActivity/MainForm";
import { useActivity } from "../../Store/ActivityContext";
import { expenseType, incomeType } from "../../Utils/activity";

const EditTransaction = () => {
  const { editData, updateLoading, handleUpdateData } = useActivity();

  if (!editData) return;
  const { type_name, id, ...rest } = editData;
  return (
    <MainForm
      title={editData?.type_name}
      handleCreateData={handleUpdateData}
      isLoading={updateLoading}
      types={
        editData?.type_name.toLowerCase() === "expense"
          ? expenseType
          : incomeType
      }
      activityData={rest}
    />
  );
};

export default EditTransaction;

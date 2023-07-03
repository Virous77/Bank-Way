import MainForm from "../Dashboard/UserActivity/MainForm";
import { useActivity } from "../../Store/ActivityContext";
import { expenseType, incomeType } from "../../Utils/activity";

const EditTransaction = () => {
  const { editData, updateLoading, handleUpdateData } = useActivity();
  return (
    <MainForm
      title={editData?.type_name}
      handleCreateData={handleUpdateData}
      isLoading={updateLoading}
      types={
        editData?.type.toLowerCase() === "expense" ? expenseType : incomeType
      }
    />
  );
};

export default EditTransaction;

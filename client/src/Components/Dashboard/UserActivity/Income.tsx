import { incomeType } from "../../../Utils/activity";
import { Main } from "./activity.style";
import MainForm from "./MainForm";

const Income = () => {
  return (
    <Main>
      <MainForm types={incomeType} title="Income" />
    </Main>
  );
};

export default Income;

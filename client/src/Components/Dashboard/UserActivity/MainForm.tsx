import { useActivity } from "../../../Store/ActivityContext";
import { Form } from "./activity.style";

const MainForm = () => {
  const { handleChange, setActivityData, activityData } = useActivity();
  const { name, type, amount, note, date } = activityData;
  return (
    <div>
      <Form onSubmit={(e) => e.preventDefault()}></Form>
    </div>
  );
};

export default MainForm;

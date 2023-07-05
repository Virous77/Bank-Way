import { ActivityType, useActivity } from "../../../Store/ActivityContext";
import { displayCol } from "../../Common/variable.style";
import { Form, Input, Button } from "./activity.style";
import Select from "./Select";

export type MainFormType = {
  types: {
    id: number;
    name: string;
  }[];
  title?: string;
  activityData: ActivityType;
};

type AddFormType = {
  handleCreateData: (type: string) => void;
  isLoading: boolean;
  types: {
    id: number;
    name: string;
  }[];
  title?: string;
  activityData: ActivityType;
};

const MainForm: React.FC<AddFormType> = ({
  types,
  title,
  handleCreateData,
  isLoading,
  activityData,
}) => {
  const { handleChange, editData } = useActivity();
  const { name, amount, note, date, other, type } = activityData;

  return (
    <div>
      <Form onSubmit={(e) => e.preventDefault()} $style={displayCol}>
        <Select types={types} title={title} activityData={activityData} />
        {type === "others" && (
          <Input
            type="text"
            placeholder={`Other ${title} name`}
            value={other}
            name="other"
            onChange={handleChange}
          />
        )}

        <Input
          type="text"
          placeholder={`Give ${title} a name`}
          value={name}
          name="name"
          onChange={handleChange}
        />

        <Input
          type="number"
          placeholder={`Amount`}
          value={amount}
          name="amount"
          onChange={handleChange}
        />

        <Input type="date" value={date} name="date" onChange={handleChange} />

        <Input
          type="text"
          placeholder="Notes"
          value={note}
          name="note"
          onChange={handleChange}
        />

        <Button onClick={() => handleCreateData(title || "")}>
          {isLoading
            ? "Processing"
            : `${editData?.amount ? "Update" : "Add"} ${title}`}
        </Button>
      </Form>
    </div>
  );
};

export default MainForm;

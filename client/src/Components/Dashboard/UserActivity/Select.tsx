import React from "react";
import { Select } from "./activity.style";
import { TMainForm } from "./MainForm";
import { useActivity } from "../../../Store/ActivityContext";

const SelectComp: React.FC<TMainForm> = ({ types, title, activityData }) => {
  const { setActivityData, setEditData, editData } = useActivity();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (editData?.amount) {
      setEditData({ ...editData, type: e.target.value });
    } else {
      setActivityData({ ...activityData, type: e.target.value });
    }
  };

  return (
    <Select value={activityData.type} onChange={handleChange}>
      {title !== "Refund" && <option value="">Select {title}</option>}
      {types.map((type) => (
        <option value={type.name} key={type.id}>
          {type.name}
        </option>
      ))}
    </Select>
  );
};

export default SelectComp;

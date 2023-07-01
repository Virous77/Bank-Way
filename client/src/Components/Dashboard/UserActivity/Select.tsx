import React from "react";
import { Select } from "./activity.style";
import { MainFormType } from "./MainForm";
import { useActivity } from "../../../Store/ActivityContext";

const SelectComp: React.FC<MainFormType> = ({ types, title }) => {
  const { activityData, setActivityData } = useActivity();
  return (
    <Select
      value={activityData.type}
      onChange={(e) =>
        setActivityData({ ...activityData, type: e.target.value })
      }
    >
      <option value="">Select {title}</option>
      {types.map((type) => (
        <option value={type.name} key={type.id}>
          {type.name}
        </option>
      ))}
    </Select>
  );
};

export default SelectComp;

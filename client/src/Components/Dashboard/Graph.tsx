import { displayCenter } from "../Common/variable.style";
import PolarGraph from "./PolarChart";
import { WrapChart } from "./dashboard.style";
import BarChart from "./BarChart";

const Graph = () => {
  return (
    <WrapChart $style={displayCenter}>
      <PolarGraph />
      <BarChart />
    </WrapChart>
  );
};

export default Graph;

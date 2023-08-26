import Header from "./Header";
import Graph from "./Graph";
import { Modal } from "../Modal/Modal";
import ModalHeader from "../Modal/ModalHeader";
import { useGlobalContext } from "../../Store/globalContext";
import { useActivity } from "../../Store/ActivityContext";
import { ChartLoading } from "../Shimmers/TextShimmer";
import useAppTitle from "../../hooks/useAppTitle";

type DashboardType = {
  Compo: React.ReactNode;
  title: string;
};

const Dashboard: React.FC<DashboardType> = ({ Compo, title }) => {
  const { setState, state } = useGlobalContext();
  const { data, loading } = useActivity();
  useAppTitle({ name: "Dashboard" });

  return (
    <div>
      <Header />
      {loading ? (
        <ChartLoading />
      ) : (
        <>{data && data?.getAllActivity.data.length > 0 && <Graph />}</>
      )}

      {state.show === title && (
        <Modal
          isOpen="isOpen"
          onClose={() => setState({ ...state, show: "" })}
          size="450px"
        >
          <ModalHeader
            name={title}
            onClose={() => setState({ ...state, show: "" })}
          />
          {Compo}
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;

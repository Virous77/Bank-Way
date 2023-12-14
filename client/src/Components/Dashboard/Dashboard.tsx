import Header from "./Header";
import Graph from "./Graph";
import { Modal } from "../Modal/Modal";
import ModalHeader from "../Modal/ModalHeader";
import { useGlobalContext } from "../../Store/globalContext";
import { useActivity } from "../../Store/ActivityContext";
import { ChartLoading } from "../Shimmers/TextShimmer";
import useAppTitle from "../../hooks/useAppTitle";
import PullToRefresh from "react-simple-pull-to-refresh";

type TDashboard = {
  Compo: React.ReactNode;
  title: string;
};

const Dashboard: React.FC<TDashboard> = ({ Compo, title }) => {
  const { setState, state } = useGlobalContext();
  const { data, loading, refetch } = useActivity();
  useAppTitle({ name: "Dashboard" });

  const handleRefresh = async () => {
    refetch();
  };

  return (
    <PullToRefresh onRefresh={handleRefresh} fetchMoreThreshold={3}>
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
    </PullToRefresh>
  );
};

export default Dashboard;

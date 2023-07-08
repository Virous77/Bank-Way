import { useGlobalContext } from "../../Store/globalContext";
import { displayCol, displayFlex } from "../Common/variable.style";
import { Section, IconLi, HomeUL, IconButton } from "./settings.style";

const HomeSetting = () => {
  const { data, handleUpdateSetting } = useGlobalContext();

  return (
    <Section>
      <HomeUL $style={displayCol} $liStyle={displayFlex}>
        <IconLi>
          <p>Transaction Icon :</p>
          <div>
            <IconButton
              $active={data?.transaction_icon_type ? "true" : "false"}
              onClick={() =>
                handleUpdateSetting({ transaction_icon_type: true })
              }
              disabled={data?.transaction_icon_type}
            >
              Image
            </IconButton>
            <IconButton
              $active={!data?.transaction_icon_type ? "true" : "false"}
              onClick={() =>
                handleUpdateSetting({ transaction_icon_type: false })
              }
              disabled={!data?.transaction_icon_type}
            >
              Svg
            </IconButton>
          </div>
        </IconLi>
      </HomeUL>
    </Section>
  );
};

export default HomeSetting;

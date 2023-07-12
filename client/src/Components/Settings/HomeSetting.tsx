import { BsCheck } from "react-icons/bs";
import { useGlobalContext } from "../../Store/globalContext";
import {
  displayCenter,
  displayCol,
  displayFlex,
} from "../Common/variable.style";
import {
  Section,
  IconLi,
  HomeUL,
  IconButton,
  Check,
  IDiv,
  TTDiv,
} from "./settings.style";
import {
  transactionType,
  transactionIconType,
  transactionDuration,
} from "../../Utils/icons";
import { formatDate } from "../../Utils/data";

const HomeSetting = () => {
  const { data, handleUpdateSetting } = useGlobalContext();

  return (
    <Section>
      <HomeUL $style={displayCol} $liStyle={displayFlex}>
        <IconLi>
          <p>Transaction Icon :</p>
          <IDiv>
            {transactionIconType.map((icon) => (
              <IconButton
                $active={
                  data?.transaction_icon_type === icon.value ? "true" : "false"
                }
                onClick={() =>
                  handleUpdateSetting({ transaction_icon_type: icon.value })
                }
                disabled={data?.transaction_icon_type === icon.value}
                key={icon.id}
              >
                {icon.name}
              </IconButton>
            ))}
          </IDiv>
        </IconLi>

        <IconLi>
          <p>Transaction Type</p>

          <TTDiv $style={displayCenter}>
            {transactionType.map((type) => (
              <Check $style={displayCenter} key={type.id}>
                <span>{type.name}</span>
                <p
                  onClick={() => {
                    if (type.name.toLowerCase() === data?.home_transaction_type)
                      return;
                    handleUpdateSetting({
                      home_transaction_type: type.name.toLowerCase(),
                    });
                  }}
                >
                  {data?.home_transaction_type === type.name.toLowerCase() && (
                    <BsCheck />
                  )}
                </p>
              </Check>
            ))}
          </TTDiv>
        </IconLi>

        <IconLi>
          <p>Transaction Duration</p>

          <TTDiv $style={displayCenter}>
            {transactionDuration.map((duration) => (
              <Check $style={displayCenter} key={duration.id}>
                <span>{duration.name}</span>
                <p
                  onClick={() => {
                    if (duration.value === data?.home_transaction_duration)
                      return;
                    handleUpdateSetting({
                      home_transaction_duration: duration.value,
                    });
                  }}
                >
                  {data?.home_transaction_duration === duration.value && (
                    <BsCheck />
                  )}
                </p>
              </Check>
            ))}
          </TTDiv>
        </IconLi>
      </HomeUL>
      <b>* Last updated at {formatDate(new Date(Number(data?.updatedAt)))}</b>
    </Section>
  );
};

export default HomeSetting;

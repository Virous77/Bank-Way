import { AiOutlineClose } from "react-icons/ai";
import { useGlobalContext } from "../../Store/globalContext";
import { Main, error, success } from "./notification.style";
import "../../index.css";

const Notification = () => {
  const { notification, handleSetNotification } = useGlobalContext();

  return (
    <Main
      $style={
        notification.status === "success"
          ? success
          : notification.status === "error"
          ? error
          : ""
      }
    >
      {notification.message}{" "}
      <AiOutlineClose
        size={16}
        cursor="pointer"
        onClick={() => handleSetNotification({ status: "", message: "" })}
      />
    </Main>
  );
};

export default Notification;

import browserImage from "../../assets/browser.svg";
import { displayAllCenter } from "../Common/variable.style";
import { MDiv } from "./nav.style";
import useWorker from "../../hooks/useWorker";
import { useEffect, useState } from "react";

const Wrong = () => {
  const { userClient } = useWorker();
  const [client, setClient] = useState<string | null>("");

  useEffect(() => {
    setClient(userClient());
  }, []);

  return (
    <MDiv $style={displayAllCenter}>
      <div>
        <img
          src={browserImage}
          alt="wrong browser"
          style={{ width: "200px", height: "200px" }}
        />
      </div>

      <section>
        <h1
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            textAlign: "center",
            fontSize: "20px",
          }}
        >
          {client?.toUpperCase()} {client === "safari" && "Desktop"} doesn't
          support to install PWAs app currently.
        </h1>
        <p>
          To install <b>Expensify</b> in your app, open this website in
          supported browsers like, Chrome, Brave(desktop), Edge(desktop),
          Safari(mobile).
        </p>
      </section>
    </MDiv>
  );
};

export default Wrong;

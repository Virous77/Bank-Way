import homeImage from "../../assets/home.svg";
import { displayAllCenter } from "../Common/variable.style";
import { MDiv } from "./nav.style";

const Safari = () => {
  return (
    <MDiv $style={displayAllCenter}>
      <div>
        <img src={homeImage} alt="home-screen" />
      </div>

      <section>
        <h1>Add to Home Screen</h1>

        <p>
          To install the app, you need to add this web app to your home screen.
        </p>

        <p>
          In your Safari browser menu, tap the share icon and choose{" "}
          <b>Add to Home Screen</b> in the options. Then open Expensify app in
          your home screen.
        </p>
      </section>
    </MDiv>
  );
};

export default Safari;

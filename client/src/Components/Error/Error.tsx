import { Main } from "./error.style";
import { useNavigate } from "react-router-dom";
import notFound from "../../assets/error1.svg";

const Error = () => {
  const navigate = useNavigate();
  return (
    <Main>
      <section>
        <img src={notFound} alt="not-found" />
        <h2>Oops! This page was lost in space...</h2>
        <p>
          Check if you’re using the right address or explore our website by
          clicking on the button below.
        </p>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </section>
    </Main>
  );
};

export default Error;

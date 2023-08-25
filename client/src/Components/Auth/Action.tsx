import React from "react";
import { Link, P } from "./auth.style";
import { useGlobalContext } from "../../Store/globalContext";
import { useAuthContext } from "../../Store/AuthContext";

type ActionType = {
  title: string;
};

const Action: React.FC<ActionType> = ({ title }) => {
  const { setState, state } = useGlobalContext();
  const { setFormData, formData } = useAuthContext();

  return (
    <div style={{ marginTop: title === "signIn" ? "-1.5rem" : "-0.5rem" }}>
      {title === "signIn" && (
        <Link onClick={() => setState({ ...state, show: "forget" })}>
          <p
            style={{
              color: "white",
              marginLeft: "4px",
              fontSize: "14px",
              textDecoration: "underline",
            }}
          >
            Forgotten Password?
          </p>
        </Link>
      )}
      <P
        onClick={() =>
          setFormData({ ...formData, password: "", email: "", name: "" })
        }
      >
        {title !== "signIn"
          ? "Already have an Account?"
          : "Don't have an Account?"}{" "}
        {title !== "signIn" ? (
          <Link
            onClick={() => setState({ ...state, show: "signIn" })}
            style={{ textDecoration: "underline" }}
          >
            Sign In
          </Link>
        ) : (
          <Link
            onClick={() => setState({ ...state, show: "signUp" })}
            style={{ textDecoration: "underline" }}
          >
            Sign Up
          </Link>
        )}
      </P>
    </div>
  );
};

export default Action;

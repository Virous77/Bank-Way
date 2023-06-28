import { useEffect } from "react";
import { Check, Section, CheckList } from "./settings.style";
import { BsCheck } from "react-icons/bs";
import { displayCenter } from "../Common/variable.style";
import { useGlobalContext } from "../../Store/globalContext";

const ThemeSetting = () => {
  const localTheme = localStorage.getItem("theme-B");
  const activeTheme: string = localTheme ? JSON.parse(localTheme) : "";
  const body = document.querySelector("body");
  const { state, setState } = useGlobalContext();
  const { active } = state;

  const handleToggle = (name: string) => {
    if (name === "system") {
      setState({ ...state, active: "system" });
      localStorage.setItem("theme-B", JSON.stringify("system"));

      const newColorScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (newColorScheme) {
        body?.classList.add("darkTheme");
      } else {
        body?.classList.remove("darkTheme");
      }
    }

    if (name === "light") {
      body?.classList.remove("darkTheme");
      setState({ ...state, active: "light" });
      localStorage.setItem("theme-B", JSON.stringify("light"));
    }

    if (name === "dark") {
      body?.classList.add("darkTheme");
      setState({ ...state, active: "dark" });
      localStorage.setItem("theme-B", JSON.stringify("dark"));
    }
  };

  useEffect(() => {
    setState({ ...state, active: activeTheme });
  }, []);

  return (
    <Section>
      <CheckList $style={displayCenter}>
        <Check $style={displayCenter}>
          <span>OS Default : </span>
          <p onClick={() => handleToggle("system")}>
            {active === "system" && <BsCheck />}
          </p>
        </Check>
        <Check $style={displayCenter}>
          <span>Light</span>
          <p onClick={() => handleToggle("light")}>
            {active === "light" && <BsCheck />}
          </p>
        </Check>
        <Check $style={displayCenter}>
          <span>Dark</span>
          <p onClick={() => handleToggle("dark")}>
            {active === "dark" && <BsCheck />}
          </p>
        </Check>
      </CheckList>
    </Section>
  );
};

export default ThemeSetting;

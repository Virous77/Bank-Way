import { useState, useEffect } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { Theme } from "../Components/Layout/navbar.style";
import { displayAllCenter } from "../Components/Common/variable.style";
import { useGlobalContext } from "../Store/globalContext";

const ThemeProvider = () => {
  const localTheme = localStorage.getItem("theme-B");
  const activeTheme: string = localTheme ? JSON.parse(localTheme) : "";
  const [theme, setTheme] = useState(activeTheme === "dark" ? "Light" : "Dark");
  const body = document.querySelector("body");
  const { state } = useGlobalContext();

  const handleToggle = (name: string) => {
    if (name === "dark" || activeTheme === "light") {
      body?.classList.add("darkTheme");
      setTheme("light");
      localStorage.setItem("theme-B", JSON.stringify("dark"));
    }

    if (name === "light" || activeTheme === "dark") {
      body?.classList.remove("darkTheme");
      setTheme("Dark");
      localStorage.setItem("theme-B", JSON.stringify("light"));
    }
  };

  useEffect(() => {
    if (activeTheme === "dark") {
      body?.classList.add("darkTheme");
    }

    if (activeTheme === "system" || !activeTheme || state.active === "system") {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (event) => {
          const newColorScheme = event.matches ? "dark" : "light";
          handleToggle(newColorScheme);
        });
    }
  }, [state.active, activeTheme]);

  return (
    <Theme $displayCenter={displayAllCenter}>
      {theme === "light" ? (
        <MdDarkMode
          onClick={() => handleToggle("light")}
          color={`var(--main-font-color)`}
          size={23}
          cursor="pointer"
        />
      ) : (
        <MdLightMode
          onClick={() => handleToggle("dark")}
          color={`var(--main-font-color)`}
          size={23}
          cursor="pointer"
        />
      )}
    </Theme>
  );
};

export default ThemeProvider;

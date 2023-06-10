import { useState, useEffect } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { Theme } from "../Components/Layout/navbar.style";
import { displayAllCenter } from "../Components/Common/variable.style";

const ThemeProvider = () => {
  const localTheme = localStorage.getItem("theme-B");
  const activeTheme: string = localTheme ? JSON.parse(localTheme) : "";
  const [theme, setTheme] = useState(activeTheme === "dark" ? "Light" : "Dark");
  const body = document.querySelector("body");

  const handleToggle = () => {
    if (body?.classList.contains("darkTheme")) {
      body.classList.remove("darkTheme");
      setTheme("Dark");
      localStorage.setItem("theme-B", JSON.stringify("light"));
    } else {
      body?.classList.add("darkTheme");
      setTheme("Light");
      localStorage.setItem("theme-B", JSON.stringify("dark"));
    }
  };

  useEffect(() => {
    if (activeTheme === "dark") {
      body?.classList.add("darkTheme");
    }
  }, [theme]);

  return (
    <Theme $displayCenter={displayAllCenter}>
      {theme === "Light" ? (
        <MdDarkMode
          onClick={handleToggle}
          color={`var(--main-font-color)`}
          size={23}
          cursor="pointer"
        />
      ) : (
        <MdLightMode
          onClick={handleToggle}
          color={`var(--main-font-color)`}
          size={23}
          cursor="pointer"
        />
      )}
    </Theme>
  );
};

export default ThemeProvider;

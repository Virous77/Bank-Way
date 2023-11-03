import { useEffect, useState } from "react";
import { MAIN } from "./loader.style";

const Loader = () => {
  const [color, setColor] = useState("black");
  const colors = ["blue", "red", "green", "orange"];
  const interval = 1000;

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextColorIndex = (colors.indexOf(color) + 1) % colors.length;
      const nextColor = colors[nextColorIndex];
      setColor(nextColor);
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [color]);
  return (
    <MAIN>
      <div>
        <h1 style={{ color: color }}>Expensify</h1>
        <p>Loading...</p>
      </div>
    </MAIN>
  );
};

export default Loader;

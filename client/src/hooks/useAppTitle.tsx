import { useEffect } from "react";

const useAppTitle = ({
  name,
  data = "Expensify",
}: {
  name: string | undefined;
  data?: string;
}) => {
  useEffect(() => {
    document.title =
      `${name} ${name !== "Expensify" ? "| Expensify" : ""}` || "Expensify";
  }, [data]);
};

export default useAppTitle;

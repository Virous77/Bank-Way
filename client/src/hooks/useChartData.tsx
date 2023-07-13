import { daysAgo, dateFormat2 } from "../Utils/data";
import { useActivity } from "../Store/ActivityContext";
import { useMemo } from "react";

const useChartData = () => {
  const DaysAgo = daysAgo(7);
  const { data } = useActivity();

  const weeklyData = data?.getAllActivity.data.filter(
    (trans) => new Date(Number(trans.createdAt)) > DaysAgo
  );

  const chartData = useMemo(() => {
    const modifyData = [1, 2, 3, 4, 5, 6, 7].map((_, idx) => {
      if (!weeklyData) return;

      const currentDate = daysAgo(idx - 1)
        .toISOString()
        .split("T")[0];

      const transactionsOfDay = weeklyData
        .filter((transaction) => transaction.date === currentDate)
        .map((trans) => {
          if (trans.type_name === "income" || trans.type_name === "refund") {
            return trans.amount;
          } else {
            return -trans.amount;
          }
        });

      const totalAmount = transactionsOfDay.reduce(
        (sum, transaction) => sum + transaction,
        0
      );

      return totalAmount;
    });
    return modifyData;
  }, [weeklyData]);

  const dates = [1, 2, 3, 4, 5, 6, 7].map((_, idx) =>
    dateFormat2(
      daysAgo(idx - 1)
        .toISOString()
        .split("T")[0]
    )
  );

  return { dates, chartData };
};

export default useChartData;

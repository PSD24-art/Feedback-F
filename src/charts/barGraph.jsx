import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function BasicBars({ ratings }) {
  const categories = ratings.map(
    (r) => r.subjectName.split(" ").splice(0, 2).join(" ") ?? "",
  );
  const data = ratings.map((r) => Number(r.avgRating) || 0);

  const colors = [
    "#f43f5e",
    "#fb923c",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
  ];

  const series = data.map((value, i) => ({
    data: [value],
    label: categories[i],
    color: colors[i % colors.length],
  }));

  return (
    <div className="mx-auto w-full max-w-2xl">
      <BarChart
        xAxis={[{ data: [""], scaleType: "band" }]}
        series={series}
        height={280}
        margin={{ top: 20, bottom: 55, left: 18, right: 18 }}
        slotProps={{
          legend: { hidden: false },
        }}
        fontSize={12}
        fontWeight={600}
      />
    </div>
  );
}

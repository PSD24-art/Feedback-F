import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function BasicBars({ ratings }) {
  console.log("Bar chart ratings Vertical: ", ratings);

  const categories = ratings.map(
    (r) => r.subjectName.split(" ").splice(0, 2).join(" ") ?? ""
  );
  const data = ratings.map((r) => Number(r.avgRating) || 0);

  const colors = [
    "#FFA500", // orange
    "#C70039", // maroon
    "#3380FF", // blue
    "#FF5733", // red-orange
    "#33FF57", // green
    "#FFC300", // yellow
  ];

  // Create a separate series for each bar
  const series = data.map((value, i) => ({
    data: [value],
    label: categories[i],
    color: colors[i % colors.length],
  }));

  return (
    <div style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
      <BarChart
        xAxis={[{ data: [""], scaleType: "band" }]}
        series={series}
        height={300}
        margin={{ top: 20, bottom: 50 }}
        slotProps={{
          legend: { hidden: false },
        }}
        fontSize={13}
        fontWeight={600}
      />
    </div>
  );
}

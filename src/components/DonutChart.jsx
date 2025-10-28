import { PieChart } from "@mui/x-charts/PieChart";

export default function DonutChart({ ratingPercentage }) {
  if (!ratingPercentage) return null;

  // Convert ratings {1:'0.0',2:'0.0',3:'0.0',4:'100.0',5:'0.0'} → array
  const data = Object.entries(ratingPercentage).map(([rating, percent]) => ({
    label: `${rating}⭐`,
    value: parseFloat(percent),
  }));

  // 1⭐→5⭐ colors
  const colors = ["#FF4C4C", "#FF944C", "#FFD24C", "#A8E06E", "#4CAF50"];

  // hide 0% segments
  const filtered = data.filter((d) => d.value > 0);

  return (
    <div className="flex flex-col items-center w-full gap-3">
      <PieChart
        width={250}
        height={250}
        series={[
          {
            innerRadius: 60,
            outerRadius: 100,
            paddingAngle: 2,
            data:
              filtered.length > 0
                ? filtered.map((item, i) => ({
                    ...item,
                    color: colors[parseInt(item.label) - 1] || "#ccc",
                  }))
                : [{ label: "No Data", value: 100, color: "#e0e0e0" }],
            arcLabel: (item) =>
              item.value > 5 ? `${item.value.toFixed(1)}%` : "",
          },
        ]}
        slotProps={{ legend: { hidden: true } }}
      />

      {/* Horizontal legend */}
      <div className="flex justify-center gap-3 mt-1">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-1 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[i] }}
            ></div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

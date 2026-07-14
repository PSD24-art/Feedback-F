import { PieChart } from "@mui/x-charts/PieChart";

export default function DonutChart({ ratingPercentage }) {
  if (!ratingPercentage) return null;

  const data = Object.entries(ratingPercentage).map(([rating, percent]) => ({
    label: `${rating}⭐`,
    value: parseFloat(percent),
  }));

  const colors = ["#ef4444", "#f97316", "#f59e0b", "#84cc16", "#10b981"];
  const filtered = data.filter((d) => d.value > 0);

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <PieChart
        width={240}
        height={240}
        series={[
          {
            innerRadius: 56,
            outerRadius: 96,
            paddingAngle: 2,
            data:
              filtered.length > 0
                ? filtered.map((item) => ({
                    ...item,
                    color: colors[parseInt(item.label) - 1] || "#cbd5e1",
                  }))
                : [{ label: "No Data", value: 100, color: "#e2e8f0" }],
            arcLabel: (item) =>
              item.value > 5 ? `${item.value.toFixed(1)}%` : "",
          },
        ]}
        slotProps={{ legend: { hidden: true } }}
      />

      <div className="flex flex-wrap justify-center gap-2 text-[11px] font-medium text-slate-500">
        {data.map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            className="flex items-center gap-1.5"
          >
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: colors[index] || "#cbd5e1" }}
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

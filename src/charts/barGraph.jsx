import { BarChart } from "@mui/x-charts/BarChart";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lime, purple } from "@mui/material/colors";
import Button from "@mui/material/Button";
const theme = createTheme({
  palette: {
    primary: lime,
    secondary: purple,
  },
});

export default function BasicBars() {
  return (
    <BarChart
      xAxis={[
        {
          id: "barCategories",
          data: ["DBMS", "Cloud", "Crypto"],
        },
      ]}
      series={[
        {
          data: [4.7, 3.5, 5],
          color: "#3b82f6", // default fallback
          colorMap: {
            type: "ordinal",
            values: ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"],
          },
        },
      ]}
      height={300}
    />
  );
}

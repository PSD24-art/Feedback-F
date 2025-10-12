import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import { PiecewiseColorLegend } from "@mui/x-charts/ChartsLegend";
import { useAnimate } from "@mui/x-charts/hooks";
import { interpolateObject } from "@mui/x-charts-vendor/d3-interpolate";

// Hardcoded criteria names
const fallbackRatings = [
  { criteria: "Communication", avgRating: 3.8 },
  { criteria: "Knowledge", avgRating: 2.0 },
  { criteria: "Engagement", avgRating: 4.5 },
  { criteria: "Punctuality", avgRating: 2.6 },
  { criteria: "Doubt Solving", avgRating: 4.6 },
];

export default function FacultyFeedbackChart({ criteriaObj = [] }) {
  // console.log("Received criteriaObj:", criteriaObj);

  // Map numeric ratings to criteria names
  const dataset =
    Array.isArray(criteriaObj) && criteriaObj.length > 0
      ? fallbackRatings.map((item, i) => ({
          criteria: item.criteria,
          avgRating: Number(criteriaObj[i]) || 0,
        }))
      : fallbackRatings;

  if (!dataset || dataset.length === 0) {
    return (
      <Box width="100%" textAlign="center" mt={4}>
        <Typography color="text.secondary">
          No feedback data available
        </Typography>
      </Box>
    );
  }

  return (
    <Box width="100%">
      {/* <Typography marginBottom={2} fontWeight={600}>
        Criteria-wise Faculty Feedback Ratings
      </Typography> */}

      <BarChart
        height={320}
        layout="horizontal"
        dataset={dataset}
        xAxis={[
          {
            label: "Average Rating (0–5)",
            min: 0,
            max: 5,
            colorMap: {
              type: "piecewise",
              thresholds: [2.5, 4],
              colors: ["#ef4444", "#facc15", "#22c55e"],
            },
          },
        ]}
        yAxis={[
          {
            scaleType: "band",
            data: dataset.map((d) => d.criteria), // ✅ Explicitly provide data labels
            label: "Criteria",
            tickLabelStyle: {
              fontSize: 13,
              fontWeight: 600,
              fill: "#374151",
            },
            width: 125,
          },
        ]}
        series={[
          {
            data: dataset.map((d) => d.avgRating), // ✅ Explicitly bind data values
            label: "Average Rating",
            valueFormatter: (v) =>
              typeof v === "number" ? `${v.toFixed(2)} / 5` : "-",
            color: "#3b82f6",
          },
        ]}
        margin={{ top: 20, bottom: 30 }}
        slots={{
          legend: PiecewiseColorLegend,
          barLabel: BarLabelInside,
        }}
        slotProps={{
          legend: {
            axisDirection: "x",
            markType: "square",
            labelFormatter: ({ index }) => {
              if (index === 0) return "Needs Improvement";
              if (index === 1) return "Good";
              return "Excellent";
            },
          },
        }}
      />
    </Box>
  );
}

// Label inside each bar
const Text = styled("text")(({ theme }) => ({
  ...theme.typography.body2,
  fill: (theme.vars || theme).palette.common.white,
  textAnchor: "middle",
  dominantBaseline: "central",
  pointerEvents: "none",
  fontWeight: 600,
}));

function BarLabelInside(props) {
  const { x, y, width, height, formattedValue } = props;
  if (
    typeof x !== "number" ||
    typeof width !== "number" ||
    typeof y !== "number" ||
    typeof height !== "number"
  ) {
    return null;
  }

  const animatedProps = useAnimate(
    { x: x + width / 2, y: y + height / 2 },
    {
      initialProps: { x, y: y + height / 2 },
      createInterpolator: interpolateObject,
      transformProps: (p) => p,
      applyProps: (el, p) => {
        el.setAttribute("x", p.x.toString());
        el.setAttribute("y", p.y.toString());
      },
    }
  );

  return <Text {...animatedProps}>{formattedValue}</Text>;
}

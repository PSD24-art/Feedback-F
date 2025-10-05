import * as React from "react";
import { useTheme, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import { PiecewiseColorLegend } from "@mui/x-charts/ChartsLegend";
import { useAnimate, useAnimateBar, useDrawingArea } from "@mui/x-charts/hooks";
import { interpolateObject } from "@mui/x-charts-vendor/d3-interpolate";

// ✅ Replace this with your own imported JSON file
// import facultyRatings from "../dataset/facultyRatings.json";

const facultyRatings = [
  { criteria: "Communication Clarity", rating: 4.2 },
  { criteria: "Knowledge of Subject", rating: 3.8 },
  { criteria: "Engagement", rating: 4.5 },
  { criteria: "Punctuality", rating: 4.0 },
  { criteria: "Doubt Solving", rating: 4.6 },
];

export default function FacultyFeedbackChart() {
  return (
    <Box width="100%">
      <Typography marginBottom={2} fontWeight={600}>
        Criteria-wise Faculty Feedback Ratings
      </Typography>

      <BarChart
        height={350}
        dataset={facultyRatings}
        series={[
          {
            id: "rating",
            dataKey: "rating",
            valueFormatter: (v) => `${v.toFixed(1)} / 5`,
            color: "#3b82f6",
          },
        ]}
        layout="horizontal"
        xAxis={[
          {
            id: "ratings",
            min: 0,
            max: 5,
            colorMap: {
              type: "piecewise",
              thresholds: [2.5, 4],
              colors: ["#ef4444", "#facc15", "#22c55e"],
            },
            valueFormatter: (value) => `${value.toFixed(1)} / 5`,
          },
        ]}
        yAxis={[
          {
            scaleType: "band",
            dataKey: "criteria",
            width: 150,
          },
        ]}
        barLabel={(v) => `${v.value.toFixed(1)}`}
        slots={{
          legend: PiecewiseColorLegend,
          barLabel: BarLabelAtBase,
          bar: BarShadedBackground,
        }}
        slotProps={{
          legend: {
            axisDirection: "x",
            markType: "square",
            labelPosition: "inline-start",
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

export function BarShadedBackground(props) {
  const { ownerState, ...other } = props;
  const theme = useTheme();
  const animatedProps = useAnimateBar(props);
  const { width } = useDrawingArea();

  return (
    <>
      <rect
        {...other}
        fill={(theme.vars || theme).palette.text.primary}
        opacity={theme.palette.mode === "dark" ? 0.05 : 0.1}
        x={other.x}
        width={width}
      />
      <rect
        {...other}
        filter={ownerState.isHighlighted ? "brightness(120%)" : undefined}
        opacity={ownerState.isFaded ? 0.3 : 1}
        data-highlighted={ownerState.isHighlighted || undefined}
        data-faded={ownerState.isFaded || undefined}
        {...animatedProps}
      />
    </>
  );
}

const Text = styled("text")(({ theme }) => ({
  ...theme.typography.body2,
  stroke: "none",
  fill: (theme.vars || theme).palette.common.white,
  textAnchor: "start",
  dominantBaseline: "central",
  pointerEvents: "none",
  fontWeight: 600,
}));

function BarLabelAtBase(props) {
  const { xOrigin, y, height, skipAnimation } = props;
  const animatedProps = useAnimate(
    { x: xOrigin + 8, y: y + height / 2 },
    {
      initialProps: { x: xOrigin, y: y + height / 2 },
      createInterpolator: interpolateObject,
      transformProps: (p) => p,
      applyProps: (el, p) => {
        el.setAttribute("x", p.x.toString());
        el.setAttribute("y", p.y.toString());
      },
      skip: skipAnimation,
    }
  );

  return <Text {...animatedProps}>{props.formattedValue}</Text>;
}

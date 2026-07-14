import React, { useEffect, useState } from "react";
import FacultyFeedbackChart from "../charts/HorizontallBars";
import BasicBars from "../charts/barGraph";
import AISummaryBox from "./AISummaryBox";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import DonutChart from "./DonutChart";
import fetchFn from "../utils/fetchFn";
import { useParams } from "react-router-dom";
import SkeletonCard from "./utilityComponents/SkeletonCard";

const Dashboard = React.memo(
  ({
    aiSpinner,
    loading,
    limit,
    count,
    selectedSubjectId,
    setSelectedSubjectId,
    aiSummary,
    handleGenerateSummary,
    terms = [],
    selectedTerm,
    setSelectedTerm,
    termData = {},
    feedbackData,
    embedded = false,
  }) => {
    const [generate, setGenerate] = useState(false);

    useEffect(() => {
      if (
        termData?.links?.length > 0 &&
        (!selectedSubjectId ||
          !termData?.links?.some((l) => l.subject?._id === selectedSubjectId))
      ) {
        const firstValid = termData?.links?.find((l) => l.subject?._id);
        if (firstValid) {
          setSelectedSubjectId(firstValid.subject._id);
        }
      }
    }, [termData?.links, selectedSubjectId]);

    const { id } = useParams();

    let finalId;
    let NewUrl;
    if (location.pathname.startsWith("/faculty")) {
      finalId = id;
      NewUrl = "/faculty/generate-report";
    } else {
      finalId = termData?.faculty?._id;
      NewUrl = "/admin/generate-report";
    }

    const generateReport = async () => {
      setGenerate(true);
      const response = await fetchFn(
        NewUrl,
        "POST",
        JSON.stringify({ facultyId: finalId }),
        "blob",
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setGenerate(false);

      const a = document.createElement("a");
      a.href = url;
      a.download = "Faculty_Report.xlsx";
      a.click();
    };

    const feedbackCount = feedbackData?.FeedbackLength ?? 0;
    const responseRate =
      limit > 0 ? Math.round((feedbackCount / limit) * 100) : 0;

    return (
      <div className={`flex flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-[radial-gradient(circle_at_top_left,_rgba(244,63,94,0.08),_transparent_55%)] p-3 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.22)] sm:p-4 lg:p-5 ${embedded ? "h-full min-h-0" : "min-h-[93vh]"}`}>
        <div className="sticky top-0 z-10 mb-4 rounded-[24px] border border-slate-200 bg-white/85 px-4 py-4 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-600 to-rose-500 text-lg font-black text-white shadow-lg shadow-rose-500/20">
                  <span>📊</span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Faculty Analytics
                    </h3>
                    <span className="rounded-full border border-amber-200 bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
                      {isNaN(termData?.totalRating)
                        ? "⭐ --"
                        : `⭐ ${termData?.totalRating}`}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
                      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
                      Live
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    {termData?.faculty?.name || "Faculty Dashboard"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <Gauge
                    value={feedbackCount}
                    valueMax={Math.max(limit, 1)}
                    startAngle={-110}
                    endAngle={110}
                    sx={{
                      width: 110,
                      height: 56,
                      [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 13,
                        fontWeight: 800,
                        fill: "#334155",
                      },
                      [`& .${gaugeClasses.valueArc}`]: { fill: "#e11d48" },
                      [`& .${gaugeClasses.referenceArc}`]: { fill: "#fecdd3" },
                    }}
                    text={({ value }) => `${value} / ${limit}`}
                  />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                      Response Rate
                    </p>
                    <h4 className="text-sm font-extrabold text-slate-800">
                      {responseRate}%
                    </h4>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-rose-100 bg-gradient-to-r from-rose-50 to-white px-4 py-3 text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                  Active Faculty
                </p>
                <h2 className="text-lg font-bold text-slate-900">
                  {termData?.faculty?.name}
                </h2>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                Term
              </label>
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 outline-none ring-0"
              >
                {terms.map((term) => (
                  <option key={term} value={term}>
                    {term}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                Subject
              </label>
              <select
                value={selectedSubjectId || ""}
                disabled={termData?.links?.length <= 1}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 outline-none ring-0 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <option value="" disabled>
                  Select Subject
                </option>

                {termData?.links?.length > 0 &&
                  termData?.links
                    .filter((l) => l.subject && l.subject._id)
                    .map((link) => (
                      <option key={link._id} value={link.subject._id}>
                        {link.subject.name}
                      </option>
                    ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {termData?.links?.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.3fr_0.8fr]">
              <div className="space-y-4">
                <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">
                      Subject Rating Index
                    </h3>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Comparison
                    </span>
                  </div>
                  {loading ? (
                    <SkeletonCard />
                  ) : (
                    termData?.ratingObjects && (
                      <BasicBars ratings={termData?.ratingObjects} />
                    )
                  )}
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">
                      Criteria-wise Performance
                    </h3>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Scores (0-5)
                    </span>
                  </div>
                  {loading ? (
                    <SkeletonCard />
                  ) : feedbackData?.ratings?.length > 0 ? (
                    <FacultyFeedbackChart criteriaObj={feedbackData?.ratings} />
                  ) : (
                    <p className="py-8 text-center text-sm italic text-slate-500">
                      No data available for selected term
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">
                      Rating Distribution
                    </h3>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Distribution
                    </span>
                  </div>
                  {loading ? (
                    <SkeletonCard />
                  ) : (
                    <DonutChart
                      ratingPercentage={feedbackData?.ratingPercentage}
                    />
                  )}
                </div>

                <AISummaryBox
                  aiSpinner={aiSpinner}
                  aiSummary={aiSummary}
                  handleGenerateSummary={handleGenerateSummary}
                />
              </div>
            </div>
          ) : (
            <div
              className={`rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm ${loading ? "" : "flex h-60 items-center justify-center text-sm text-slate-500"}`}
            >
              {loading ? (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              ) : (
                "No subjects or feedback received."
              )}
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-400">
              <span className="font-semibold text-slate-500">email:</span>{" "}
              {termData?.faculty?.email}
            </p>
            <button
              onClick={generateReport}
              className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
            >
              {generate ? "Generating.." : "Generate EXCEL"}
            </button>
          </div>
        </div>
      </div>
    );
  },
);

export default Dashboard;

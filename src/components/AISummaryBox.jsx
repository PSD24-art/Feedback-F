import styles from "./Css/AISummaryBox.module.css";

function AISummaryBox({ aiSummary = [], handleGenerateSummary, aiSpinner }) {
  return (
    <div className="relative flex h-[360px] flex-col justify-between overflow-hidden rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(244,63,94,0.12),_transparent_60%)]" />
      <div className="relative flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            AI Development Summary
          </h3>
          <p className="text-[11px] text-slate-400">
            Powered by actionable feedback insights
          </p>
        </div>
        <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600">
          Live AI
        </span>
      </div>

      <div className="relative mt-3 flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
        {aiSummary.length > 0 ? (
          aiSummary.map((point, index) => (
            <div
              key={`${point.title}-${index}`}
              className={`rounded-2xl border border-slate-100 bg-slate-50 p-3 shadow-sm ${styles.card}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h4 className="mb-1 text-sm font-semibold text-rose-700">
                {point.title}
              </h4>
              <p className="text-sm leading-relaxed text-slate-600">
                {point.description}
              </p>
            </div>
          ))
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-500">
            Click the AI Summary button to generate evaluation insights.
          </div>
        )}
      </div>

      <div className="relative mt-4 flex justify-center">
        <button
          onClick={handleGenerateSummary}
          disabled={aiSpinner}
          className="flex items-center gap-2 rounded-2xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition-all duration-300 hover:scale-[1.01] hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {aiSpinner ? (
            <>
              AI Summary
              <svg
                className="h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </>
          ) : (
            <>
              AI Summary
              <span className="h-2.5 w-2.5 rounded-full bg-white/90 animate-pulse" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default AISummaryBox;

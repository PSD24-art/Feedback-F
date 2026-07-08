import styles from "./Css/AISummaryBox.module.css";

function AISummaryBox({ aiSummary = [], handleGenerateSummary, aiSpinner }) {
  return (
    <div className="flex-grow flex flex-col justify-between text-gray-700 text-sm border border-dashed border-orange-300 rounded-md p-4 h-[360px] relative bg-amber-50 overflow-hidden">
      <div
        className={`absolute inset-0 ${styles.animate_pulse_slow} bg-gradient-to-br from-orange-100/10 via-transparent to-amber-100/10 pointer-events-none`}
      />

      {/* Scrollable Container */}
      <div className="relative flex flex-col gap-3 overflow-y-auto max-h-[280px] pr-1">
        {aiSummary.length > 0 ? (
          aiSummary.map((point, index) => (
            <div
              key={`${point.title}-${index}`}
              className={`p-3 rounded-xl border bg-white shadow-sm ${styles.card}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h4 className="font-semibold text-red-700 mb-1">{point.title}</h4>
              <p className="text-gray-600 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 italic animate-pulse mt-6">
            Click the AI Summary button to generate evaluation
          </p>
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={handleGenerateSummary}
          disabled={aiSpinner}
          className="bg-red-950 text-gray-200 font-medium px-4 py-2 rounded-2xl flex items-center gap-2 transition-all duration-300 hover:bg-neutral-800 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {aiSpinner ? (
            <>
              ⚡ AI Summary
              <svg
                className="animate-spin h-5 w-5 text-gray-200"
                xmlns="http://w3.org"
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
              ⚡ AI Summary{" "}
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 animate-pulse" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default AISummaryBox;

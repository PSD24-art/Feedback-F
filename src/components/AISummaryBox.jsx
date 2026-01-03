import styles from "./Css/AISummaryBox.module.css";

function AISummaryBox({ aiSummary = [], handleGenerateSummary }) {
  return (
    <div className="flex-grow flex flex-col justify-between text-gray-700 text-sm border border-dashed border-orange-300 rounded-md p-4 min-h-[360px] relative bg-amber-50 overflow-hidden">
      <div
        className={`absolute inset-0 ${styles.animate_pulse_slow} bg-gradient-to-br from-orange-100/10 via-transparent to-amber-100/10 pointer-events-none`}
      />

      <div className="relative flex flex-col gap-3">
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
          className="bg-red-950 text-gray-200 font-medium px-4 py-2 rounded-2xl flex items-center gap-2 transition-all duration-300 hover:bg-neutral-800 hover:scale-105"
        >
          ⚡ AI Summary
          <span className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 animate-pulse" />
        </button>
      </div>
    </div>
  );
}

export default AISummaryBox;

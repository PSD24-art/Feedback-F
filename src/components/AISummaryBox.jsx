import React from "react";
import { Typewriter } from "react-simple-typewriter";
import styles from "./Css/AISummaryBox.module.css";

function AISummaryBox({ aiSummary, handleGenerateSummary }) {
  return (
    <div className="flex-grow flex flex-col items-center justify-end text-gray-500 text-sm border border-dashed border-orange-300 rounded-md p-3 min-h-90 relative overflow-hidden bg-amber-50">
      {/* Subtle gradient pulse background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-orange-100/10 via-transparent to-amber-100/10 ${styles.animate_pulse_slow} rounded-md pointer-events-none`}
      ></div>

      {aiSummary && aiSummary.trim() !== "" ? (
        <div
          className={`relative items-center gap-2 px-1 max-w-[90%] text-start ${styles.animate_fade_in}`}
        >
          {/* Typewriter text */}
          <p className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-red-600 to-pink-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.4)] leading-relaxed text-[0.95rem] tracking-wide">
            <Typewriter
              words={[aiSummary]}
              loop={1}
              cursor
              cursorStyle="▋"
              typeSpeed={28}
              deleteSpeed={0}
              delaySpeed={1000}
            />
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-400 italic animate-pulse">
          Click the AI Summary button until it generates a summary!
        </p>
      )}

      {/* AI Summary Button */}
      <div
        className="w-45 h-10 mt-2 flex items-center justify-center"
        onClick={handleGenerateSummary}
      >
        {/* Actual button */}
        <button className="relative z-10 hover:cursor-pointer bg-red-950 text-gray-200 font-medium px-3 py-2 rounded-2xl flex items-center gap-2 transition-all duration-300 hover:bg-neutral-800 hover:scale-105">
          <span>⚡ AI Summary</span>
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 shadow-lg shadow-amber-400/40 animate-pulse"></div>
        </button>
      </div>
    </div>
  );
}

export default AISummaryBox;

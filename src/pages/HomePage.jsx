import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-dvh bg-amber-50 text-gray-800 px-6">
      <div className="text-center space-y-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-red-700">
          Welcome to <span className="text-red-600">Feedback_Guru</span>
        </h1>

        <p className="text-base text-gray-600 leading-relaxed">
          Empowering institutions through smarter, AI-driven faculty feedback.
          Simplify how you collect, analyze, and improve teaching performance
          with ease.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            className="basic_button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login to Continue
          </button>
        </div>
      </div>
    </div>
  );
}

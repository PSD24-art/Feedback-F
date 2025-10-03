import { CheckCircle } from "lucide-react"; // icon library (lucide-react is lightweight)

const FeedbackSent = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white border border-green-200 shadow-lg rounded-xl p-8 text-center max-w-md w-full">
        <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Feedback Submitted!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for taking the time to share your feedback. Your response
          has been recorded successfully.
        </p>
      </div>
    </div>
  );
};

export default FeedbackSent;

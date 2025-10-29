import { CheckCircle } from "lucide-react"; // icon library (lucide-react is lightweight)

const FeedbackSent = () => {
  return (
    <div className="flex justify-center items-center mx-4 mt-20">
      <div className="bg-white border-green-200 shadow-lg rounded-xl border-2 p-8 text-center max-w-md w-full">
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

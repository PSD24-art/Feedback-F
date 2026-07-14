import { CheckCircle } from "lucide-react"; // icon library (lucide-react is lightweight)

const FeedbackSent = () => {
  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-10">
      <div className="panel-card w-full max-w-md p-8 text-center">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-emerald-500" />
        <h2 className="mb-2 text-2xl font-extrabold text-slate-800">
          Feedback Submitted!
        </h2>
        <p className="mb-2 text-slate-500">
          Thank you for taking the time to share your feedback. Your response
          has been recorded successfully.
        </p>
      </div>
    </div>
  );
};

export default FeedbackSent;

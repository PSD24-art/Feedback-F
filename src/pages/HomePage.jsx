import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  BarChart,
  ShieldCheck,
  MessageSquare,
  Workflow,
  LineChart,
  Users,
  GraduationCap,
} from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-hidden mt-14 w-[100%] bg-amber-50 min-h-screen flex flex-col bg-gradient-to-b text-gray-800">
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-20">
        <motion.h1
          className="text-5xl sm:text-6xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to{" "}
          <span className="text-red-700 tracking-wide hover:cursor-pointer">
            Feedback_Guru
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Empowering institutions through smarter, AI-driven faculty feedback.
          Simplify how you collect, analyze, and enhance teaching performance —
          powered by AI insights.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700  transition-colors   "
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button className="border border-red-600 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors hover:cursor-pointer">
            Request Access
          </button>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="px-6 py-20 bg-white">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Why Choose Feedback_Guru?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              Icon: Brain,
              title: "AI Insights",
              desc: "Unlock powerful analytics with AI-driven performance reports.",
            },
            {
              Icon: BarChart,
              title: "Smart Dashboards",
              desc: "Visualize real-time faculty evaluation data in seconds.",
            },
            {
              Icon: ShieldCheck,
              title: "Secure Access",
              desc: "Role-based authentication ensures privacy and security.",
            },
            {
              Icon: MessageSquare,
              title: "Anonymous Feedback",
              desc: "Encourage honest opinions with complete anonymity.",
            },
          ].map(({ Icon, title, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="bg-amber-50 rounded-2xl p-6 shadow-md flex flex-col items-center text-center"
            >
              <Icon className="w-10 h-10 text-red-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI ANALYTICS SECTION */}
      <section className="bg-gradient-to-r from-red-50 via-white to-amber-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-red-700 mb-4">
              AI-Powered Performance Insights
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Our intelligent backend analyzes student feedback data, identifies
              teaching trends, and generates actionable insights for faculty
              development. AI ensures every evaluation is unbiased and
              data-driven.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Natural language processing for qualitative feedback</li>
              <li>Smart grading based on sentiment and trends</li>
              <li>Graphical dashboards for clarity and action</li>
            </ul>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/942/942799.png"
              alt="AI Illustration"
              className="w-64 sm:w-80 drop-shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="px-6 py-20 bg-white">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              Icon: Users,
              step: "1. Admin Setup",
              desc: "Admins add departments, faculties, and subjects.",
            },
            {
              Icon: MessageSquare,
              step: "2. Student Feedback",
              desc: "Students submit feedback anonymously.",
            },
            {
              Icon: LineChart,
              step: "3. AI Analysis",
              desc: "AI processes responses and generates insights.",
            },
            {
              Icon: GraduationCap,
              step: "4. Improvement",
              desc: "Faculty reviews results and enhances performance.",
            },
          ].map(({ Icon, step, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-amber-50 p-6 shadow text-center"
            >
              <Icon className="w-10 h-10 text-red-600 mb-3 mx-auto" />
              <h3 className="font-semibold text-lg mb-1">{step}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS / IMPACT SECTION */}
      <section className="bg-gradient-to-b from-amber-100 to-white py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">
          Transforming Institutional Feedback
        </h2>

        <motion.div
          className="flex gap-6 pb-4 overflow-x-auto scrollbar-hide px-4 "
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Testimonial Card 1 */}
          <div className="min-w-[300px] bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-gray-700 hover:shadow-xl transition-all duration-300">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Principal"
              className="w-16 h-16 rounded-full mb-4 border-2 border-red-500"
            />
            <p className="italic">
              “Feedback_Guru has completely modernized how we handle student
              feedback. Our faculty now gets real-time insights and students
              feel confident their opinions are truly anonymous.”
            </p>
            <p className="mt-4 text-red-700 font-semibold">
              — Principal, EduVision College
            </p>
          </div>

          {/* Testimonial Card 2 */}
          <div className="min-w-[300px] bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-gray-700 hover:shadow-xl transition-all duration-300">
            <img
              src="https://randomuser.me/api/portraits/men/52.jpg"
              alt="Faculty"
              className="w-16 h-16 rounded-full mb-4 border-2 border-red-500"
            />
            <p className="italic">
              “As a faculty member, I can now analyze feedback trends quickly
              and improve teaching methods effectively. The AI insights are
              game-changing.”
            </p>
            <p className="mt-4 text-red-700 font-semibold">
              — Prof. Rakesh Sharma, Computer Science
            </p>
          </div>

          {/* Testimonial Card 3 */}
          <div className="min-w-[300px] bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-gray-700 hover:shadow-xl transition-all duration-300">
            <img
              src="https://randomuser.me/api/portraits/women/65.jpg"
              alt="Student"
              className="w-16 h-16 rounded-full mb-4 border-2 border-red-500"
            />
            <p className="italic">
              “I love how easy it is to share feedback now. It’s anonymous,
              quick, and I feel my feedback actually makes a difference.”
            </p>
            <p className="mt-4 text-red-700 font-semibold">
              — Student, Final Year CSE
            </p>
          </div>

          {/* Testimonial Card 4 */}
          <div className="min-w-[300px] bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-gray-700 hover:shadow-xl transition-all duration-300">
            <img
              src="https://randomuser.me/api/portraits/men/11.jpg"
              alt="Admin"
              className="w-16 h-16 rounded-full mb-4 border-2 border-red-500"
            />
            <p className="italic">
              “From admin perspective, Feedback_Guru saves hours of manual data
              compilation. Everything is visualized neatly in dashboards.”
            </p>
            <p className="mt-4 text-red-700 font-semibold">
              — Admin, VisionTech University
            </p>
          </div>
        </motion.div>

        <p className="text-gray-500 text-sm mt-6">
          (More testimonials coming soon...)
        </p>
      </section>

      {/* CALL TO ACTION */}
      <motion.section
        className="bg-red-800 text-white py-16 pb-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Transform Faculty Evaluation?
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-gray-100">
          Join educational institutions embracing AI for smarter, transparent,
          and effective faculty assessments.
        </p>
        <button
          className="bg-white text-red-700 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
      </motion.section>
    </div>
  );
}

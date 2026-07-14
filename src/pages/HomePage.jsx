import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ".././App.css";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Brain,
  ClipboardCheck,
  GraduationCap,
  KeyRound,
  LineChart,
  Mail,
  MessageSquare,
  Phone,
  PlayCircle,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [sandboxText, setSandboxText] = useState("");
  const [sandboxResult, setSandboxResult] = useState(null);
  const [requestModalOpen, setRequestModalOpen] = useState(false);

  const features = useMemo(
    () => [
      {
        Icon: Brain,
        title: "AI Insights",
        desc: "Unlock powerful analytics with automated sentiment mapping and constructive critique rewrites.",
      },
      {
        Icon: BarChart3,
        title: "Smart Dashboards",
        desc: "Visualize real-time student evaluation data, switch terms, and focus subject levels instantly.",
      },
      {
        Icon: ShieldCheck,
        title: "Secure Access",
        desc: "Advanced role-based access secures faculty reports from unauthorized views and data manipulation.",
      },
      {
        Icon: MessageSquare,
        title: "Anonymous Feedback",
        desc: "Encourage highly candid opinions with privacy-preserving anonymized review collection.",
      },
    ],
    [],
  );

  const workflowSteps = useMemo(
    () => [
      {
        id: 1,
        title: "Admin Setup & Intranet Configuration",
        desc: "Configure subjects, department profiles, and target margins.",
        accent: "rose",
        previewTitle: "Registering Faculty Database",
        previewText:
          "Admins upload department details and configure subjects list directly in seconds.",
      },
      {
        id: 2,
        title: "Anonymous Student Feedback Entry",
        desc: "Students input candid feedback anonymously on active terms.",
        accent: "amber",
        previewTitle: "Zero-Identity Submission Link",
        previewText:
          "Students submit evaluations through authorization codes that remain private and secure.",
      },
      {
        id: 3,
        title: "AI Analysis & Constructive Re-wording",
        desc: "AI engine sanitizes tone and processes criteria levels instantly.",
        accent: "emerald",
        previewTitle: "Constructive Critiquing Logic",
        previewText:
          "Harsh wording is rephrased into actionable pedagogical goals using custom NLP patterns.",
      },
      {
        id: 4,
        title: "Pedagogical Improvement & Syncing",
        desc: "Faculties analyze score indexes and improve teaching patterns.",
        accent: "blue",
        previewTitle: "Intranet Synchronization Logs",
        previewText:
          "Department heads export CSV logs and sync dashboard insights directly to ERP systems.",
      },
    ],
    [],
  );

  const testimonials = useMemo(
    () => [
      {
        quote:
          "Feedback_Guru has completely modernized how we handle student feedback. Our faculty now gets real-time insights and students feel confident their opinions are truly anonymous.",
        name: "Elena Rostova",
        role: "Director of Academics",
      },
      {
        quote:
          "As a faculty member, I can now analyze feedback trends quickly and improve teaching methods effectively. The AI insights are game-changing.",
        name: "Prof. Marcus Miller",
        role: "CS Department Dean",
      },
      {
        quote:
          "I love how easy it is to share feedback now. It's anonymous, quick, and I feel my feedback actually makes a difference.",
        name: "Aditya Shrivastav",
        role: "Student Council Head",
      },
      {
        quote:
          "From admin perspective, Feedback_Guru saves hours of manual data compilation. Everything is visualized neatly in dashboards.",
        name: "Kunal Patil",
        role: "System Administrator",
      },
    ],
    [],
  );

  const onboardingSteps = useMemo(
    () => [
      {
        title: "1. Submit Request",
        desc: "Institutional representative clicks 'Request Access' and fills a verification form with basic details.",
        icon: <Mail className="h-5 w-5" />,
        accent: "brand",
      },
      {
        title: "2. Verification",
        desc: "Our team reviews the request and contacts the institute to verify authenticity.",
        icon: <Phone className="h-5 w-5" />,
        accent: "amber",
      },
      {
        title: "3. Approval",
        desc: "Once confirmed, your institution's admin is officially approved and credentials are shared.",
        icon: <ClipboardCheck className="h-5 w-5" />,
        accent: "emerald",
      },
      {
        title: "4. Admin Access Granted",
        desc: "The approved admin can now log in, add faculties, subjects, and start collecting AI-powered feedback.",
        icon: <KeyRound className="h-5 w-5" />,
        accent: "blue",
      },
    ],
    [],
  );

  const handleSandboxSubmit = () => {
    const text = sandboxText.trim();
    if (!text) {
      setSandboxResult({
        badge: "Neutral",
        score: "3.5 / 5.0",
        tone: "Practical / Neutral",
        reworded:
          "Student appreciates the course structure, though pacing should become more practical for clearer doubt resolution.",
      });
      return;
    }

    const normalized = text.toLowerCase();
    if (
      normalized.includes("great") ||
      normalized.includes("incredible") ||
      normalized.includes("awesome")
    ) {
      setSandboxResult({
        badge: "Positive",
        score: "4.8 / 5.0",
        tone: "Constructive & Polite",
        reworded: `"${text}"\n\nAI Metrics Map: [Communication: Exceptional, Engagement: Satisfactory]`,
      });
    } else if (
      normalized.includes("unapproachable") ||
      normalized.includes("did not") ||
      normalized.includes("dry")
    ) {
      setSandboxResult({
        badge: "Critical",
        score: "2.2 / 5.0",
        tone: "Skeptical & Urgent",
        reworded:
          "The faculty may benefit from introducing slower structural examples during problem-solving sessions.",
      });
    } else {
      setSandboxResult({
        badge: "Mixed Sentiment",
        score: "3.5 / 5.0",
        tone: "Practical / Neutral",
        reworded:
          "Student appreciates general slide preparation, though practical lab pacing should be adjusted to resolve doubts sooner.",
      });
    }
  };

  const activePreview =
    workflowSteps.find((step) => step.id === activeStep) ?? workflowSteps[0];

  return (
    <div
      className={`min-h-screen flex flex-col overflow-x-hidden transition-colors duration-300 bg-slate-50 text-slate-800`}
    >
      <div
        id="toast-container"
        className="pointer-events-none fixed right-5 top-5 z-[100] flex flex-col gap-3"
      />

      <div className="flex-1 flex flex-col">
        <header
          className={`sticky top-0 z-50 border-b backdrop-blur-md border-slate-100 bg-white/80`}
        >
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div
              className="flex cursor-pointer items-center gap-3"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="rounded-xl bg-rose-600 p-2 text-white shadow-lg shadow-rose-500/20">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h1 className="logo-font text-xl font-bold tracking-wide md:text-2xl">
                  feedback_guru
                </h1>
                <p className="text-[9px] font-bold uppercase tracking-widest text-rose-600">
                  AI Faculty Analytics
                </p>
              </div>
            </div>

            <nav className="hidden items-center gap-8 md:flex">
              <a
                href="#why-choose"
                className={`text-xs font-semibold uppercase tracking-wider transition-colors text-slate-600 hover:text-rose-600`}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className={`text-xs font-semibold uppercase tracking-wider transition-colors text-slate-600 hover:text-rose-600`}
              >
                How it Works
              </a>
              <a
                href="#testimonials"
                className={`text-xs font-semibold uppercase tracking-wider transition-colors text-slate-600 hover:text-rose-600`}
              >
                Testimonials
              </a>
              <a
                href="#onboarding"
                className={`text-xs font-semibold uppercase tracking-wider transition-colors text-slate-600 hover:text-rose-600`}
              >
                Onboard
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className={`hidden items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all sm:inline-flex bg-slate-100 text-slate-800 hover:bg-slate-200`}
              >
                <ArrowRight className="h-4 w-4 text-rose-600" /> Log In
              </button>
              <button
                onClick={() => navigate("/institution-form")}
                className="rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-rose-500/20 transition-all hover:scale-[1.02] hover:bg-rose-700"
              >
                Request Access
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <section className="relative overflow-hidden py-16 lg:py-24">
            <div className="gradient-glow pointer-events-none absolute inset-0" />
            <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
              <div className="space-y-6 text-center lg:col-span-7 lg:text-left">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold border-rose-100 bg-rose-50 text-rose-700`}
                >
                  <span className="h-2 w-2 animate-ping rounded-full bg-rose-500" />{" "}
                  Smart Evaluation Redefined
                </span>

                <h2
                  className={`text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl text-slate-900`}
                >
                  Welcome to{" "}
                  <span className="bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent">
                    Feedback_Guru
                  </span>
                </h2>

                <p
                  className={`mx-auto max-w-2xl text-base leading-relaxed sm:text-lg lg:mx-0 text-slate-600`}
                >
                  Empowering academic institutions through smarter, AI-driven
                  faculty feedback evaluation. Simplify how you collect, filter,
                  analyze, and enhance teaching performance — powered entirely
                  by actionable real-time insights.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row lg:justify-start">
                  <button
                    onClick={() => navigate("/demo")}
                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-rose-600 px-8 py-4 text-sm font-extrabold text-white shadow-xl shadow-rose-500/20 transition-all hover:-translate-y-0.5 hover:bg-rose-700 sm:w-auto"
                  >
                    <PlayCircle className="h-5 w-5" /> Launch Demo Workspace
                  </button>
                  <button
                    onClick={() => navigate("/institution-form")}
                    className={`flex w-full items-center justify-center gap-2 rounded-2xl border px-8 py-4 text-sm font-bold shadow-sm transition-all hover:-translate-y-0.5 sm:w-auto border-slate-200 bg-white text-slate-700 hover:bg-slate-50`}
                  >
                    <Sparkles className="h-4 w-4" /> Request Institutional
                    Access
                  </button>
                </div>

                <div
                  className={`mx-auto grid max-w-lg grid-cols-3 gap-6 border-t pt-8 text-center lg:mx-0 border-slate-200`}
                >
                  <div>
                    <h4 className="text-2xl font-extrabold text-rose-600 sm:text-3xl">
                      98%
                    </h4>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Accuracy Score
                    </p>
                  </div>
                  <div>
                    <h4
                      className={`text-2xl font-extrabold sm:text-3xl text-slate-900`}
                    >
                      40+
                    </h4>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Joined Campuses
                    </p>
                  </div>
                  <div>
                    <h4
                      className={`text-2xl font-extrabold sm:text-3xl text-slate-900`}
                    >
                      500k
                    </h4>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Processed Reviews
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div
                  className={`relative space-y-4 rounded-3xl border p-6 shadow-2xl border-slate-100 bg-white`}
                >
                  <div>
                    <h3
                      className={`flex items-center gap-2 text-base font-bold text-slate-900`}
                    >
                      <Brain className="h-4 w-4 text-rose-500" /> Try Our
                      Feedback Parser
                    </h3>
                    <p className="text-xs text-slate-400">
                      Type or select simulated student comments to trigger
                      instant analytics.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 py-1">
                    <button
                      onClick={() => {
                        setSandboxText(
                          "The lecture explanations are incredible but she speaks too fast in labs.",
                        );
                        setSandboxResult(null);
                      }}
                      className={`rounded-lg px-2.5 py-1 text-[10px] font-semibold transition-all bg-slate-100 text-slate-600 hover:bg-rose-50`}
                    >
                      Sample 1 (Mixed)
                    </button>
                    <button
                      onClick={() => {
                        setSandboxText(
                          "Very unapproachable. He did not clear my database design doubts.",
                        );
                        setSandboxResult(null);
                      }}
                      className={`rounded-lg px-2.5 py-1 text-[10px] font-semibold transition-all bg-slate-100 text-slate-600 hover:bg-rose-50`}
                    >
                      Sample 2 (Critical)
                    </button>
                    <button
                      onClick={() => {
                        setSandboxText(
                          "Awesome slides and timely assignments. Best class ever!",
                        );
                        setSandboxResult(null);
                      }}
                      className={`rounded-lg px-2.5 py-1 text-[10px] font-semibold transition-all bg-slate-100 text-slate-600 hover:bg-rose-50`}
                    >
                      Sample 3 (Positive)
                    </button>
                  </div>

                  <textarea
                    rows="3"
                    value={sandboxText}
                    onChange={(event) => setSandboxText(event.target.value)}
                    className={`w-full resize-none rounded-xl border px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 border-slate-200 bg-slate-50 text-slate-800`}
                    placeholder="Enter student's descriptive feedback here..."
                  />

                  <button
                    onClick={handleSandboxSubmit}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-rose-700"
                  >
                    <Sparkles className="h-4 w-4" /> Process Feedback Insight
                  </button>

                  {sandboxResult ? (
                    <div
                      className={`space-y-3 rounded-xl border p-4 transition-all border-rose-100 bg-rose-50/30`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`flex items-center gap-1.5 text-[10px] font-bold uppercase text-rose-600`}
                        >
                          <Sparkles className="h-3.5 w-3.5 animate-pulse" />{" "}
                          ANALYSIS COMPLETED
                        </span>
                        <span
                          className={`rounded px-2 py-0.5 text-[9px] font-bold uppercase ${sandboxResult.badge === "Positive" ? "bg-emerald-100 text-emerald-800" : sandboxResult.badge === "Critical" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"}`}
                        >
                          {sandboxResult.badge}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div
                          className={`space-y-1 rounded-lg border p-2.5 border-slate-100 bg-white`}
                        >
                          <span className="block text-[9px] font-bold uppercase text-slate-400">
                            Sentiment score
                          </span>
                          <span className={`font-bold text-slate-800`}>
                            {sandboxResult.score}
                          </span>
                        </div>
                        <div
                          className={`space-y-1 rounded-lg border p-2.5 border-slate-100 bg-white`}
                        >
                          <span className="block text-[9px] font-bold uppercase text-slate-400">
                            Constructive tone
                          </span>
                          <span className={`font-bold text-slate-800`}>
                            {sandboxResult.tone}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`rounded-lg border p-3 text-xs border-slate-100 bg-white`}
                      >
                        <span
                          className={`block text-[9px] font-bold uppercase text-rose-600`}
                        >
                          AI re-worded critique for development
                        </span>
                        <p className={`mt-1 font-medium italic text-slate-600`}>
                          {sandboxResult.reworded}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          <section
            id="why-choose"
            className={`py-20 transition-colors bg-white`}
          >
            <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl space-y-4 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-rose-600">
                  Platform Core Benefits
                </span>
                <h2
                  className={`text-3xl font-extrabold sm:text-4xl text-slate-900`}
                >
                  Why Choose Feedback_Guru?
                </h2>
                <p className={`text-sm sm:text-base text-slate-500`}>
                  Say goodbye to messy spreadsheets. Build a healthy institution
                  culture with our robust AI suite designed around feedback
                  dynamics.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {features.map(({ Icon, title, desc }, index) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className={`flex h-[260px] flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-rose-500 hover:ring-4 hover:ring-rose-500/10 border-slate-100 bg-slate-50`}
                  >
                    <div className="space-y-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl shadow-inner bg-rose-50 text-rose-600`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className={`text-lg font-bold text-slate-900`}>
                        {title}
                      </h3>
                      <p className={`text-xs leading-relaxed text-slate-500`}>
                        {desc}
                      </p>
                    </div>
                    <span
                      className={`cursor-pointer text-[10px] font-bold text-rose-600`}
                    >
                      Learn details{" "}
                      <ArrowRight className="ml-1 inline h-3 w-3" />
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="how-it-works"
            className={`py-20 transition-colors bg-slate-50`}
          >
            <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl space-y-4 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-rose-600">
                  Simple Workflow
                </span>
                <h2
                  className={`text-3xl font-extrabold sm:text-4xl text-slate-900`}
                >
                  Seamless Institutional Loop
                </h2>
                <p className={`text-sm sm:text-base text-slate-500`}>
                  We bridge the communication gap between students,
                  administration, and faculty using 4 simplified phases.
                </p>
              </div>

              <div className="grid items-center gap-8 lg:grid-cols-12">
                <div className="space-y-3 lg:col-span-5">
                  {workflowSteps.map((step) => (
                    <button
                      key={step.id}
                      onClick={() => setActiveStep(step.id)}
                      className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-200 ${activeStep === step.id ? "border-rose-500 bg-white shadow-sm ring-2 ring-rose-500/10   " : `border-slate-100 hover:border-slate-200   bg-white`}`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${activeStep === step.id ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-600"}`}
                      >
                        {step.id}
                      </span>
                      <div>
                        <h4 className={`text-sm font-bold text-slate-800`}>
                          {step.title}
                        </h4>
                        <p className={`mt-1 text-xs text-slate-400`}>
                          {step.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                <div
                  className={`space-y-6 rounded-3xl border p-8 shadow-xl lg:col-span-7 border-slate-100 bg-white`}
                >
                  <div
                    className={`flex items-center justify-between border-b pb-4 border-slate-100`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-rose-500" />
                      <span className="h-3 w-3 rounded-full bg-amber-500" />
                      <span className="h-3 w-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      Phase {activeStep} Preview
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div
                      className={`flex items-center gap-3 rounded-xl border p-4 ${activeStep === 1 ? "border-rose-100 bg-rose-50 text-rose-900   " : activeStep === 2 ? "border-amber-100 bg-amber-50 text-amber-900   " : activeStep === 3 ? "border-emerald-100 bg-emerald-50 text-emerald-900   " : "border-blue-100 bg-blue-50 text-blue-900   "}`}
                    >
                      <SlidersHorizontal className="h-5 w-5 text-rose-600" />
                      <div>
                        <h5 className="text-sm font-bold">
                          {activePreview.previewTitle}
                        </h5>
                        <p
                          className={`text-xs ${activeStep === 1 ? "text-rose-700/80 " : activeStep === 2 ? "text-amber-700/80 " : activeStep === 3 ? "text-emerald-700/80 " : "text-blue-700/80 "}`}
                        >
                          {activePreview.previewText}
                        </p>
                      </div>
                    </div>
                    <div className={`rounded-xl p-4 bg-slate-50`}>
                      {activeStep === 1 ? (
                        <div className="space-y-2">
                          <div className="h-2 w-1/3 rounded bg-slate-200 " />
                          <div className="h-2.5 w-2/3 rounded bg-rose-200 " />
                          <div className="h-2 w-1/2 rounded bg-slate-200 " />
                        </div>
                      ) : activeStep === 2 ? (
                        <div className="rounded-xl border border-dashed border-slate-200 py-6 text-center text-xs text-slate-400 ">
                          <Users className="mb-2 ml-1 h-5 w-5 text-slate-300" />
                          Anonymity Shield Layer Active
                        </div>
                      ) : activeStep === 3 ? (
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="rounded-xl border border-red-150 bg-red-50 p-3  ">
                            <span className="block font-bold text-red-700">
                              Raw Student Input
                            </span>
                            <span className="mt-1 block italic font-medium">
                              "Extremely boring slides, makes me sleep."
                            </span>
                          </div>
                          <div className="rounded-xl border border-emerald-150 bg-emerald-50 p-3  ">
                            <span className="block font-bold text-emerald-700">
                              AI Refined Output
                            </span>
                            <span className="mt-1 block italic font-medium">
                              "Introduce visual active slides or student-led
                              sessions."
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-xs font-semibold ">
                          <span>Stanford_Computer_Science_S26.csv</span>
                          <button className="rounded-lg bg-rose-600 px-2.5 py-1 text-[10px] text-white">
                            Export
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="testimonials"
            className={`py-20 transition-colors bg-white`}
          >
            <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl space-y-4 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-rose-600">
                  Trusted Feedback Loops
                </span>
                <h2
                  className={`text-3xl font-extrabold sm:text-4xl text-slate-900`}
                >
                  Transforming Institutional Performance
                </h2>
                <p className={`text-sm sm:text-base text-slate-500`}>
                  See how campuses and department coordinators achieve
                  qualitative upgrades with our modern portal.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {testimonials.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className={`flex flex-col justify-between rounded-2xl border p-6 transition-all hover:scale-[1.01] border-slate-100 bg-slate-50`}
                  >
                    <p
                      className={`text-xs leading-relaxed italic md:text-sm text-slate-600`}
                    >
                      “{item.quote}”
                    </p>
                    <div
                      className={`mt-6 flex items-center gap-3 border-t pt-6 border-slate-200/50`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 text-xs font-extrabold text-white">
                        {item.name
                          .split(" ")
                          .slice(-1)[0]
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div>
                        <h5 className={`text-xs font-bold text-slate-900`}>
                          {item.name}
                        </h5>
                        <p className={`text-[10px] text-slate-400`}>
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="onboarding"
            className={`py-20 transition-colors bg-slate-50`}
          >
            <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl space-y-4 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-rose-600">
                  Quick Start Onboarding
                </span>
                <h2
                  className={`text-3xl font-extrabold sm:text-4xl text-slate-900`}
                >
                  How to Get Access
                </h2>
                <p className={`text-sm sm:text-base text-slate-500`}>
                  Institutions can easily onboard with Feedback_Guru. Here’s how
                  your college or university can get started:
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {onboardingSteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className={`rounded-2xl border p-6 text-center shadow-sm transition-all hover:scale-[1.02] border-slate-100 bg-white`}
                  >
                    <div
                      className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full text-xl ${step.accent === "brand" ? "bg-rose-50 text-rose-600  " : step.accent === "amber" ? "bg-amber-50 text-amber-600  " : step.accent === "emerald" ? "bg-emerald-50 text-emerald-600  " : "bg-blue-50 text-blue-600  "}`}
                    >
                      {step.icon}
                    </div>
                    <div className="mt-4">
                      <h4 className={`text-sm font-bold text-slate-900`}>
                        {step.title}
                      </h4>
                      <p
                        className={`mt-2 text-xs leading-relaxed text-slate-500`}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4 text-center">
                <button
                  onClick={() => navigate("/institution-form")}
                  className="rounded-xl bg-rose-600 px-8 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-rose-500/20 transition-all hover:scale-[1.02] hover:bg-rose-700"
                >
                  Get started now
                </button>
              </div>
            </div>
          </section>
        </main>

        <section className="bg-gradient-to-r from-rose-900 via-rose-800 to-rose-950 py-16 text-white">
          <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to Transform Faculty Evaluation?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xs text-rose-200 sm:text-sm">
              Join forward-thinking colleges and universities embracing modern
              AI-driven solutions for smarter, transparent, and effective
              faculty assessments.
            </p>
            <div className="pt-6">
              <button
                onClick={() => navigate("/institution-form")}
                className="rounded-2xl bg-white px-8 py-4 text-sm font-extrabold text-rose-900 shadow-xl shadow-white/10 transition-all hover:-translate-y-0.5 hover:bg-rose-50"
              >
                Request Institutional Access
              </button>
            </div>
          </div>
        </section>

        <footer
          className={`border-t py-10 border-slate-200 bg-slate-900 text-slate-400`}
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-xs sm:flex-row sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-rose-500" />
              <span className="logo-font text-sm font-semibold italic text-white">
                feedback_guru
              </span>
            </div>
            <p>Empowering Institutions through Smarter Feedback</p>
            <p>© 2026 Feedback_Guru. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {requestModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div
            className={`w-full max-w-lg overflow-hidden rounded-3xl border shadow-2xl border-slate-200 bg-white`}
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-rose-800 to-rose-700 px-6 py-5 text-white">
              <h3 className="flex items-center gap-2 text-base font-bold sm:text-lg">
                <ClipboardCheck className="h-5 w-5" /> Institutional
                Registration
              </h3>
              <button
                onClick={() => setRequestModalOpen(false)}
                className="rounded-lg p-1.5 text-white/80 transition-all hover:bg-white/10 hover:text-white"
              >
                <span className="text-lg">✕</span>
              </button>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setRequestModalOpen(false);
              }}
              className="space-y-4 p-6"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    className={`mb-1 block text-xs font-bold text-slate-500`}
                  >
                    University Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stanford University"
                    className={`w-full rounded-xl border px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 border-slate-200 bg-white text-slate-800`}
                  />
                </div>
                <div>
                  <label
                    className={`mb-1 block text-xs font-bold text-slate-500`}
                  >
                    Proposed Admin Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Jane Smith"
                    className={`w-full rounded-xl border px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 border-slate-200 bg-white text-slate-800`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    className={`mb-1 block text-xs font-bold text-slate-500`}
                  >
                    Official Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. admin@stanford.edu"
                    className={`w-full rounded-xl border px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 border-slate-200 bg-white text-slate-800`}
                  />
                </div>
                <div>
                  <label
                    className={`mb-1 block text-xs font-bold text-slate-500`}
                  >
                    Estimated Campus Size
                  </label>
                  <select
                    className={`w-full rounded-xl border px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 border-slate-200 bg-white text-slate-800`}
                  >
                    <option value="small">Under 1,000 Students</option>
                    <option value="medium" selected>
                      1,000 - 5,000 Students
                    </option>
                    <option value="large">5,000+ Students</option>
                  </select>
                </div>
              </div>
              <div
                className={`flex gap-3 rounded-xl border p-3.5 text-xs border-rose-100 bg-rose-50`}
              >
                <BadgeCheck className="mt-0.5 h-4 w-4 text-rose-600" />
                <p className={`leading-relaxed font-semibold text-rose-900`}>
                  Upon submission, our verification panel reviews credentials
                  within 24 hours to transition your sandbox to production.
                </p>
              </div>
              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 ">
                <button
                  type="button"
                  onClick={() => setRequestModalOpen(false)}
                  className={`rounded-xl px-5 py-2 text-xs font-bold transition-all text-slate-500 hover:bg-slate-100`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-rose-600 px-6 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-rose-500/20 transition-all hover:bg-rose-700"
                >
                  Request Credentials Setup
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

import { useMemo, useState } from "react";
import {
  BarChart3,
  BookOpen,
  ChartNoAxesCombined,
  GraduationCap,
  MessageSquare,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

const faculty = [
  { name: "Prof. K. K. Mohod", initials: "KM", department: "Computer Science", rating: "4.3", responses: 32, target: 40 },
  { name: "Prof. A. A. Chinchamalatpure", initials: "AC", department: "Computer Science", rating: "4.6", responses: 38, target: 40 },
  { name: "Prof. V. S. Ukey", initials: "VU", department: "Information Technology", rating: "4.1", responses: 28, target: 40 },
];

const criteria = [
  ["Communication", 88],
  ["Subject knowledge", 92],
  ["Class engagement", 81],
  ["Punctuality", 86],
];

const DemoWorkspace = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = faculty[selectedIndex];
  const rate = Math.round((selected.responses / selected.target) * 100);
  const subjectScores = useMemo(
    () => [
      ["Operating Systems", 86],
      ["Computer Networks", 78],
      ["Database Systems", 92],
      ["Cloud Computing", 83],
    ],
    [],
  );

  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top_right,_rgba(244,63,94,0.12),_transparent_34%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <section className="panel-card flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-700 to-rose-500 text-white shadow-lg shadow-rose-500/25">
              <GraduationCap className="h-7 w-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600">Interactive preview</p>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Demo data</span>
              </div>
              <h1 className="mt-1 text-2xl font-extrabold text-slate-900">Analytics Workspace</h1>
              <p className="mt-1 text-sm text-slate-500">Explore how feedback insights look before creating an account.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">Summer Term 2026</span>
            <span className="rounded-xl border border-rose-100 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">Sample institution</span>
          </div>
        </section>

        <section className="panel-card flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-15 w-15 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-600 text-lg font-extrabold text-white">{selected.initials}</div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900">{selected.name}</h2>
                <span className="flex items-center gap-1 rounded-lg border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {selected.rating}</span>
              </div>
              <p className="mt-1 text-sm text-slate-500">{selected.department} Department · faculty@demo.edu</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-[conic-gradient(#e11d48_calc(var(--rate)*1%),#fecdd3_0)]" style={{ "--rate": rate }}>
              <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-50 text-[11px] font-extrabold text-slate-700">{rate}%</div>
            </div>
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Response rate</p><p className="mt-1 text-sm font-extrabold text-slate-800">{selected.responses} / {selected.target} feedbacks</p></div>
          </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-[1fr_300px]">
          <div className="space-y-5">
            <div className="grid gap-5 lg:grid-cols-2">
              <MetricCard icon={ChartNoAxesCombined} title="Subject Rating Index" badge="Comparison">
                <div className="space-y-3 pt-2">{subjectScores.map(([label, score]) => <Bar key={label} label={label} value={score} />)}</div>
              </MetricCard>
              <MetricCard icon={BarChart3} title="Criteria Performance" badge="Scores (0–5)">
                <div className="space-y-3 pt-2">{criteria.map(([label, score]) => <Bar key={label} label={label} value={score} rose />)}</div>
              </MetricCard>
            </div>

            <section className="panel-card p-5 sm:p-6">
              <div className="mb-4 flex items-start justify-between border-b border-slate-100 pb-4">
                <div><h3 className="flex items-center gap-2 text-base font-extrabold text-slate-800"><MessageSquare className="h-4 w-4 text-amber-500" /> Student Feedback Log</h3><p className="mt-1 text-xs text-slate-400">Illustrative anonymised student comments</p></div>
                <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">LIVE DEMO</span>
              </div>
              <div className="space-y-3">
                {["Explains complex topics with practical examples and gives useful revision material.", "The pace is engaging and questions are addressed clearly during class.", "More hands-on sessions would make the subject even stronger."].map((comment, index) => <div className="rounded-xl border border-slate-100 bg-slate-50 p-3" key={comment}><p className="text-sm leading-relaxed text-slate-600">“{comment}”</p><p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Anonymous student · {index + 1} hour ago</p></div>)}
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            <section className="panel-card p-5"><div className="mb-4 flex items-center gap-2"><Users className="h-4 w-4 text-rose-600" /><h3 className="font-extrabold text-slate-800">Faculty Directory</h3></div><div className="space-y-2">{faculty.map((person, index) => <button key={person.name} onClick={() => setSelectedIndex(index)} className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${selectedIndex === index ? "border-rose-200 bg-rose-50" : "border-slate-100 hover:border-rose-200 hover:bg-slate-50"}`}><span className={`grid h-9 w-9 place-items-center rounded-xl text-xs font-extrabold ${selectedIndex === index ? "bg-rose-700 text-white" : "bg-slate-100 text-slate-600"}`}>{person.initials}</span><span><span className="block text-xs font-bold text-slate-800">{person.name}</span><span className="mt-0.5 block text-[10px] text-slate-500">{person.department}</span></span></button>)}</div></section>
            <section className="rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50 to-white p-5"><Sparkles className="h-5 w-5 text-rose-600" /><h3 className="mt-3 font-extrabold text-slate-800">AI Summary Preview</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">Teaching clarity and subject knowledge are the strongest signals. Focus on adding a few more practical exercises to lift engagement.</p></section>
            <section className="panel-card p-5"><div className="mb-3 flex items-center gap-2"><BookOpen className="h-4 w-4 text-rose-600" /><h3 className="font-extrabold text-slate-800">Rating Spread</h3></div><div className="flex items-center gap-4"><div className="h-20 w-20 rounded-full bg-[conic-gradient(#e11d48_0_43%,#fb7185_43%_72%,#fda4af_72%_87%,#fecdd3_87%)]" /><div className="space-y-1 text-xs text-slate-500"><p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-rose-600" />Excellent 43%</p><p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-rose-400" />Good 29%</p><p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-rose-200" />Average 15%</p></div></div></section>
          </aside>
        </div>
      </div>
    </div>
  );
};

function MetricCard({ icon: Icon, title, badge, children }) {
  return <section className="panel-card min-h-[300px] p-5"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 text-sm font-extrabold text-slate-800"><Icon className="h-4 w-4 text-rose-600" />{title}</h3><span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">{badge}</span></div>{children}</section>;
}

function Bar({ label, value, rose = false }) {
  return <div><div className="mb-1.5 flex justify-between text-xs"><span className="font-semibold text-slate-600">{label}</span><span className="font-bold text-slate-700">{(value / 20).toFixed(1)} / 5</span></div><div className="h-2.5 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${rose ? "bg-gradient-to-r from-rose-700 to-rose-400" : "bg-gradient-to-r from-slate-700 to-rose-500"}`} style={{ width: `${value}%` }} /></div></div>;
}

export default DemoWorkspace;

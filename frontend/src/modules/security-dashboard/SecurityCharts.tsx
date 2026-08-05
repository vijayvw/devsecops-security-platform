import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import type { SecuritySummary } from "../../api/security";

interface Props {
  summary: SecuritySummary;
}

const COLORS = [
  "#ef4444",
  "#f97316",
  "#facc15",
  "#22c55e",
];

export default function SecurityCharts({
  summary,
}: Props) {
  const severityData = [
    {
      name: "Critical",
      value: summary.findings.critical,
    },
    {
      name: "High",
      value: summary.findings.high,
    },
    {
      name: "Medium",
      value: summary.findings.medium,
    },
    {
      name: "Low",
      value: summary.findings.low,
    },
  ];

  const toolData = [
    {
      tool: "Gitleaks",
      Passed: summary.tools.gitleaks.passed,
      Failed: summary.tools.gitleaks.failed,
    },
    {
      tool: "Trivy",
      Passed: summary.tools.trivy.passed,
      Failed: summary.tools.trivy.failed,
    },
    {
      tool: "Semgrep",
      Passed: summary.tools.semgrep.passed,
      Failed: summary.tools.semgrep.failed,
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">

      {/* Severity */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-blue-500/10">

        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">
            Vulnerability Distribution
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Security findings grouped by severity.
          </p>
        </div>

        <ResponsiveContainer
          width="100%"
          height={380}
        >
          <PieChart>

  <text
    x="50%"
    y="46%"
    textAnchor="middle"
    fill="#ffffff"
    fontSize="34"
    fontWeight="bold"
  >
    {severityData.reduce(
      (sum, item) => sum + item.value,
      0
    )}
  </text>

  <text
    x="50%"
    y="55%"
    textAnchor="middle"
    fill="#94a3b8"
    fontSize="13"
  >
    Findings
  </text>

            <Pie
              isAnimationActive
              animationDuration={1200}
              data={severityData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
              }
            >
              {severityData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
  background: "#020617",
  border: "1px solid #475569",
  borderRadius: 16,
  color: "#fff",
  boxShadow:
    "0 20px 40px rgba(0,0,0,.45)",
}}
            />

            <Legend
  wrapperStyle={{
    color: "#cbd5e1",
    paddingTop: 20,
  }}
/>

          </PieChart>
        </ResponsiveContainer>

      </div>

      {/* Tool Results */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-blue-500/10">

        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">
            Scanner Performance
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Passed vs failed scans for each tool.
          </p>
        </div>

        <ResponsiveContainer
          width="100%"
          height={340}
        >
          <BarChart
            data={toolData}
            barGap={8}
          >
            <CartesianGrid
  stroke="#334155"
  strokeDasharray="4 4"
  opacity={0.35}
/>

            <XAxis
              dataKey="tool"
              stroke="#94a3b8"
            />

            <YAxis stroke="#94a3b8" />

            <Tooltip
              contentStyle={{
  background: "#020617",
  border: "1px solid #475569",
  borderRadius: 16,
  color: "#fff",
  boxShadow:
    "0 20px 40px rgba(0,0,0,.45)",
}}
            />

            <Legend />

            <Bar
              dataKey="Passed"
              fill="#22c55e"
              radius={[8, 8, 0, 0]}
              animationDuration={1200}
            />

            <Bar
              dataKey="Failed"
              fill="#ef4444"
              radius={[8, 8, 0, 0]}
              animationDuration={1200}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}
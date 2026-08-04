import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
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
  "#dc2626",
  "#ea580c",
  "#f59e0b",
  "#16a34a",
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
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border bg-white p-6 shadow">
        <h2 className="mb-6 text-xl font-semibold">
          Vulnerability Severity
        </h2>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <PieChart>
            <Pie
              data={severityData}
              dataKey="value"
              outerRadius={110}
              label
            >
              {severityData.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow">
        <h2 className="mb-6 text-xl font-semibold">
          Scan Results by Tool
        </h2>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart data={toolData}>
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="tool" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="Passed" />

            <Bar dataKey="Failed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

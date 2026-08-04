interface Props {
  tool: string;
}

const colors: Record<string, string> = {
  TRIVY: "bg-blue-100 text-blue-700",
  GITLEAKS: "bg-red-100 text-red-700",
  SEMGREP: "bg-green-100 text-green-700",
  CHECKOV: "bg-purple-100 text-purple-700",
  DEPENDENCY_CHECK: "bg-orange-100 text-orange-700",
};

export default function ToolBadge({
  tool,
}: Props) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[tool] ??
        "bg-gray-100 text-gray-700"
      }`}
    >
      {tool.replaceAll("_", " ")}
    </span>
  );
}
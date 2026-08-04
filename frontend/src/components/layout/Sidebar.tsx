import { NavLink } from "react-router-dom";

const items = [
  { to: "/", label: "📊 Dashboard" },
  { to: "/applications", label: "📦 Applications" },
  { to: "/pipelines", label: "🚀 Pipelines" },
  { to: "/pipeline-runs", label: "🏃 Pipeline Runs" },
  { to: "/security-scans", label: "🔍 Security Scans" },
  { to: "/findings", label: "🛡 Findings" },
  { to: "/reports", label: "📈 Reports" },
  { to: "/infrastructure", label: "☁ Infrastructure" },
  { to: "/settings", label: "⚙ Settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-slate-900 text-white">
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-xl font-bold">
          DevSecOps
        </h1>

        <p className="text-sm text-slate-400">
          Security Platform
        </p>
      </div>

      <nav className="p-4">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `mb-2 block rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
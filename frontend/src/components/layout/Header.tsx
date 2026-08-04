export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          DevSecOps Security Platform
        </h2>

        <p className="text-sm text-slate-500">
          Continuous Security Dashboard
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          ● Healthy
        </div>

        <div className="h-10 w-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-semibold">
          V
        </div>
      </div>
    </header>
  );
}
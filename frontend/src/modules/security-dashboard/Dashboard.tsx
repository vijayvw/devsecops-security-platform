import OverviewCards from "./OverviewCards";

export default function Dashboard() {
  return (
    <div className="space-y-8 p-8">
      <h1 className="text-4xl font-bold">
        DevSecOps Security Dashboard
      </h1>

      <OverviewCards />
    </div>
  );
}
import { useQuery } from "@tanstack/react-query";
import { getReportsSummary } from "../../api/reports";

export default function ReportsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["reports-summary"],
    queryFn: getReportsSummary,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data.</div>;
  }

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        Reports
      </h1>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>

    </div>
  );
}

interface Props {
  status: string;
}

const colors: Record<string, string> = {
  SUCCESS: "bg-green-100 text-green-700",
  FAILED: "bg-red-100 text-red-700",
  RUNNING: "bg-yellow-100 text-yellow-700",
  PENDING: "bg-blue-100 text-blue-700",
  CANCELLED: "bg-gray-200 text-gray-700",
};

export default function StatusBadge({
  status,
}: Props) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[status] ??
        "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}
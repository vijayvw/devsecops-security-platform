import type { Application } from "../../api/applications";

interface Props {
  application: Application;
  onClick: () => void;
}

export default function ApplicationCard({
  application,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <h3 className="text-xl font-bold">
        {application.name}
      </h3>

      <p className="mt-2 text-sm text-gray-600">
        {application.description}
      </p>

      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
          {application.language}
        </span>

        <span className="text-gray-500">
          {application.defaultBranch}
        </span>
      </div>
    </button>
  );
}
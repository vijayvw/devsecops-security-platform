import type { Pipeline } from "../../api/pipelines";

interface Props {
  pipeline: Pipeline;
  onClick: () => void;
}

export default function PipelineCard({
  pipeline,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl border bg-white p-6 text-left shadow transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold">
            {pipeline.name}
          </h3>

          <p className="mt-1 text-gray-500">
            {pipeline.application.name}
          </p>
        </div>

        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
          {pipeline.provider.replace("_", " ")}
        </span>
      </div>

      <div className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">
            Application
          </span>

          <span className="font-medium">
            {pipeline.application.name}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Provider
          </span>

          <span className="font-medium">
            {pipeline.provider.replace("_", " ")}
          </span>
        </div>
      </div>
    </button>
  );
}
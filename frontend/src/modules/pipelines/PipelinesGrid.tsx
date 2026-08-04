import { useEffect, useState } from "react";

import {
  pipelinesApi,
  type Pipeline,
} from "../../api/pipelines";

import PipelineCard from "./PipelineCard";
import PipelineDrawer from "./PipelineDrawer";

export default function PipelinesGrid() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [selected, setSelected] =
    useState<Pipeline | null>(null);

  useEffect(() => {
    pipelinesApi
      .getAll()
      .then(setPipelines)
      .catch(console.error);
  }, []);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {pipelines.map((pipeline) => (
          <PipelineCard
            key={pipeline.id}
            pipeline={pipeline}
            onClick={() => setSelected(pipeline)}
          />
        ))}
      </div>

      <PipelineDrawer
        pipeline={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
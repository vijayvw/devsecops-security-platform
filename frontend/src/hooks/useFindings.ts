import { useEffect, useState } from "react";

import {
  findingsApi,
  type Finding,
} from "../api/findings";

export function useFindings() {
  const [findings, setFindings] = useState<Finding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    findingsApi
      .getAll()
      .then((data) => {
        setFindings(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Failed to load findings:", error);
        setFindings([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    findings,
    loading,
  };
}
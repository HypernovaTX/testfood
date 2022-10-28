import { useEffect, useState } from "react";
import yelp from "../api/yelp";
import { Business } from "../types/BusinessDTO";

export default function useYelpSearch() {
  /**
   * States
   */
  const [result, setResult] = useState<Business[]>([]);
  const [error, setError] = useState("");

  /**
   * Handles
   */
  const query = async (term: string) => {
    setError("");
    try {
      const params = { term, location: "75080", limit: 50 };
      const res = await yelp.get("/search", { params });
      const processedResult = (res.data?.businesses || []) as Business[];
      setResult(processedResult);
    } catch (e) {
      setError("Failure to fetch data!");
      console.error(e);
    }
  };

  /**
   * Effect
   */
  useEffect(() => {
    query("meat");
  }, []);

  /**
   * Output
   */
  return { error, query, result };
}

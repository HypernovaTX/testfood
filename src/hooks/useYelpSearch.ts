import { useEffect, useState } from "react";
import yelp from "../api/yelp";
import { Business } from "../types/BusinessDTO";

type Props = {
  defaultTerm: string;
  location: string;
  limit?: number;
};

export default function useYelpSearch({
  defaultTerm,
  location,
  limit = 50,
}: Props) {
  /**
   * States
   */
  const [result, setResult] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  /**
   * Handles
   */
  const query = async (term: string) => {
    setError(false);
    setLoading(true);
    try {
      const params = { term, location, limit };
      const res = await yelp.get("/search", { params });
      const processedResult = (res.data?.businesses || []) as Business[];
      setResult(processedResult);
      setLoading(false);
    } catch (e) {
      setError(true);
      console.error(e);
    }
  };

  /**
   * Effect
   */
  useEffect(() => {
    query(defaultTerm);
  }, []);

  /**
   * Output
   */
  return { error, loading, query, result };
}

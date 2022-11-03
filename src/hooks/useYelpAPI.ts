import { useEffect, useState } from "react";
import yelp from "../api/yelp";

type Props<P> = {
  params: P;
  uri: string;
};

export default function useYelpAPI<Param = {}, Res = {}>({
  params: defaultParams,
  uri,
}: Props<Param>) {
  /**
   * States
   */
  const [result, setResult] = useState<Res>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  /**
   * Handles
   */
  const query = async (params: Param) => {
    setError(false);
    setLoading(true);
    try {
      const res = await yelp.get(uri, { params });
      const processedResult = res.data as Res;
      setResult(processedResult);
      setLoading(false);
      return processedResult;
    } catch (e) {
      setError(true);
      console.error(e);
    }
  };

  /**
   * Effect
   */
  useEffect(() => {
    query(defaultParams);
  }, []);

  /**
   * Output
   */
  return { error, loading, query, result };
}

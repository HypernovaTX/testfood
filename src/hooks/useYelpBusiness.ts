import { useEffect, useState } from "react";
import yelp from "../api/yelp";
import { BusinessDetails } from "../types/BusinessDetailsDTO";
import { Business } from "../types/BusinessDTO";

type Props = {
  id: string;
};

export default function useYelpBusiness({ id }: Props) {
  /**
   * States
   */
  const [result, setResult] = useState<BusinessDetails>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  /**
   * Handles
   */
  const query = async () => {
    setError(false);
    setLoading(true);
    try {
      const res = await yelp.get(`/businesses/${id}`);
      const processedResult = res.data as BusinessDetails;
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
    query();
  }, []);

  /**
   * Output
   */
  return { error, loading, query, result };
}

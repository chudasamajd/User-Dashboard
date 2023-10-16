import { useEffect, useState } from "react";
import axios from "axios";

export type FetchResponse = {
  data: any;
  error: any;
  loading: boolean;
};

export default function useLoginAccounts(url: string) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response?.data?.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, error, loading };
}

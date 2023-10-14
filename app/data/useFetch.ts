// import { useEffect, useState } from "react";
// import axios from "axios";

export type FetchResponse = {
  data: any;
  error: any;
  // loading: boolean;
};

// export default function useFetch(url: string) {
//   const [data, setData] = useState<any>(null);
//   const [error, setError] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     (async function () {
//       try {
//         setLoading(true);
//         const response = await axios.get(url);
//         setData(response?.data);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [url]);

//   return { data, error, loading };
// }

import axios from "axios";

export default async function useFetch(url: string) {
  try {
    const response = await axios.get(url);
    if (response.status !== 200)
      return {
        data: null,
        error: "An error occurred while fetching user data",
      };
    const data = await response?.data?.results;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

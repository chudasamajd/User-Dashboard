import axios from "axios";

export type FetchResponse = {
  data: any;
  error: any;
};

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

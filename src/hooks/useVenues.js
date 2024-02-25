// Tanstack-Query used for statemanagement for API request queries.
// https://tanstack.com/query/v4/docs/react/overview
import { useQuery } from "@tanstack/react-query";
import axios from "../api/axios";

export default function useVenues() {
  return useQuery({
    queryKey: ["venues"],
    queryFn: async () => {
      const { data } = await axios.get("/venues");
      return data;
    },
    keepPreviousData: true,
  });
}

import axios from "../api/axios";
import { useQuery, queryCache } from "@tanstack/react-query";

export const fetchVenue = (id) =>
  axios.get(`/venue/${id}`).then((res) => res.data);

export default function useVenue(id) {
  return useQuery(["venues", id], () => fetchVenue(id), {
    initialData: () => {
      return queryCache.getQueryData("venues")?.find((d) => d.id == id);
    },
    initialStale: true,
  });
}

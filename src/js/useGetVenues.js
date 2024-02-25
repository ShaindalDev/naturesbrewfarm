//this is the hook for GET request to get all venues from API
import Axios from "axios";
import { useQuery } from "@tanstack/react-query";
export const useGetVenues = () => {
  const {
    data: venueData,
    isLoading: isVenueLoading,
    error,
  } = useQuery(["venues"], async () => {
    return Axios.get("/venues").then((resp) => resp.data);
  });

  if (error) {
    //logic for error handling here 
  }

  return { venueData, isVenueLoading };
};

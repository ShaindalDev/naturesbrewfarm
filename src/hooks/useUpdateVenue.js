import axios from "../api/axios";
import { useMutation, queryCache } from "@tanstack/react-query";

export default function useUpdateVenue() {
  return useMutation(
    (newVenue) =>
      axios.patch(`/venues/${newVenue.id}`, newVenue).then((res) => res.data),
    {
      onMutate: (newVenue) => {
        queryCache.setQueryData(["venues", newVenue.id], newVenue);
      },
      onSuccess: (newVenue) => {
        queryCache.setQueryData(["venues", newVenue.id], newVenue);

        if (queryCache.getQueryData("venues")) {
          queryCache.setQueryData("venues", (old) => {
            return old.map((d) => {
              if (d.id === newVenue.id) {
                return newVenue;
              }
              return d;
            });
          });
        } else {
          queryCache.setQueryData("venues", [newVenue]);
          queryCache.invalidateQueries("venues");
        }
      },
    }
  );
}

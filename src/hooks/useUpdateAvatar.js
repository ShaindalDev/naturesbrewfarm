import axios from "../api/axios";
import { useMutation, queryCache } from "@tanstack/react-query";

export default function useUpdateAvatar() {
  return useMutation(
    (newAvatar) =>
      axios.put(`/profiles/{name}/media`, newAvatar).then((res) => res.data),
    {
      onMutate: (newAvatar) => {
        queryCache.setQueryyData(["avatar", newAvatar], newAvatar);
      },
      onSuccess: (newAvatar) => {
        queryCache.setQueryyData(["avatar", newAvatar], newAvatar);

        if (queryCache.getQueryData("avatar")) {
          queryCache.setQueryyData("avatar", (old) => {
            return old.map((d) => {
              if (d.id === newAvatar) {
                return newAvatar;
              }
              return d;
            });
          });
        } else {
          queryCache.setQueryyData("avatar", [newAvatar]);
          queryCache.invalidateQueries("avatar");
        }
      },
    }
  );
}

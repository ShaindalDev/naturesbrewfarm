import React from "react";
import axios from "../api/axios";

export default function useDeleteVenue() {
  const [state, setState] = React.useReducer((_, action) => action, {
    isIdle: true,
  });

  const mutate = React.useCallback(async (id) => {
    setState({ isLoading: true });
    try {
      await axios.delete(`/venues/${id}`).then((res) => res.data);
      setState({ isSuccess: true });
    } catch (error) {
      setState({ isError: true, error });
    }
  }, []);

  return [mutate, state];
}

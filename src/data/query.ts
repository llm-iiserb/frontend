import { create } from "zustand";

export enum QueryState {
  LOAD = "LOAD",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

type QueryStateStore = {
  qState: QueryState;
  setLoading: () => void;
  setSuccess: () => void;
  setError: () => void;
};

const useQueryState = create<QueryStateStore>((set) => ({
  qState: QueryState.SUCCESS,
  setError: () => set({ qState: QueryState.ERROR }),
  setLoading: () => set({ qState: QueryState.LOAD }),
  setSuccess: () => set({ qState: QueryState.SUCCESS }),
}));

export default useQueryState;

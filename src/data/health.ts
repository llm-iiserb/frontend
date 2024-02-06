import { create } from "zustand";

type ServerStatus = {
  active: boolean;
  setActive: (active: boolean) => void;
};

const useServerStatus = create<ServerStatus>((set) => ({
  active: true,
  setActive: (active: boolean) => set({ active }),
}));

export default useServerStatus;

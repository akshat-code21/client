import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IUserState {
  name: string;
  email: string;
  type: string;
  token: string;
}

interface IBhasiniStoreState {
  user: IUserState | null;
  bears: number;
  increase: (by: number) => void;
  login: (user: IUserState) => void;
  logout: () => void;
}

const useBhasiniStore = create<IBhasiniStoreState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        increase: (by) => set((state) => ({ bears: state.bears + by })),
        user: null,
        login: (user) => set({ user }),
        logout: () => set({ user: null }),
      }),
      { name: "bearStore" }
    )
  )
);

export { useBhasiniStore };

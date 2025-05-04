/* eslint-disable @typescript-eslint/no-explicit-any */

import { devtools } from "zustand/middleware";
import { create } from "zustand";
import { createUserSlice } from "./createUserSlice";

const useStore = create(
  devtools((set: any, get: any) => ({
    ...createUserSlice(set, get),
    // ...createNotificationSlice(set, get),
  }))
);

export default useStore;

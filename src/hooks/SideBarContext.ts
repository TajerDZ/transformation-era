import { createContext, Dispatch, SetStateAction } from "react";

interface SideBarContextType {
  open: boolean;

  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const SideBarContext = createContext<SideBarContextType | null>(null);

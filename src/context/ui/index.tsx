import { createContext, useContext, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

export type UIContextData = {
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
  showSearchBox: boolean;
  setShowSearchBox: Dispatch<SetStateAction<boolean>>;
};

export const UIContextDefaultValues = {
  drawerOpen: false,
  setDrawerOpen: () => null,
  showSearchBox: false,
  setShowSearchBox: () => null
};

export const UIContext = createContext<UIContextData>(UIContextDefaultValues);
export const useUIContext = () => useContext(UIContext);

type Props = {
  children: React.ReactNode;
};
export const UIProvider = ({ children }: Props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);

  const value = {
    drawerOpen,
    setDrawerOpen,
    showSearchBox,
    setShowSearchBox
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

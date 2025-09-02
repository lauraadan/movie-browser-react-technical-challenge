import React, { ReactNode, useContext } from "react";
import { AppInitialData } from "../../../types/interfaces";

export const Ctx = React.createContext<AppInitialData | null>(null);

interface InitialDataProviderProps {
  children: ReactNode;
  value: AppInitialData;
}
export const InitialDataProvider = ({
  children,
  value,
}: InitialDataProviderProps): JSX.Element => {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export function useInitialData(): AppInitialData {
  const context = useContext(Ctx);
  if (!context) {
    throw new Error(
      "useInitialData must be used within an InitialDataProvider"
    );
  }
  return context;
}

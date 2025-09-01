import React from "react";

export type InitialData = any;
export const Ctx = React.createContext<InitialData>({});

export const InitialDataProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: InitialData;
}) => {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

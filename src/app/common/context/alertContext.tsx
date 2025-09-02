import React, { ReactNode, useState } from "react";
import { AlertCtx } from "../../../types/interfaces";

export const Ctx = React.createContext<AlertCtx | null>(null);

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider = ({
  children,
}: AlertProviderProps): JSX.Element => {
  const [message, setMessage] = useState<string | null>(null);

  const showAlert = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 5000);
  };

  return <Ctx.Provider value={{ message, showAlert }}>{children}</Ctx.Provider>;
};

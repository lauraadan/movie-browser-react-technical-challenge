import React from "react";

export type AlertCtx = {
  message: string | null;
  showAlert: (msg: string) => void;
};

export const Ctx = React.createContext<AlertCtx | null>(null);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = React.useState<string | null>(null);

  const showAlert = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 5000);
  };

  return <Ctx.Provider value={{ message, showAlert }}>{children}</Ctx.Provider>;
};

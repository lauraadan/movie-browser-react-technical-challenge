import React from "react";
import { Ctx, AlertCtx } from "../context/alertContext";

export const useAlert = (): AlertCtx => {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useAlert must be used within AlertProvider");
  return ctx;
};

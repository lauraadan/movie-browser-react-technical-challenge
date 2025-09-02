import React from "react";
import { Ctx } from "../context/alertContext";
import { AlertCtx } from "../../../types/interfaces";

export const useAlert = (): AlertCtx => {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useAlert must be used within AlertProvider");
  return ctx;
};

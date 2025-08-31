import React from "react";
import { Ctx } from "../context/initialData";

export function useInitialData<T = any>(): T {
  return React.useContext(Ctx) as T;
}

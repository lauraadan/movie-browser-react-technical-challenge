import React from "react";
import { Ctx } from "../../context/initialDataContext/initialData";

export function useInitialData<T = any>(): T {
  return React.useContext(Ctx) as T;
}

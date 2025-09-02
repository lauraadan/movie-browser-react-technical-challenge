import React, { ReactNode, FC } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return <div className="page">{children}</div>;
};

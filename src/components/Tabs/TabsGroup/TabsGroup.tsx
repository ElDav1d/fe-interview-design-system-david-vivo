// TODO: Implement TabsGroup component following design system conventions

import { ReactNode } from "react";

export interface TabsGroupProps {
  children: ReactNode;
}

const TabsGroup = ({ children }: TabsGroupProps) => {
  return <div>{children}</div>;
};

export default TabsGroup;

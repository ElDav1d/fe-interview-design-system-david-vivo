import { HTMLAttributes } from "react";

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  isSelected?: boolean;
}

const TabPanel = ({
  id,
  isSelected = false,
  children,
  ...rest
}: TabPanelProps) => {
  return (
    <div role="tabpanel" id={id} hidden={!isSelected} {...rest}>
      {children}
    </div>
  );
};

export default TabPanel;

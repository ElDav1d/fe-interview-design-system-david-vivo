import { ElementType, HTMLAttributes } from "react";
import "./TabList.scss";

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
}

const TabList = ({ className = "", children, ...rest }: TabListProps) => {
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={`tablist ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
};

export default TabList;

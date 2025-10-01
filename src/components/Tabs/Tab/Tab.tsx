import { ButtonHTMLAttributes } from "react";
import "./Tab.scss";

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "pill" | "underline";
  labelText: string;
  isSelected?: boolean;
}

const Tab = ({
  variant = "pill",
  labelText,
  isSelected = false,
  ...rest
}: TabProps) => {
  return (
    <button
      className={`tab-${variant}`}
      role="tab"
      aria-selected={isSelected}
      {...rest}
    >
      {labelText}
    </button>
  );
};

export default Tab;

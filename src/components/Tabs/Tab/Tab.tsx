import { ButtonHTMLAttributes } from "react";
import "./Tab.scss";

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "pill" | "underline";
  labelText: string;
  isSelected?: boolean;
  className?: string;
}

const Tab = ({
  variant = "pill",
  labelText,
  isSelected = false,
  className = "",
  ...rest
}: TabProps) => {
  return (
    <button
      className={`tab-${variant} ${className}`.trim()}
      role="tab"
      aria-selected={isSelected}
      {...rest}
    >
      {labelText}
    </button>
  );
};

export default Tab;

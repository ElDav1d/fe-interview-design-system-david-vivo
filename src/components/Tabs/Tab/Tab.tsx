import { ButtonHTMLAttributes } from "react";
import "./Tab.scss";

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  labelText: string;
  isSelected?: boolean;
}

const Tab = ({ labelText, isSelected = false, ...rest }: TabProps) => {
  return (
    <button className="tab" role="tab" aria-selected={isSelected} {...rest}>
      {labelText}
    </button>
  );
};

export default Tab;

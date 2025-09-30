import { ButtonHTMLAttributes } from "react";

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  labelText: string;
  isSelected?: boolean;
}

const Tab = ({ labelText, isSelected = false, ...rest }: TabProps) => {
  return (
    <button role="tab" aria-selected={isSelected} {...rest}>
      {labelText}
    </button>
  );
};

export default Tab;

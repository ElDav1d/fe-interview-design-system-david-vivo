import { HTMLAttributes, ReactNode } from "react";
import "./Badge.scss";

/**
 * Badge component for displaying small pieces of information.
 * Typically used inside Tab to show counts or status indicators.
 *
 * @component
 * @example
 * <Badge variant="neutral">3</Badge>
 *
 * @example
 * <Badge variant="positive">Done</Badge>
 *
 * @example
 * <Badge variant="negative">Alert</Badge>
 */

export type BadgeVariant = "neutral" | "positive" | "negative";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const Badge = ({
  variant = "neutral",
  children,
  className = "",
  ...rest
}: BadgeProps) => {
  return (
    <span className={`badge badge-${variant} ${className}`.trim()} {...rest}>
      {children}
    </span>
  );
};

export default Badge;

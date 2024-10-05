import { cn } from "@nextui-org/react";
import { ReactNode } from "react";
interface IconWrapperProps {
  children: ReactNode;
  className?: string; // Optional className, in case it’s not passed
}
export const IconWrapper: React.FC<IconWrapperProps> = ({
  children,
  className,
}) => (
  <div
    className={cn(
      className,
      "flex items-center rounded-small justify-center w-7 h-7"
    )}
  >
    {children}
  </div>
);

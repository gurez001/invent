import { ChevronRight } from "lucide-react";
import React from "react";
interface ItemCounter_props {
  number?: number;
}
export const ItemCounter: React.FC<ItemCounter_props> = ({ number }) => (
  <div className="flex items-center gap-1 text-default-400">
    <span className="text-small">{number}</span>
  </div>
);

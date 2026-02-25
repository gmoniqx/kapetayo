import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function PageHeader({ title, action, className }: PageHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="text-primary">
        <h1 className="text-3xl font-bold leading-none">{title}</h1>
      </div>
      <div className="min-h-9 flex items-center">{action ?? <div className="h-9 w-9" aria-hidden="true" />}</div>
    </div>
  );
}
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type MobilePageShellProps = {
  children: ReactNode;
  contentClassName?: string;
};

export function MobilePageShell({ children, contentClassName }: MobilePageShellProps) {
  return (
    <motion.div
      className="min-h-screen bg-muted/40 px-3 py-6"
      initial={{ opacity: 0, y: 10, scale: 0.985, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto w-full">
        <div className={cn("space-y-4 rounded-[2rem] border border-border/70 bg-background p-4 shadow-sm", contentClassName)}>{children}</div>
      </div>
    </motion.div>
  );
}
// src/components/ui/tooltip.jsx
import React, { useState, createContext, useContext } from "react";
import { cn } from "../../lib/utils";

// Rest of the code remains the same

const TooltipContext = createContext({});

export function TooltipProvider({ children }) {
  return children;
}

export function Tooltip({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      {children}
    </TooltipContext.Provider>
  );
}

export function TooltipTrigger({ children, asChild, ...props }) {
  const { setOpen } = useContext(TooltipContext);

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);

  if (asChild) {
    const child = children;
    return React.cloneElement(child, {
      ...props,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    });
  }

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}

export function TooltipContent({
  children,
  className,
  side = "top",
  ...props
}) {
  const { open } = useContext(TooltipContext);

  if (!open) return null;

  return (
    <div
      className={cn(
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        side === "top" && "data-[side=top]:slide-in-from-bottom-2",
        side === "right" && "data-[side=right]:slide-in-from-left-2",
        side === "bottom" && "data-[side=bottom]:slide-in-from-top-2",
        side === "left" && "data-[side=left]:slide-in-from-right-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

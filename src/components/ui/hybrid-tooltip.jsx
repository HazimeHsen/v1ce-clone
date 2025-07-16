"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./tooltip";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "./dialog";
import { cn } from "@/lib/utils";

const TouchContext = createContext(undefined);
const useTouch = () => useContext(TouchContext);

const TouchProvider = (props) => {
  const [isTouch, setTouch] = useState();

  useEffect(() => {
    setTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  return <TouchContext.Provider value={isTouch} {...props} />;
};

const HybridTooltipProvider = (props) => {
  return <TooltipProvider delayDuration={0} {...props} />;
};

const HybridTooltip = (props) => {
  const isTouch = useTouch();

  return isTouch ? <Dialog {...props} /> : <Tooltip {...props} />;
};

const HybridTooltipTrigger = (props) => {
  const isTouch = useTouch();

  return isTouch ? <DialogTrigger {...props} /> : <TooltipTrigger {...props} />;
};

const VisuallyHidden = ({ children }) => {
  return <span className="sr-only">{children}</span>;
};

const HybridTooltipContent = ({ children, className, ...props }) => {
  const isTouch = useTouch();

  return isTouch ? (
    <DialogContent className={cn("text-sm",className)} {...props}>
      <VisuallyHidden>
        <DialogTitle>Information</DialogTitle>
      </VisuallyHidden>
      {children}
    </DialogContent>
  ) : (
    <TooltipContent className={className} {...props}>
      {children}
    </TooltipContent>
  );
};

export {
  TouchProvider,
  HybridTooltipProvider,
  HybridTooltip,
  HybridTooltipTrigger,
  HybridTooltipContent,
};

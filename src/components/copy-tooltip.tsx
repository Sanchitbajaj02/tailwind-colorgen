import React, { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LockIcon } from "lucide-react";
import { toast } from "sonner"
interface CopyTooltipType {
  colorNumberKey: string;
  hex: string;
  closestIndex: number;
  index: number;
}

export default function CopyTooltip({
  colorNumberKey,
  hex,
  closestIndex,
  index,
}: CopyTooltipType) {
  const [copied, setCopied] = useState(false);

  const copyColorToClipboard = async () => {
    try {
      setCopied(true);

      await navigator.clipboard.writeText(hex.toUpperCase());
      setTimeout(() => setCopied(false), 1000);

      toast.success(`${hex.toUpperCase()} has been copied to clipboard`)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Tooltip>
      <TooltipTrigger
        className={`rounded-lg overflow-hidden shadow border cursor-pointer ${
          index === closestIndex ? "ring-2 ring-blue-500" : ""
        }`}
        onClick={copyColorToClipboard}
      >
        <div className="h-20" style={{ backgroundColor: hex }}></div>
        <div className="p-2 text-center">
          <div className="text-sm font-semibold">{colorNumberKey}</div>
          <div className="text-sm text-black flex gap-1 items-center justify-center">
            {hex.toUpperCase()} {index === closestIndex && <LockIcon size={14} />}
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent>{copied ? "Copied!" : `Copy ${hex.toUpperCase()}`}</TooltipContent>
    </Tooltip>
  );
}

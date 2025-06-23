import React from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LockIcon } from "lucide-react";
import { toast } from "sonner";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface CopyTooltipType {
  colorNumberKey: string;
  hex: string;
  closestIndex: number;
  index: number;
}

export default function CopyTooltip({ colorNumberKey, hex, closestIndex, index }: CopyTooltipType) {
  const onSuccessCopy = () => {
    toast.success(`${hex.toUpperCase()} has been copied to clipboard`);
  };

  const { isCopied, copyToClipboard } = useCopyToClipboard({
    onCopy: onSuccessCopy,
  });

  return (
    <Tooltip>
      <TooltipTrigger
        className={`rounded-lg overflow-hidden shadow border cursor-pointer ${
          index === closestIndex ? "ring-2 ring-blue-500" : ""
        }`}
        onClick={() => copyToClipboard(hex.toUpperCase())}
      >
        <div className="h-20" style={{ backgroundColor: hex }}></div>
        <div className="p-2 text-center">
          <div className="text-base font-semibold">{colorNumberKey}</div>
          <div className="text-sm text-black flex gap-1 items-center justify-center">
            {hex.toUpperCase()} {index === closestIndex && <LockIcon size={14} />}
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent>{isCopied ? "Copied!" : `Copy ${hex.toUpperCase()}`}</TooltipContent>
    </Tooltip>
  );
}

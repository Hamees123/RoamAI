"use client";

import * as React from "react";
import * as ResizablePrimitive from "react-resizable-panels";
import { cn } from "@/lib/utils";

// Safely map both older v2.x and newer v4.x naming conventions 
const PrimitiveGroup = (ResizablePrimitive as any).Group || (ResizablePrimitive as any).PanelGroup;
const PrimitivePanel = ResizablePrimitive.Panel;
const PrimitiveHandle = (ResizablePrimitive as any).Separator || (ResizablePrimitive as any).PanelResizeHandle;

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof PrimitiveGroup>) => (
  <PrimitiveGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
);

const ResizablePanel = PrimitivePanel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof PrimitiveHandle> & {
  withHandle?: boolean;
}) => (
  <PrimitiveHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:inset-x-0 data-[panel-group-direction=vertical]:after:top-1/2 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border text-muted-foreground">
        <span className="h-2.5 w-0.5 bg-muted-foreground/50" />
      </div>
    )}
  </PrimitiveHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
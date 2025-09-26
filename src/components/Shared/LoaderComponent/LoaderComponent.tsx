import React from "react";
import { Spinner, type SpinnerProps } from "@/components/ui/shadcn-io/spinner";
const variant: SpinnerProps["variant"] = "infinite";

export default function LoaderComponent() {
  return (
    <div className="h-[70vh] flex justify-center items-center">
      <Spinner variant={variant} size={50} />
    </div>
  );
}

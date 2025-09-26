"use client";
import { Grid3x2, TextAlignJustify } from "lucide-react";

export default function TogglingBtnOfDisplay({
  viewMode,
  setViewMode,
}: {
  viewMode: string;
  setViewMode: (value: string) => void;
}) {
  return (
    <div>
      {/* Togglling the display mode between list and grid */}
      <div className="flex w-fit rounded-md border border-gray-200 bg-white  mb-5 ms-auto me-5  ">
        <div
          className={` ${
            viewMode == "list"
              ? "bg-primary text-white"
              : "bg-white text-primary"
          } flex justify-center items-center p-1 rounded-s-md hover:cursor-pointer`}
          onClick={() => {
            setViewMode("list");
          }}
        >
          <TextAlignJustify />
        </div>
        <div
          className={`${
            viewMode == "grid"
              ? "bg-primary text-white"
              : "bg-white text-primary"
          } flex justify-center items-center p-1 rounded-e-md hover:cursor-pointer`}
          onClick={() => {
            setViewMode("grid");
          }}
        >
          <Grid3x2 />
        </div>
      </div>
    </div>
  );
}

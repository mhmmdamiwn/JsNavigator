import React from "react";
import { cn } from "../../helpers/cn";
import { useMemo } from "preact/hooks";
import { isError, isSuccess } from "../../helpers/utlis";

function ResponseAsJson({ data, code }) {
  const status = useMemo(() => {
    if (isSuccess(code)) return "success";
    if (isError(code)) return "error";
    return "idle";
  }, [code]);

  const borders = {
    success: "border-success/25",
    error: "border-error/25",
    idle: "border-white/10",
  };

  const texts = {
    success: "text-success",
    error: "text-error",
    idle: "text-white",
  };

  return (
    <>
      <h3 className="text-[12px] font-medium text-white mt-2">
        Response as JSON
      </h3>

      <div
        className={cn(
          "text-white w-full min-h-[100px] bg-neutral-800 whitespace-pre border rounded mt-3 px-2 py-1 text-[12px] overflow-auto",
          borders[status]
        )}
      >
        <span className={cn(texts[status])}>{code}</span> <br />
        {JSON.stringify(data, null, 2)}
      </div>
    </>
  );
}

export default ResponseAsJson;

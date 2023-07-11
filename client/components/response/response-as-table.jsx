import { cn } from "../../helpers/cn";
import { useMemo } from "preact/hooks";
import { isError, isInternalError, isSuccess } from "../../helpers/utlis";

function ResponseAsTable({ data, code }) {
  const status = useMemo(() => {
    if (isSuccess(code)) return "success";
    if (isError(code)) return "error";
    if (isInternalError(code)) return "warning";
    return "idle";
  }, [code]);

  const backgrounds = {
    success: "bg-success/25",
    error: "bg-error/25",
    warning: "bg-warning/25",
    idle: "bg-white/10",
  };

  const texts = {
    success: "text-success",
    error: "text-error",
    warning: "text-warning",
    idle: "text-white",
  };

  return (
    <>
      <h3 className="text-[12px] font-medium text-white mt-2">
        Response as Table
      </h3>

      <div
        className={cn(
          "flex flex-col mt-3 p-[1px] gap-[1px]",
          backgrounds[status]
        )}
      >
        <div
          className={cn(
            "w-full p-2 text-[12px] bg-neutral-800 flex-shrink-0",
            texts[status]
          )}
        >
          {code}
        </div>

        {data &&
          Object.entries(data)?.map((entry, index) => (
            <div className="flex w-full relative gap-[1px] group" key={index}>
              {/* <div className="w-[44px] flex items-center justify-center bg-neutral-800 flex-shrink-0" /> */}

              <div className="flex items-center justify-start w-full relative gap-[1px]">
                {entry.map((value, idx) => {
                  return (
                    <input
                      readOnly
                      className="text-[12px] text-white w-[50%] p-2 outline-none bg-neutral-800"
                      value={value}
                      onChange={(e) => {
                        return;
                      }}
                      key={idx}
                    />
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default ResponseAsTable;

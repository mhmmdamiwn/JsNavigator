import React from "react";
import { cn } from "../helpers/cn";
import { Icons } from "./icons";

function RequestHeaders({ focus, setFocus, headers, changeRequest }) {
  return (
    <>
      <h3 className="text-[12px] font-medium text-white mt-2">Headers</h3>

      <div className="flex flex-col mt-2 bg-white/10 p-[1px] gap-[1px]">
        {headers &&
          headers.map((object, idx) => (
            <div className="flex w-full relative gap-[1px] group">
              <div className="w-[44px] flex items-center justify-center bg-neutral-800 flex-shrink-0">
                <button
                  className={cn(
                    "p-0.5 border border-white/25 rounded",
                    object.disabled ? "bg-neutral-800" : "bg-white/50"
                  )}
                  onClick={(e) => {
                    changeRequest({
                      type: "changeHeader",
                      payload: {
                        value: !object?.disabled,
                        property: "disabled",
                        idx,
                      },
                    });
                  }}
                >
                  <Icons.Check
                    className={cn(
                      "text-[12px] ",
                      object?.disabled ? "text-transparent" : "text-neutral-800"
                    )}
                  />
                </button>
              </div>

              <div className="flex items-center justify-start w-full relative gap-[1px]">
                {Object.entries(object).map(([key, value], index) => {
                  if (key === "disabled") return;

                  return (
                    <input
                      ref={(node) => {
                        if (key === focus.key && idx === focus.idx && node) {
                          setTimeout(() => {
                            node.focus();
                            setFocus({
                              idx: null,
                              key: null,
                            });
                          }, 0);
                        }
                      }}
                      className="text-[12px] text-white w-[50%] p-2 outline-none bg-neutral-800"
                      value={value}
                      onChange={(e) => {
                        changeRequest({
                          type: "changeHeader",
                          payload: {
                            value: e.target.value,
                            property: key,
                            idx,
                          },
                        });
                      }}
                      key={index}
                    />
                  );
                })}

                <button
                  className="p-1 text-white/75 hover:text-white hover:bg-white/25 
                    absolute right-0 rounded-sm group-hover:flex group-focus-within:!hidden hidden"
                  onClick={() => {
                    changeRequest({
                      type: "removeHeader",
                      payload: idx,
                    });
                  }}
                >
                  <Icons.TrashCan className="text-[16px]" />
                </button>
              </div>
            </div>
          ))}

        <div className="flex gap-[1px]">
          <div className="w-[44px] flex items-center justify-center bg-neutral-800 flex-shrink-0"></div>
          <input
            placeholder={"key"}
            className="text-[12px] text-white w-[50%] p-2 outline-none bg-neutral-800"
            onChange={(e) => {
              if (focus.idx !== null) return;
              changeRequest({
                type: "createHeader",
                payload: {
                  key: "key",
                  value: e.target.value,
                },
              });
              e.target.blur();
              e.target.value = "";
            }}
          />

          <input
            placeholder={"value"}
            value={""}
            className="text-[12px] text-white w-[50%] p-2 outline-none bg-neutral-800"
            onChange={(e) => {
              if (focus.idx !== null) return;

              changeRequest({
                type: "createHeader",
                payload: {
                  key: "value",
                  value: e.target.value,
                },
              });
              e.target.blur();
              e.target.value = "";
            }}
          />
        </div>
      </div>
    </>
  );
}

export default RequestHeaders;

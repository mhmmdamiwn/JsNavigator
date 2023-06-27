import { h, Fragment } from "preact";

import { useEffect, useRef, useState } from "preact/hooks";
import { cn } from "../helpers/cn";
import { Icons } from "./icons";

const RequestInput = ({ method, setMethod, url, setUrl }) => {
  const methods = {
    GET: {
      color: "text-green-500/75",
    },
    POST: {
      color: "text-yellow-500/75",
    },
    PUT: {
      color: "text-cyan-500/75",
    },
    PATCH: {
      color: "text-violet-500/75",
    },
    DELETE: {
      color: "text-red-500/75",
    },
  };

  const [methodColor, setMethodColor] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const ref = useRef(null);
  const methodInputContainer = useRef(null);

  useEffect(() => {
    if (method === "POST") return setMethodColor(methods["POST"].color);
    if (method === "GET") return setMethodColor(methods["GET"].color);
    if (method === "PUT") return setMethodColor(methods["PUT"].color);
    if (method === "PATCH") return setMethodColor(methods["PATCH"].color);
    if (method === "DELETE") return setMethodColor(methods["DELETE"].color);

    setMethodColor("");
  }, [method]);

  useEffect(() => {
    if (!ref.current || !showSuggestions || !methodInputContainer.current)
      return;

    const handleClickOutSide = (e) => {
      const target = e.target;
      if (
        ref.current !== target &&
        !ref.current?.contains(target) &&
        methodInputContainer.current !== target &&
        !methodInputContainer.current?.contains(target)
      ) {
        setShowSuggestions(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutSide);

    return () => window.removeEventListener("mousedown", handleClickOutSide);
  }, [ref, showSuggestions, methodInputContainer]);

  return (
    <div
      className="flex items-center justify-start w-full flex-shrink bg-transparent border border-white/25 rounded relative focus-within:shadow-[0_0_0_1px] focus-within:shadow-white/10
    "
    >
      <div
        ref={methodInputContainer}
        className="flex items-center justify-center flex-shrink-0 py-2.5 px-2.5"
      >
        <input
          onFocus={() => {
            if (!showSuggestions) setShowSuggestions(true);
          }}
          placeholder="METHOD"
          className={cn(
            "text-[12px] font-medium leading-none outline-none bg-transparent w-[75px]",
            methodColor ? methodColor : "text-white"
          )}
          value={method}
          // in preact we have to use onInput instead of onChange
          onInput={(e) => {
            setMethod(e.target.value.replaceAll(" ", "").toUpperCase());
          }}
        />

        <button
          type="button"
          onClick={() => {
            setShowSuggestions((prev) => !prev);
          }}
        >
          <Icons.ChevronDown className="text-white/75 text-[16px]" />
        </button>
      </div>

      <span className="inline h-[20px] bg-white/25 w-[1px]" />

      <div className="flex items-center justify-center w-full flex-shrink pl-2">
        <input
          className="outline-none bg-transparent text-[12px] text-white w-full"
          placeholder="URL"
          value={url}
          // in preact we have to use onInput instead of onChange
          onInput={(e) => {
            setUrl(e.target.value);
          }}
        />
      </div>

      <div
        className={cn(
          "absolute top-[calc(100%_+_8px)] left-0 transition-all overflow-hidden",
          showSuggestions ? "max-h-[100vh]" : "max-h-[0px]"
        )}
      >
        <div
          ref={ref}
          className="flex flex-col w-[130px] bg-neutral-800 border border-white/25 p-2 rounded shadow-xl "
        >
          {(() => {
            const list =
              !method || Object.keys(methods).includes(method)
                ? Object.entries(methods)
                : Object.entries(methods).filter(
                    ([key], idx) => key.search(method) >= 0
                  );
            return list.map(([key, { color }], idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => {
                  setMethod(key);
                  setShowSuggestions(false);
                }}
                className={cn(
                  "rounded hover:bg-white/10 cursor-pointer px-2 py-1.5 text-[12px] font-medium text-start",
                  color,
                  key === method ? "bg-white/10" : ""
                )}
              >
                {key}
              </button>
            ));
          })()}
        </div>
      </div>
    </div>
  );
};

export default RequestInput;

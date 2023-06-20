import { useEffect, useId, useRef, useState } from "preact/hooks";
import { cn } from "../../helpers/cn";
import { Icons } from "../icons";
import { useClickOutSide } from "../../hooks/use-click-outside";

const Select = ({
  label,
  error,
  options = ["import", "require"],
  value,
  setValue,
}) => {
  const [open, setOpen] = useState(false);
  const id = useId();

  const [ref] = useClickOutSide(() => {
    setOpen(false);
  }, open);

  return (
    <div className="flex flex-col gap-2 w-full relative">
      {label ? (
        <label className="text-[13px] text-white w-fit" htmlFor={id}>
          {label}
        </label>
      ) : (
        ""
      )}
      <div
        ref={ref}
        className={cn(
          "flex items-center bg-neutral-800 gap-1 text-white border  text-[13px] rounded p-2.5 focus-within:shadow-[0_0_0_3px] ",
          error
            ? "border-error focus-within:shadow-error/20 "
            : "border-white/25 focus-within:shadow-white/5  focus-within:border-primary"
        )}
      >
        <input
          autoComplete="off"
          onFocus={() => {
            if (!open) {
              setOpen(true);
            }
          }}
          value={value}
          onInput={(e) => {
            setValue(e.target.value);
          }}
          className={cn("outline-none bg-transparent w-full", "")}
          id={id}
        />

        <button
          type="button"
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          <Icons.ChevronDown className="text-white text-[16px]" />
        </button>

        <div
          className={cn(
            "absolute grid top-[calc(100%_+_8px)] left-0 w-full transition-all overflow-hidden rounded",
            open ? "max-h-[100vh]" : " max-h-0"
          )}
        >
          <div className="flex flex-col  border border-white/25 rounded p-2 bg-neutral-800">
            {(() => {
              const result =
                !value || options.includes(value)
                  ? options
                  : options.filter((item) => item.search(value) >= 0);
              return (
                <>
                  {result.map((item, idx) => (
                    <button
                      onClick={() => {
                        setValue(item);
                        setOpen(false);
                      }}
                      key={idx}
                      type="button"
                      className={cn(
                        "w-full p-2 hover:bg-white/10 rounded text-white text-start",
                        value === item ? "bg-white/10" : ""
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Select;

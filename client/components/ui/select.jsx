import { useEffect, useId, useRef, useState } from "preact/hooks";
import { cn } from "../../helpers/cn";
import { Icons } from "../icons";
import { useClickOutSide } from "../../hooks/use-click-outside";
import Input from "./input";

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
    <div
      ref={ref}
      className="flex flex-col gap-2 w-full relative text-[14px] text-foreground"
    >
      {label ? (
        <label className="text-[13px] text-white w-fit" htmlFor={id}>
          {label}
        </label>
      ) : (
        ""
      )}
      <Input
        error={error}
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
        Icon={({ ...props }) => (
          <button
            type="button"
            onClick={() => {
              setOpen((prev) => !prev);
            }}
            {...props}
          >
            <Icons.ChevronDown className="text-white text-[16px]" />
          </button>
        )}
      />

      <div
        className={cn(
          "absolute grid top-[calc(100%_+_8px)] left-0 w-full transition-all overflow-hidden rounded",
          open ? "max-h-[100vh]" : " max-h-0"
        )}
      >
        <div className="flex flex-col  border border-border rounded p-2 bg-background">
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
                      "w-full p-2 px-3 hover:bg-foreground/10 transition-all rounded text-white text-start",
                      value === item ? "bg-foreground/5" : ""
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
  );
};

export default Select;

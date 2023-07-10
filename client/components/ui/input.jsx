import { useId } from "preact/hooks";
import { cn } from "../../helpers/cn";

const Input = ({ label, Icon, error, value, ...props }) => {
  const id = useId();

  return (
    <div className="flex flex-col w-full relative">
      {label ? (
        <label className="text-[14px] text-foreground w-fit mb-1" htmlFor={id}>
          {label}
        </label>
      ) : (
        ""
      )}
      <div
        className={cn(
          "flex items-center transition-all bg-background gap-1 text-foreground border text-[14px] rounded px-3 py-2 focus-within:shadow-[0_0_0_3px] ",
          error
            ? "border-error focus-within:shadow-error/20 "
            : "border-border focus-within:shadow-primary/25 focus-within:border-primary"
        )}
      >
        <input
          value={value}
          autoComplete="off"
          className={cn("outline-none bg-transparent w-full", "")}
          id={id}
          {...props}
        />

        {Icon ? <Icon className="flex-shrink-0" /> : ""}
      </div>

      {error ? <p className="text-[13px] text-error">{error}</p> : ""}
    </div>
  );
};

export default Input;

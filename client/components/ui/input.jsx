import { useId } from "preact/hooks";
import { cn } from "../../helpers/cn";

const Input = ({ label, error, value, ...props }) => {
  const id = useId();

  return (
    <div className="flex flex-col w-full relative">
      {label ? (
        <label className="text-[13px] text-white w-fit mb-1" htmlFor={id}>
          {label}
        </label>
      ) : (
        ""
      )}
      <div
        className={cn(
          "flex items-center bg-neutral-800 gap-1 text-white border  text-[13px] rounded p-2.5 focus-within:shadow-[0_0_0_3px] ",
          error
            ? "border-error focus-within:shadow-error/20 "
            : "border-white/25 focus-within:shadow-white/5  focus-within:border-primary"
        )}
      >
        <input
          value={value}
          autoComplete="off"
          className={cn("outline-none bg-transparent w-full", "")}
          id={id}
          {...props}
        />
      </div>

      {error ? <p className="text-[13px] text-error">{error}</p> : ""}
    </div>
  );
};

export default Input;

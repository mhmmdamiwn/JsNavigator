import { useId } from "preact/hooks";
import { cn } from "../../helpers/cn";
import { Icons } from "../icons";

cn;

const Input = ({ label, error }) => {
  const id = useId();
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
        className={cn(
          "flex items-center bg-neutral-800 gap-1 text-white border border-white/25 text-[13px] rounded p-2.5 focus-within:shadow-[0_0_0_2px] focus-within:shadow-white/5 focus-within:border-violet-400",
          error ? "border-red-400" : ""
        )}
      >
        <input
          autoComplete="off"
          className={cn("outline-none bg-transparent w-full", "")}
          id={id}
        />
      </div>
    </div>
  );
};

export default Input;

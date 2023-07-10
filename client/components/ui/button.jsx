import { cn } from "../../helpers/cn";

function Button({ size = "md", block = false, children, className, ...props }) {
  const sizes = {
    md: "h-[38px] text-[14px]",
  };
  return (
    <button
      className={cn(
        "flex capitalize items-center justify-center bg-violet-500 hover:bg-violet-500/90 px-4 text-white rounded",
        sizes[size],
        block ? "w-full" : "",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

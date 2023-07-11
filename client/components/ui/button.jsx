import { cn } from "../../helpers/cn";
import { forwardRef } from "preact/compat";
import { Icons } from "../icons";

const Button = forwardRef(
  (
    {
      className,
      color = "primary",
      variant = "contained",
      block = false,
      loading = false,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const variants = {
      contained: {
        shared: "",
        primary: "bg-primary text-white",
        foreground: "bg-foreground text-background",
      },
      outlined: {
        shared: "border",
        primary: "border-primary/10 hover:bg-primary/10 text-primary",
        foreground:
          "border-foreground/10 hover:bg-foreground/10 text-foreground",
      },
      text: {
        shared: "",
        primary: "text-primary/80 hover:bg-primary/10 hover:text-primary",
        foreground:
          "text-foreground/80 hover:bg-foreground/10 hover:text-foreground",
      },
    };

    return (
      <button
        ref={ref}
        className={cn(
          "flex items-center justify-center rounded transition-all",
          "py-2 px-4 text-[14px]",
          block ? "w-full" : "",
          loading ? "opacity-75 pointer-events-none" : "",
          variants[variant]["shared"],
          variants[variant][color],
          className
        )}
        onClick={loading ? () => {} : onClick}
        {...props}
      >
        {loading ? (
          <Icons.Spinner className="text-[21px] animate-spin" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "@1stmmd/Button";

export default Button;

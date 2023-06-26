import { h, Fragment } from "preact";

import React from "react";
import { cn } from "../../helpers/cn";

function IconButton({ variant = "ghost", size = "md", className, ...props }) {
  const sizes = {
    sm: "p-1",
    md: "p-1",
    lg: "",
  };

  const variants = {
    ghost: "hover:bg-white/25 text-white",
    outlined:
      "border border-white/25 hover:bg-white/25 text-white/75 hover:text-white",
  };

  return (
    <button
      className={cn(
        "flex items-center justify-center relative rounded transition-all",
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export default IconButton;

import * as React from "react";

import { cn } from "@/lib/utils";
import Icon from "./Icon";
interface InputProps extends React.ComponentProps<"input"> {
  error?: string | null;
}
function Input({ className, type, error = null, ...props }: InputProps) {
  const [inputType, setInputType] = React.useState(type);

  return (
    <div className="relative">
      <input
        type={inputType}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input-foreground flex h-9 w-full min-w-0 rounded-md border bg-input px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive py-5",
          error ? "border-red-400 " : "border-",
          className
        )}
        {...props}
      />
      {error && <div className="text-xs text-red-400 mt-1 ps-1">{error}</div>}
      {type === "password" && (
        <Icon
          name={inputType === "password" ? "EyeOff" : "Eye"}
          className="absolute top-1/2 end-3 -translate-y-1/2 cursor-pointer text-muted-foreground"
          onClick={() => {
            setInputType((prev) => (prev === "password" ? "text" : "password"));
          }}
          size={16}
        />
      )}
    </div>
  );
}

export { Input };

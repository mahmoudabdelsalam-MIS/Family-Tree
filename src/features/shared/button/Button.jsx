import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Button = forwardRef(
  (
    {
        children,
        variant = "primary",
        size = "md",
        rounded = "xl",
        isLoading = false,
        icon: Icon = null,
        iconPostion = "end",
        fullWidth = false,
        className = "",
        ...props
    },
    ref,
  ) => {
    const baseClasses = `
        inline-flex items-center justify-center 
        font-semibold 
        cursor-pointer
        transition-all duration-200 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0
    `;

    const variants = {
    primary:
        "bg-primary hover:bg-primary/90 text-white shadow-[4px_4px_0_0_#0b3d6e] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#0b3d6e] active:translate-x-1 active:translate-y-1 active:shadow-none",

    secondary:
        "bg-secondary hover:bg-secondary/90 text-white shadow-[4px_4px_0_0_#1e293b] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#1e293b] active:translate-x-1 active:translate-y-1 active:shadow-none",

    outline:
        "bg-transparent border-2 border-primary text-primary shadow-[4px_4px_0_0_#0b3d6e] hover:bg-primary/10 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#0b3d6e] active:translate-x-1 active:translate-y-1 active:shadow-none",

    ghost:
        "bg-white border border-gray-200 text-gray-800 shadow-[4px_4px_0_0_#e2e8f0] hover:bg-gray-50 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#e2e8f0] active:translate-x-1 active:translate-y-1 active:shadow-none",

    warning:
        "bg-red-500 text-white shadow-[4px_4px_0_0_#991b1b] hover:bg-red-600 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#991b1b] active:translate-x-1 active:translate-y-1 active:shadow-none",
    };

    const sizes = {
        sm: "px-5 py-2 text-sm min-h-[38px]",
        md: "px-10 py-3 text-base min-h-[46px]",
        lg: "px-12 py-4 text-lg min-h-[56px]",
    };

    const round = {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        xxl: "rounded-2xl",
        full: "rounded-full",
    };

    const isIconOnly = Icon && !children;

    return (
    <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={`
            ${baseClasses}
            ${variants[variant]}
            ${sizes[size]}
            ${round[rounded]}
            ${fullWidth ? "w-full" : ""}
            ${className}
        `}
        {...props}
    >
        {isLoading ? (
        <div
            className={`flex items-center gap-2 ${iconPostion === "end" ? "flex-row-reverse" : ""}`}
        >
            {children}
            <Loader2 className="w-5 h-5 animate-spin" />
        </div>
        ) : isIconOnly ? (
        <Icon className="w-5 h-5" />
        ) : (
        <div
            className={`flex items-center gap-2 ${iconPostion === "end" ? "flex-row-reverse" : ""}`}
        >
            {children}
            {Icon && <Icon className="w-5 h-5" />}
        </div>
        )}
      </button>
    );
  },
);

export default Button;
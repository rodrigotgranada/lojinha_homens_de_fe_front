import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = "", id, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-4 text-zinc-400 pointer-events-none flex items-center justify-center">
              {icon}
            </div>
          )}
          <input
            id={id}
            ref={ref}
            className={`w-full bg-zinc-50 dark:bg-zinc-900 border ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : "border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:ring-indigo-500/20"
            } rounded-xl px-4 py-3 text-base text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-4 transition-all duration-200 ${
              icon ? "pl-11" : ""
            } ${className}`}
            {...props}
          />
        </div>
        {error && <span className="text-sm text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

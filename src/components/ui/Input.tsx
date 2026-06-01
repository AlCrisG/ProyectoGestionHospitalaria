import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '../../utils/formatters';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: unknown;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error: errorProp, className, id, ...props }, ref) => {
    const error = errorProp != null ? String(errorProp) : undefined;
    return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700">
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-800 shadow-sm transition-all',
          'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
          'hover:border-slate-300',
          error && 'border-red-400 focus:border-red-400 focus:ring-red-200',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
    );
  }
);
Input.displayName = 'Input';

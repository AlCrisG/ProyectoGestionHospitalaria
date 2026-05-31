import { forwardRef, SelectHTMLAttributes } from 'react';
import { cn } from '../../utils/formatters';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: unknown;
  options: { value: string | number; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error: errorProp, options, placeholder, className, id, ...props }, ref) => {
    const error = errorProp != null ? String(errorProp) : undefined;
    return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700">
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        className={cn(
          'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-800 shadow-sm',
          'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
          error && 'border-red-400',
          className
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
    );
  }
);
Select.displayName = 'Select';

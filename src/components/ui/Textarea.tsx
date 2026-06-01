import { forwardRef, TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/formatters';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: unknown;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error: errorProp, className, id, ...props }, ref) => {
    const error = errorProp != null ? String(errorProp) : undefined;
    return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        rows={4}
        className={cn(
          'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-800 shadow-sm resize-y',
          'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
          error && 'border-red-400',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
    );
  }
);
Textarea.displayName = 'Textarea';

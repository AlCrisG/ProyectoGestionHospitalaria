export function Loader({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

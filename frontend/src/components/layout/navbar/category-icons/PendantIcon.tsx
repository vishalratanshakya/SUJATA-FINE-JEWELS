export function PendantIcon({ className = '', size = 24 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2V8" />
      <path d="M12 8L15 14L12 20L9 14L12 8Z" />
      <circle cx="12" cy="4" r="1" />
    </svg>
  );
}

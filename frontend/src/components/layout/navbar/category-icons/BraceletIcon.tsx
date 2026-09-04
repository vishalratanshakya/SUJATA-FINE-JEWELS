export function BraceletIcon({ className = '', size = 24 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="12" rx="9" ry="4" />
      <path d="M7 10C7 10 9 12 12 12C15 12 17 10 17 10" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  );
}

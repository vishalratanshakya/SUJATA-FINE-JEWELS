export function BanglesIcon({ className = '', size = 24 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="9" rx="8" ry="3" />
      <ellipse cx="12" cy="13" rx="8" ry="3" />
      <ellipse cx="12" cy="17" rx="8" ry="3" />
    </svg>
  );
}

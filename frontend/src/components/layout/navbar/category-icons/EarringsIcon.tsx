export function EarringsIcon({ className = '', size = 24 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 4V8C8 10 10 12 12 12C14 12 16 10 16 8V4" />
      <circle cx="12" cy="16" r="2" />
      <path d="M12 12V14" />
      <path d="M12 18V20" />
    </svg>
  );
}

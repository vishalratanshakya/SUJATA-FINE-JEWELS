export function RingIcon({ className = '', size = 24 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="14" r="6" />
      <path d="M12 6L14 8H10L12 6Z" />
      <path d="M10 8L8 10" />
      <path d="M14 8L16 10" />
    </svg>
  );
}

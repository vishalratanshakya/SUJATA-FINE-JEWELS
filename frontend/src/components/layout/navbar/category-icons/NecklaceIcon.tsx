export function NecklaceIcon({ className = '', size = 24 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 4C5 12 8 18 12 20C16 18 19 12 19 4" />
      <circle cx="12" cy="20" r="2" />
      <path d="M5 4L7 4" />
      <path d="M19 4L17 4" />
    </svg>
  );
}

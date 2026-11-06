/** Monogramme MR Consulting : deux traits qui convergent vers un point (chaos → maîtrise). */
export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg className="logo" width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="30" height="30" rx="8" fill="none" stroke="#f3f1ec" strokeOpacity="0.35" strokeWidth="1.5" />
      <path d="M8 22V10l6 8 6-8v12" fill="none" stroke="#f3f1ec" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24.5" cy="22" r="1.8" fill="#4d7cff" />
    </svg>
  );
}

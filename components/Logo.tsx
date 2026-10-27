/** Monogramme MR Consulting : deux traits qui convergent vers un point (chaos → maîtrise). */
export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg className="logo" width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="mr-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3d6bff" />
          <stop offset="1" stopColor="#36e2ff" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="8" fill="none" stroke="url(#mr-g)" strokeWidth="1.5" />
      <path d="M8 22V10l6 8 6-8v12" fill="none" stroke="#e9f1ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24.5" cy="22" r="1.8" fill="#36e2ff" />
    </svg>
  );
}

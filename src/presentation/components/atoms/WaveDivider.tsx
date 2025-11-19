export function WaveDivider() {
  return (
    <div className="relative h-24 w-full overflow-hidden">
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full transition-colors duration-500 ease-in-out"
        style={{ fill: "var(--wave-divider)" }}
      >
        <path d="M0,100 C240,20 480,20 720,60 C960,100 1200,100 1440,60 L1440,100 L0,100 Z" />
      </svg>
    </div>
  );
}


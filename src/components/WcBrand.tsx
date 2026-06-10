export function WcEmblem({ className }: { className?: string }) {
  return (
    <img
      src="/wc26-emblem.svg"
      alt=""
      className={className}
      aria-hidden
      loading="lazy"
    />
  );
}

export function WcWordmark({ className }: { className?: string }) {
  return (
    <img
      src="/wc26-wordmark.svg"
      alt="FIFA World Cup 2026"
      className={className}
      loading="lazy"
    />
  );
}

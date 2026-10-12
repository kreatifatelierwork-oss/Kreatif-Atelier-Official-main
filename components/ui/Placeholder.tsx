/** A clearly marked, neutral stand-in for an image or video the owner will supply. */
export function Placeholder({ label = "Artwork to be supplied", className = "" }: { label?: string; className?: string }) {
  return (
    <div role="img" aria-label={label} className={`placeholder ${className}`}>
      {label}
    </div>
  );
}

import Image from "next/image";

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase() || "·";
}

/**
 * Drop-in replacement for the Image-with-fill avatar pattern.
 * Renders the photo when src is present, or a brand-tinted initials disc otherwise.
 * Caller controls the wrapper size + shape (rounded-full, rounded-2xl, ring, etc.).
 */
export function AvatarFill({
  name,
  src,
  sizes,
}: {
  name: string;
  src?: string;
  sizes: string;
}) {
  if (src) {
    return <Image src={src} alt="" fill className="object-cover" sizes={sizes} />;
  }
  return (
    <span
      aria-hidden
      className="flex h-full w-full items-center justify-center bg-brand/15 font-semibold uppercase text-brand-dim dark:bg-brand/25 dark:text-brand-glow"
    >
      {initialsOf(name)}
    </span>
  );
}

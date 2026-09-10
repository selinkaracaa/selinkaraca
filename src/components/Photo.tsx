import WIDTHS from "@/data/images.json";

type Name = keyof typeof WIDTHS;

const srcset = (name: Name, ext: "avif" | "webp") =>
  (WIDTHS[name] as number[]).map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(", ");

/** the JPEG fallback the optimizer writes (second-widest) */
const fallback = (name: Name) => {
  const w = WIDTHS[name] as number[];
  return `/img/${name}-${w[Math.max(0, w.length - 2)]}.jpg`;
};

/**
 * Responsive photograph. Serves AVIF, then WebP, then JPEG.
 *
 * `sizes` should describe how wide the image renders at each breakpoint so the
 * browser picks the smallest sufficient file — get this wrong and the srcset
 * does nothing.
 */
const Photo = ({
  name,
  alt,
  sizes,
  className,
  priority = false,
}: {
  name: Name;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) => (
  <picture>
    <source type="image/avif" srcSet={srcset(name, "avif")} sizes={sizes} />
    <source type="image/webp" srcSet={srcset(name, "webp")} sizes={sizes} />
    <img
      src={fallback(name)}
      alt={alt}
      className={className}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      // @ts-expect-error fetchpriority is valid HTML, React types lag
      fetchpriority={priority ? "high" : undefined}
      decoding={priority ? "sync" : "async"}
    />
  </picture>
);

export default Photo;

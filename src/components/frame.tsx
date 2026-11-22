import { FrameImage } from "@/components/frame-image";
import { rv } from "@/components/rv";

type FrameProps = {
  /** "plate" is the orange image plate, "field" the neutral frame for screenshots. */
  variant: "plate" | "field";
  className?: string;
  src?: string;
  alt?: string;
  /** Shown in the middle of the frame while there is no image yet. */
  label: string;
  sizes?: string;
  priority?: boolean;
  as?: "figure" | "div";
  /**
   * How the frame is uncovered: "scroll" when it enters the viewport (default), "load" as part of a
   * page-head entrance (pure CSS, for frames above the fold), "none" when a parent drives it.
   */
  reveal?: "scroll" | "load" | "none";
};

/** An image slot. Falls back to the design's placeholder until `src` is set. */
export function Frame({
  variant,
  className,
  src,
  alt,
  label,
  sizes = "(max-width: 860px) 100vw, 1080px",
  priority,
  as: Tag = "figure",
  reveal = "scroll",
}: FrameProps) {
  const cls = [variant, className, reveal === "load" && "rv-load"].filter(Boolean).join(" ");
  const arrive = reveal === "scroll" ? rv("wipe") : {};
  if (src) {
    return (
      <Tag className={cls} {...arrive}>
        {/* The grain stays under the picture: it is what a late image fades in over. */}
        {variant === "plate" && <div className="plate__img" />}
        <FrameImage
          className="field__shot"
          src={src}
          alt={alt ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          // Animations (GIF, and animated WebP in the galleries) are served as they are.
          unoptimized={/\.(gif|webp)$/.test(src)}
        />
      </Tag>
    );
  }
  return (
    <Tag className={cls} {...arrive}>
      {variant === "plate" && <div className="plate__img" />}
      <span className="plate__slot">{label}</span>
    </Tag>
  );
}

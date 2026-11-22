import fs from "node:fs";
import path from "node:path";

export type Size = { width: number; height: number };

/**
 * Reads the pixel size from the header of a JPEG, PNG, GIF or WebP file, so pages can give each
 * image its own shape at build time without an image library. Returns null for anything else.
 */
export function readImageSize(buf: Uint8Array): Size | null {
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const ascii = (at: number, len: number) => String.fromCharCode(...buf.subarray(at, at + len));

  // PNG: the IHDR chunk always comes first.
  if (buf.length >= 24 && buf[0] === 0x89 && ascii(1, 3) === "PNG") {
    return { width: view.getUint32(16), height: view.getUint32(20) };
  }
  // GIF: logical screen size, little-endian.
  if (buf.length >= 10 && ascii(0, 3) === "GIF") {
    return { width: view.getUint16(6, true), height: view.getUint16(8, true) };
  }
  // WebP: lossy (VP8), lossless (VP8L) or extended (VP8X).
  if (buf.length >= 30 && ascii(0, 4) === "RIFF" && ascii(8, 4) === "WEBP") {
    const chunk = ascii(12, 4);
    if (chunk === "VP8 ") return { width: view.getUint16(26, true) & 0x3fff, height: view.getUint16(28, true) & 0x3fff };
    if (chunk === "VP8L") {
      const bits = view.getUint32(21, true);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (chunk === "VP8X") {
      const w = buf[24]! | (buf[25]! << 8) | (buf[26]! << 16);
      const h = buf[27]! | (buf[28]! << 8) | (buf[29]! << 16);
      return { width: w + 1, height: h + 1 };
    }
    return null;
  }
  // JPEG: walk the segments until a start-of-frame marker.
  if (buf.length >= 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let at = 2;
    while (at + 9 < buf.length) {
      if (buf[at] !== 0xff) return null;
      const marker = buf[at + 1]!;
      const length = view.getUint16(at + 2);
      const isFrame = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (isFrame) return { width: view.getUint16(at + 7), height: view.getUint16(at + 5) };
      at += 2 + length;
    }
  }
  return null;
}

/** The size of an image under /public, by its site path (e.g. "/projects/x/cover.jpg"). */
export function publicImageSize(src: string): Size | null {
  try {
    return readImageSize(fs.readFileSync(path.join(process.cwd(), "public", src)));
  } catch {
    return null;
  }
}

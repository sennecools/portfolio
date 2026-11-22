const LANGUAGES: Record<string, string> = {
  ts: "TypeScript",
  tsx: "TypeScript",
  js: "JavaScript",
  jsx: "JavaScript",
  rs: "Rust",
  rust: "Rust",
  java: "Java",
  py: "Python",
  sh: "Shell",
  bash: "Shell",
  toml: "TOML",
  json: "JSON",
  yaml: "YAML",
  css: "CSS",
  html: "HTML",
};

/**
 * Split a code fence's info string into a display language and a file name.
 * "language-ts" -> TypeScript; "language-rs:src/plan.rs" -> Rust + src/plan.rs.
 */
export function parseFence(className: string | undefined): { language: string; file: string } {
  const info = (className ?? "").replace(/^language-/, "");
  const [lang = "", ...rest] = info.split(":");
  return { language: LANGUAGES[lang.toLowerCase()] ?? lang, file: rest.join(":") };
}

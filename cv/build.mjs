// Builds the CV in Dutch and English as PDFs in /public.
// Usage: npm run cv   (set CHROME_PATH if Brave/Chrome is somewhere else)
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { content } from "./content.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..");
const out = path.join(here, ".build");
fs.mkdirSync(out, { recursive: true });

const browser =
  process.env.CHROME_PATH ??
  [
    "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe",
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
  ].find((p) => fs.existsSync(p));
if (!browser) throw new Error("No Chromium browser found; set CHROME_PATH.");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function render(c) {
  const section = (title, body) => `<section><h2>${esc(title)}</h2>${body}</section>`;
  const entries = (items) =>
    items
      .map(
        (e) => `<div class="entry">
  <div class="entry__head"><h3>${esc(e.title)}</h3><span class="when">${esc(e.when)}</span></div>
  ${e.where ? `<p class="where">${esc(e.where)}</p>` : ""}
  ${e.points?.length ? `<ul>${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
</div>`,
      )
      .join("");
  const projects = c.projects
    .map(
      (p) => `<div class="project"><div class="project__head"><h3>${esc(p.title)}</h3><span class="stack">${esc(p.stack)}</span></div><p>${esc(p.text)}</p></div>`,
    )
    .join("");
  const skills = c.skills.map((s) => `<div class="skill"><dt>${esc(s.label)}</dt><dd>${esc(s.value)}</dd></div>`).join("");
  const contact = c.contact.map((l) => `<li>${l.href ? `<a href="${l.href}">${esc(l.text)}</a>` : esc(l.text)}</li>`).join("");

  return `<!doctype html><html lang="${c.lang}"><head><meta charset="utf-8"><title>${esc(c.name)} — CV</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..700&family=DM+Mono:wght@400;500&family=Instrument+Sans:wght@400;500;600&display=block" rel="stylesheet">
<style>
@page{size:A4;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
:root{--ink:#16130f;--muted:#5d564d;--line:#e4ddd3;--h:#ff4f1f;--h-ink:#c83a12}
html,body{width:210mm;height:297mm}
body{font-family:"Instrument Sans",sans-serif;font-size:9.9pt;line-height:1.45;color:var(--ink);background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{display:grid;grid-template-columns:62mm 1fr;height:297mm}
aside{background:#16130f;color:#f3ede4;padding:16mm 8mm 14mm 11mm;display:flex;flex-direction:column;gap:8mm}
main{padding:16mm 13mm 14mm 10mm;display:flex;flex-direction:column;gap:7.5mm}
h1{font-family:Archivo,sans-serif;font-stretch:66%;font-weight:300;font-size:34pt;line-height:.92;letter-spacing:-.01em}
.role{font-family:"DM Mono",monospace;font-size:7.6pt;text-transform:uppercase;letter-spacing:.06em;color:var(--h);margin-top:3mm}
aside h2{font-family:"DM Mono",monospace;font-size:7.2pt;font-weight:500;text-transform:uppercase;letter-spacing:.08em;color:#a59c90;margin-bottom:2mm}
aside ul{list-style:none;padding-left:0;margin-top:0;display:flex;flex-direction:column;gap:1.1mm;font-size:8.6pt}
aside a{color:#f3ede4;text-decoration:none}
.skill{margin-bottom:2.2mm}
.skill dt{font-family:"DM Mono",monospace;font-size:7pt;text-transform:uppercase;letter-spacing:.06em;color:#a59c90}
.skill dd{font-size:8.6pt;line-height:1.38}
.avail{border:1px solid #3a342d;border-left:2px solid var(--h);padding:2.5mm 3mm;font-size:8.4pt;line-height:1.4}
.avail strong{display:block;font-family:"DM Mono",monospace;font-weight:500;font-size:7pt;text-transform:uppercase;letter-spacing:.06em;color:var(--h);margin-bottom:1mm}
main h2{font-family:"DM Mono",monospace;font-size:7.6pt;font-weight:500;text-transform:uppercase;letter-spacing:.08em;color:var(--h-ink);padding-bottom:1.4mm;border-bottom:1px solid var(--line);margin-bottom:2.4mm}
.intro{font-family:Archivo,sans-serif;font-stretch:80%;font-size:12pt;line-height:1.38;font-weight:400}
.entry{margin-bottom:4mm}.entry:last-child{margin-bottom:0}
.entry__head,.project__head{display:flex;justify-content:space-between;align-items:baseline;gap:4mm}
h3{font-size:10.3pt;font-weight:600;white-space:nowrap}
.when,.stack{font-family:"DM Mono",monospace;font-size:7.4pt;color:var(--muted);white-space:nowrap}
.where{color:var(--muted);font-size:8.8pt}
ul{padding-left:3.6mm;margin-top:.8mm}
main li{margin-bottom:.4mm}
main li::marker{color:var(--h)}
.projects{display:grid;grid-template-columns:1fr 1fr;gap:4.2mm 6mm}
.project p{font-size:9.1pt;color:#3b352e;margin-top:.4mm}
</style></head><body><div class="page">
<aside>
  <div><h1>${c.name.split(" ").map(esc).join("<br>")}</h1><p class="role">${esc(c.role)}</p></div>
  <div><h2>${esc(c.labels.contact)}</h2><ul>${contact}</ul></div>
  <div class="avail"><strong>${esc(c.labels.availability)}</strong>${esc(c.availability)}</div>
  <div><h2>${esc(c.labels.skills)}</h2><dl>${skills}</dl></div>
  <div><h2>${esc(c.labels.languages)}</h2><ul>${c.languages.map((l) => `<li>${esc(l)}</li>`).join("")}</ul></div>
</aside>
<main>
  <p class="intro">${esc(c.intro)}</p>
  ${section(c.labels.experience, entries(c.experience))}
  ${section(c.labels.projects, `<div class="projects">${projects}</div>`)}
  ${section(c.labels.education, entries(c.education))}
</main>
</div></body></html>`;
}

for (const c of content) {
  const html = path.join(out, `cv-${c.lang}.html`);
  fs.writeFileSync(html, render(c));
  const pdf = path.join(root, "public", `senne-cools-cv-${c.lang}.pdf`);
  execFileSync(browser, [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--virtual-time-budget=8000",
    `--print-to-pdf=${pdf}`,
    pathToFileURL(html).href,
  ], { stdio: "ignore" });
  console.log("wrote", path.relative(root, pdf));
}

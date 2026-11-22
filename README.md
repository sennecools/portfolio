# Senne Cools — Portfolio

Personal portfolio and blog. Next.js (App Router), TypeScript, plain CSS, MDX for posts.

## Run it

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

| Command             | What it does                    |
| ------------------- | ------------------------------- |
| `npm run dev`       | Development server              |
| `npm run build`     | Production build                |
| `npm test`          | Unit tests (Vitest)             |
| `npm run lint`      | ESLint                          |
| `npm run typecheck` | TypeScript, no emit             |

## Pages

Every page exists in English at the root and in Dutch under `/nl`.

| Route                        | Source                                     |
| ---------------------------- | ------------------------------------------ |
| `/`, `/nl`                   | `src/app/[locale]/page.tsx`                |
| `/work/<slug>`, `/nl/work/…` | `src/app/[locale]/work/[slug]/page.tsx`    |
| `/blog`, `/nl/blog`          | `src/app/[locale]/blog/page.tsx`           |
| `/blog/<slug>`, `/nl/blog/…` | `src/app/[locale]/blog/[slug]/page.tsx`    |
| `/blog/rss.xml`              | `src/app/blog/rss.xml/route.ts` (English)  |

## Languages

`src/middleware.ts` serves English without a prefix (it rewrites `/blog` to `/en/blog` internally,
and redirects `/en/blog` to `/blog`). Other languages keep their prefix.

- **Interface text** (buttons, headings, the form, the 404 page) — `src/i18n/dictionary.ts`.
- **Languages and URLs** — `src/i18n/config.ts`. Write links with `localePath(locale, "/blog")`.

To add a language: add its code to `locales` in `src/i18n/config.ts` with a name, a date format and an
Open Graph locale, add its dictionary, then run `npm run typecheck`. Every piece of content that still
needs a translation shows up as an error. Blog posts stay in English; on other languages they are
marked as English and say so under the title.

## Editing content

All copy lives in `src/content`, none of it in components. Text that differs per language is written
as `{ en: "…", nl: "…" }`; a plain string reads the same in every language (a name, a version).

- **About you** — `src/content/site.ts`. Values in `[brackets]` are placeholders still to fill in.
- **Projects** — one file per project in `src/content/projects`, listed in order in
  `src/content/projects.ts`. Leave a project out of that list to take it off the site (Sen's Network is
  kept that way). `placement` decides where it shows on the home page: `featured` (one, large),
  `strand` (the three cards) or `index` (the list). Leave `challenges` empty unless the problem is one a
  reader would follow.
- **Blog posts** — one `.mdx` file per post in `src/content/posts`. The file name is the URL.

  ```mdx
  ---
  title: "Title of the post"
  date: "2026-10-12"
  summary: "One or two sentences shown on the blog index and under the title."
  tags: [Updates, packctl]
  draft: true
  ---

  Body in Markdown.
  ```

  Posts with `draft: true` show up in `npm run dev` and are left out of production builds.
  A code fence can carry a file name: ` ```rs:src/plan.rs `.

### Images

| What              | Where                                                         |
| ----------------- | ------------------------------------------------------------- |
| Project cover     | `public/projects/<slug>/cover.png`, then set `cover` on the project |
| Project gallery   | any file in `public/`, set `src` on the gallery item          |
| Post cover        | any file in `public/`, set `cover` in the post frontmatter     |
| Your photos       | `public/about/hero.jpg` (hero) and `about.jpg` (About), set in `site.photos` |
| CV                | `public/senne-cools-cv-en.pdf` and `-nl.pdf`, built from `cv/` (see below) |

Until an image is set, the design's orange plate is shown in its place.

## Contact form

The form posts to a server action (`src/app/actions/contact.ts`) that validates the input,
rate-limits by IP and sends the message through [Resend](https://resend.com).

Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`. Without a key the form tells
visitors to email you directly instead of failing silently.

## Deploying

The site is built for [Vercel](https://vercel.com): import the GitHub repository, keep the defaults and
add `RESEND_API_KEY` (and optionally `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`) under Environment Variables.
The site lives on <https://sennerd.com> (`www` redirects there). That address is used for RSS, the sitemap and
social cards; set `NEXT_PUBLIC_SITE_URL` to override it.

## Design

The CSS in `src/app/globals.css` is taken from the design file class for class, so the two can be
compared directly. The whole palette derives from one signal colour, `--h`, on `.page`.

Entrance, scroll and typing animations from the design are intentionally not implemented yet.

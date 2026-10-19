# Honda Civic EJ9 (1997) — build log

A photo journal of the full self-restoration of a 1997 Honda Civic EJ9, nicknamed *Żaba* (Polish for "frog") — from bare shell to finished car. The site lives at <https://civic.zalejski.pl> and is written in Polish.

Static site built with [Hugo](https://gohugo.io/), organized as a set of thematic chapters (bodywork, paint, engine, etc.) rather than a chronological blog — most source photos have no reliable capture date, so grouping by topic reads more naturally.

## Prerequisites

- Hugo (extended version): `brew install hugo`
- ImageMagick, for fixing photo orientation when needed: `brew install imagemagick`

## Running locally

```bash
cd ~/civic/
hugo server -D
```

Open http://localhost:1313/. The server watches `content/` and `layouts/` and reloads automatically on save.

## Site structure

```
content/budowa/<chapter-slug>/
  index.md        # chapter text + front matter
  photo1.jpg       # any number of images/videos — all become part of the gallery
  photo2.jpg
```

Each chapter is a Hugo **page bundle**: a folder containing `index.md` plus its own images. Hugo picks up every image/video file in the folder automatically — you don't need to list them anywhere.

### Chapter front matter

```yaml
---
title: "Chapter title"
weight: 20 # controls ordering on the home page — lower comes first
cover: "photo1.jpg" # filename (must exist in the same folder) used as the home page thumbnail
---
Chapter description goes here, in Markdown.
```

## Common tasks

### Add photos to an existing chapter

Drop the files straight into that chapter's folder, e.g.:

```bash
cp ~/Downloads/IMG_1234.jpg content/budowa/silnik/
```

That's it — no config, no front matter changes needed. Supported: `.jpg`, `.jpeg`, `.webp`, `.mp4`, `.mov`. **HEIC is not supported** — convert first:

```bash
sips -s format jpeg -Z 2400 IMG_1234.HEIC --out content/budowa/silnik/IMG_1234.jpg
```

### Fix sideways/upside-down photos

Some phone photos carry an EXIF orientation flag that Hugo's image resizer doesn't always respect. If a new photo looks rotated on the site, bake the rotation into the pixels once, in place:

```bash
mogrify -auto-orient content/budowa/silnik/IMG_1234.jpg
```

Safe to run on a whole chapter folder or the entire tree — it's a no-op for images that are already upright.

### Add a new chapter

```bash
mkdir content/budowa/nowy-rozdzial
```

Create `content/budowa/nowy-rozdzial/index.md` with front matter (see above — pick a `weight` between the two chapters you want it to sit between), then copy in the photos.

### Reorder chapters

Edit the `weight:` value in each chapter's `index.md`. Leave gaps (10, 20, 30…) so you can slot new chapters in later without renumbering everything.

### Change a chapter's title, text, or cover photo

Edit `content/budowa/<chapter>/index.md` directly — `title`, `cover`, and the Markdown body below the `---` fence.

### Site title / tagline

Edit `hugo.toml` at the repo root (`title`, `params.subtitle`).

## Production build

```bash
hugo --minify
```

Output goes to `public/` (gitignored — it's generated, not source).

## Deployment (GitHub Pages)

`.github/workflows/deploy.yml` builds the site with Hugo and publishes it via GitHub Pages on every push to `main` (official `actions/*` only — no third-party actions). To activate it on a fresh repo:

1. Push this repo to GitHub.
2. Repo → **Settings → Pages → Build and deployment → Source**: select **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the Actions tab) — the site will be live at `https://<user>.github.io/<repo>/`, or your custom domain if configured under Pages settings.

The workflow reads the correct base URL automatically from `actions/configure-pages`, so no need to hardcode it in `hugo.toml`.

## Notes

- Gallery images use a lightbox (`static/js/lightbox.js`, vanilla JS, no dependencies) with next/prev and keyboard navigation — nothing to configure.
- All internal links are root-relative (no hardcoded host), so the site works the same on `localhost` and after deployment.
- Original, full-resolution photos live in `~/Civic` — this repo only contains web-sized copies (long edge ≤ 2400px).

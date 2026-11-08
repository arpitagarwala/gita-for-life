# Gita for Life

A free Bhagavad Gita companion by [arpitagarwala](https://arpitagarwala.com).

## Run and validate

Requires Node.js 22 or 24.

```sh
npm ci
npm run check
npm run dev
```

`npm run build` exports the site to `out/`. `npm start` previews that export at http://localhost:3107.

## Guidance

The question form searches all 701 verse entries and their bilingual reading notes. It no longer selects a prepared answer from the eight discovery themes.

- A compact, multilingual static embedding table matches related meanings. All 256 semantic dimensions are retained with a pruned English/Hindi vocabulary and 4-bit word weights.
- Full-query and clause similarities, lexical relevance, everyday-to-scripture concept expansion, and passage diversity rank the corpus.
- The response assembles cited interpretations, complementary connections, and practical steps using recognized circumstances, deadlines and constraints. Additional details rerun the search.
- Explicit requests to connect verse references are honoured. Unsafe situations are handled before loading the matching assets.
- This is meaning-based retrieval with structured response composition. It is not a generative conversational model and cannot reliably understand every nuance, negation, unusual wording or life situation. The interface asks for clarification when evidence is weak.

Runtime matching files total approximately 4.93 MB, plus the scripture corpus and worker. They load when guidance is first requested and can be cached for later use. Matching runs in a dedicated worker, without a GPU requirement. All assets and requests are served by this static site; the question itself is never sent to a server. No hosted inference, vector database, account, API key or paid service is required. GitHub and Vercel free-plan usage limits still apply; unlimited free bandwidth is not promised.

## Other features

- Sanskrit, transliteration, English and Hindi reading
- App-wide English/Hindi selection
- Detailed explanations for all 701 shlokas: individual bilingual insights, 148 labeled passage notes, chapter context, practical guidance, and reflection prompts
- Corpus search, local bookmarks, reading position, private journal and export
- Day/night modes and larger text
- Read aloud and offline caching
- Installable PWA with Android/desktop install prompts, iOS instructions, PNG/maskable/Apple icons, and safe update notices
- Subtle page, section, navigation, disclosure, and interaction motion with reduced-motion support
- Static metadata, canonical links, robots and sitemap

## Rebuilding the matching data

Ordinary development, CI and Vercel builds use the committed compact assets; they do not download a model or need Python.

If scripture or reading notes change, rebuild the corpus and index. The original pinned model source is downloaded only on the maintainer's machine (about 512 MB); it is not shipped to visitors.

```sh
python -m pip install -r scripts/requirements-semantic.txt
python scripts/download-semantic-source.py
node scripts/prepare-data.mjs
python scripts/build-semantic-model.py
```

If a corpus change makes `prepare-data.mjs` reject an outdated index, the updated corpus file has already been written; run the Python exporter next, then rerun validation. Copy the generated `.cache/gita-semantic/parity-fixtures.json` to `scripts/fixtures/guidance-parity.json` when regenerating weights. Commit the compact assets and fixtures, and bump the service-worker cache version when changing the runtime assets.

The model source is pinned to MinishLab potion-multilingual-128M revision `73908c3438cf03b6a01bcb9611d62b23d0726f08`, under MIT. Provenance and retained license are in `public/guidance/LICENSE.txt`.

## Data and privacy

The inherited scripture dataset comes from Vedic Scriptures. English translation: Swami Sivananda; Hindi translation: Swami Tejomayananda. Original modern explanations include 701 individual verse insights, 148 passage notes, and clearly labeled chapter study guidance. App-authored replacement renderings are credited on the affected pages and listed under About. This edition includes Arjuna's opening question in chapter 13 and therefore has 701 entries. Retain the source attributions and review THIRD_PARTY_NOTICES.md when redistributing.

Questions and follow-up details exist only in the current page's memory. Notes, bookmarks and display preferences are stored on the device. Export notes before clearing browsing data. There are no tracking scripts or advertising.

## Hosting

The intended domain is https://gita.arpitagarwala.com. Vercel uses the checked-in static preset and build configuration. GitHub `main` triggers production builds. No server functions are needed.

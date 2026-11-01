# Gita for Life

An accessible, free Bhagavad Gita companion by [arpitagarwala](https://arpitagarwala.com).

## Run

Requires Node.js 22 or 24.

```sh
npm ci
npm run dev
```

## Validate and build

```sh
npm run check
npm run build
```

The production build exports all 18 chapter pages and 701 verse pages to `out/`. No runtime backend or API keys are required. Vercel uses the checked-in configuration. Connect this GitHub repository to Vercel and use its Hobby plan for noncommercial use, subject to its usage limits. Do not enable paid add-ons or paid AI services.

## Features

- App-wide English/Hindi language setting, Sanskrit and transliteration
- English and Hindi explanations for all 701 shlokas, with clearly identified shared passage context
- Keyword search across the corpus, loaded only when requested
- Eight curated life themes with connected verses and practical reflections
- Local bookmarks, reading position, journal and text export
- Day/night modes and larger-text option
- Browser read-aloud using device voices (may use the browser's network speech service)
- Offline cache for the home page, dataset, and pages visited online
- Static metadata, canonical links, robots and sitemap

## Data and attribution

The preexisting dataset comes from Vedic Scriptures: https://github.com/vedicscriptures/bhagavad-gita-api. English: Swami Sivananda. Hindi: Swami Tejomayananda. This edition includes chapter 13's opening question and therefore has 701 entries. Original modern reflections are not translations. The former long commentaries are not served. Do not assume that ancient Sanskrit and modern translations share the same copyright status; retain attribution and review the source terms when redistributing. See THIRD_PARTY_NOTICES.md.

## Privacy and operation

No analytics, logins, accounts, database, paid runtime services. Browser localStorage holds notes/settings/bookmarks. User questions are matched locally and not stored. Export notes before clearing browser data. No cloud backup or device synchronization. Service-worker cache is opportunistic; not all 700+ pages download automatically. Hosting provider usage caps apply and zero-cost operation at unlimited scale is not promised.

## Domain

Intended canonical URL: https://gita.arpitagarwala.com. If deploying to a different permanent domain, update metadataBase, robots.ts and sitemap.ts. The domain uses external Cloudflare DNS; add the exact CNAME target provided by Vercel for the gita subdomain, without changing the apex domain's records.

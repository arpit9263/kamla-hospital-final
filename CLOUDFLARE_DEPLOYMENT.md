# Cloudflare Pages Deployment

Use these settings in Cloudflare Pages:

- Framework preset: Vite or None
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`
- Node.js version: 20 or 22

## Optional analytics

Cloudflare Web Analytics is already supported through `src/components/site/CloudflareAnalytics.tsx`.

Add this environment variable in Cloudflare Pages only if you have a Cloudflare Web Analytics token:

```txt
VITE_CF_ANALYTICS_TOKEN=your_cloudflare_token_here
```

## Domain updates needed

The website currently uses `https://kamlahospitaljhansi.in/` as the production domain for SEO, canonical URLs, sitemap and robots.txt.
If the final hospital domain is different, replace it in:

- `src/lib/seo.ts`
- `public/sitemap.xml`
- `public/robots.txt`
- `index.html`

## Rewan Tech Solutions credit

Developer credit is included in the footer and SEO structured data:

https://rewantechsolutions.com/


## Formspree form setup

This project is ready for Formspree. Before production launch, create two Formspree forms and add these Cloudflare Pages environment variables:

```txt
VITE_FORMSPREE_APPOINTMENT_ENDPOINT=https://formspree.io/f/mpqbjnob
VITE_FORMSPREE_CONTACT_ENDPOINT=https://formspree.io/f/mvzlbyvn
```

Add them in Cloudflare Pages → Settings → Environment variables, then redeploy the site. Until these values are added, the forms will show a safe message and will not silently lose patient enquiries.

## Favicon assets

The project includes a complete favicon set:

```txt
/public/favicon.ico
/public/apple-touch-icon.png
/public/android-chrome-192x192.png
/public/android-chrome-512x512.png
/public/site.webmanifest
```

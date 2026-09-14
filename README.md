# Nafiz Basher Alif — academic website

Next.js 14 (App Router), TypeScript. Monochrome academic design.

## Run

    npm install
    npm run dev      # http://localhost:3000

    npm run build    # production build
    npm run start    # serve production build

## Routes

    /               Home
    /research       Research agenda, research plan, methods
    /commentary     Commentary (Substack-style posts)
    /commentary/write   Form for publishing to Commentary (passphrase protected)
    /publications   Publications and working papers
    /writing        Academic and public writing
    /contact        Contact details and form
    /cv.pdf         CV (static file in /public)

## Editing content

Almost all text lives in lib/site.ts. Edit there rather than in the page
components.

### Still to add

These are intentionally empty strings in lib/site.ts because the URLs were
not available. Any link with an empty URL is hidden, so nothing renders
broken. Fill them in and they appear automatically:

    orcidUrl           <- the footer shows an ORCID icon once set

### Replacing the CV

Overwrite public/cv.pdf.

## Forms

### Contact form

components/ContactForm.tsx POSTs to app/api/contact/route.ts, which sends
the message by email through Resend (https://resend.com). Set RESEND_API_KEY
(see .env.example). Until it is set the form shows a "not sent" state with
a mailto fallback rather than pretending to send.

### Commentary

Posts are written at /commentary/write and appear on /commentary
immediately. Storage is chosen automatically in lib/commentary.ts:

  - Upstash Redis when KV_REST_API_URL / KV_REST_API_TOKEN are set (on
    Vercel: Storage > Upstash for Redis, which injects them). Publish from
    the live site.
  - data/commentary.json otherwise. Works in `npm run dev`; commit the
    file and deploy to publish. Writes fail on a read-only host.

Publishing requires the passphrase in COMMENTARY_ADMIN_KEY. In development
with no key set, publishing is open.

Post text is plain text with a blank line between paragraphs. A small
Markdown subset is understood: ## Heading, > quote, - list, 1. list, ---,
**bold**, *italic*, [text](url). See components/PostBody.tsx.

## Unpublished pages

app/_unpublished/ holds pages that are switched off but kept for later
(currently IDRG). See app/_unpublished/README.md to restore one.

## Animation

Scroll reveals use components/Reveal.tsx (IntersectionObserver plus CSS
transitions, no animation library). All motion respects
prefers-reduced-motion.

## Typography

    Serif  - Iowan Old Style / Palatino stack, for the research statement,
             page titles, and publication titles
    Sans   - Inter, for navigation, metadata, labels, buttons, forms

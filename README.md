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
    /idrg           Institutional Dysfunction Research Group + join form
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

    orcidUrl
    linkedinUrl
    substackUrl        <- the Writing page links to this once set
    googleScholarUrl

### Replacing the CV

Overwrite public/cv.pdf.

## Forms

The IDRG join form and the contact form are fully built and validated in
the UI, but no backend is connected. On submit they show a confirmation
state and direct the user to email instead - they do not silently pretend
to send. To wire them up, add a route handler (e.g.
app/api/contact/route.ts) and POST to it from components/ContactForm.tsx
and components/JoinForm.tsx.

## Animation

Scroll reveals use components/Reveal.tsx (IntersectionObserver plus CSS
transitions, no animation library). All motion respects
prefers-reduced-motion.

## Typography

    Serif  - Iowan Old Style / Palatino stack, for the research statement,
             page titles, and publication titles
    Sans   - Inter, for navigation, metadata, labels, buttons, forms

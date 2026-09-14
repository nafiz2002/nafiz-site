# Unpublished pages

Folders that start with an underscore are ignored by the Next.js App Router,
so nothing in here is routable. The code is kept intact so a page can be
brought back later.

## Restoring IDRG

    git mv app/_unpublished/idrg app/idrg
    git mv app/idrg/JoinForm.tsx components/JoinForm.tsx

Then fix the import in app/idrg/apply/page.tsx back to
`@/components/JoinForm`, and re-add the links that were removed when it was
unpublished: the nav item in components/Nav.tsx, the footer column in
components/Footer.tsx, the CTA section at the bottom of app/page.tsx, and
the button at the bottom of app/research/page.tsx.

All IDRG copy still lives in lib/site.ts (idrg, idrgAreas, idrgProjects,
idrgCurrent, idrgMethods, idrgActivities, idrgPeople).

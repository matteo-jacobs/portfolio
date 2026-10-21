# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: people at design and development agencies who are looking for an intern. They are checking a student's portfolio, probably next to many others, to judge craft, range and fit, and to decide whether to get in touch.

Secondary (temporary): people following Matteo's exchange semester at Appalachian State University (Boone, NC), through the AppState section.

## Product Purpose

The personal portfolio of Matteo Jacobs, a Digital Design and Development student at Howest Kortrijk. It shows his project work and who he is, so that an agency reviewer can see he both designs and builds, and contacts him about an internship. Success means a reviewer opens a project, gets a clear picture of what he did, and sends a message through the contact form or by email.

## Positioning

Matteo is a designer who also develops. The site itself is hand-built in React, so it is evidence of that claim. Web design is his home turf, and branding is what excites him most. The personal side (ski instructor, "Goofball" among his listed roles) is a deliberate part of how he presents himself, not filler.

## Operating Context

- Agency reviewers usually skim: the home page, the latest work, one or two project pages, the about page, then contact.
- Each project page can link out to the Figma file, the Figma prototype and Notion, so reviewers can check the process behind the result.
- Contact goes through the footer form on every page (sent via FormSubmit to his email), or directly by phone or email.

## Capabilities and Constraints

- Stack already in place: React 19 + Vite + React Router, deployed on Vercel (SPA rewrite in `vercel.json`).
- Routes: `/` home, `/about`, `/portfolio` (overview) with `/portfolio/:projectSlug`, `/appstate`, plus a 404.
- Projects are folder-driven: each folder in `src/data/Projects/` holds `Information.json` (title, industry, scope of work, tools, details, Figma/prototype/Notion links, `mainColor`, `secondaryColor`, optional `appstate: true`), a cover, an optional `media.mp4` and an `Images/` folder. Each project carries its own main and secondary colour.
- Projects flagged `appstate: true` appear on `/appstate` and not on `/portfolio`.
- **AppState is temporary:** the section covers the exchange semester at Appalachian State University and will be removed afterwards. Keep it easy to remove; do not tie other pages to it.
- The real project set will be mostly web/UI work. The projects in the repo right now are placeholders.

## Brand Commitments

- Name used on the site: "Matteo's Portfolio". Contact name: Matteo Jacobs.
- Listed roles: Developer, Designer, Problem solver, Goofball.
- Voice: first person, warm, honest and a bit playful ("learning, failing, and growing").
- Personal imagery: Matteo skiing (hero and about photos). Skiing and the mountains are part of his identity.
- Existing logo mark (`src/assets/navigation/logo-mark*.svg`).

## Evidence on Hand

- Real copy: the About and Fun fact text in `src/pages/About.jsx`, and contact details in `src/components/footer.jsx`.
- Real photos: `src/assets/hero-skier*.png`, `aboutme.jpg`, `funfact.jpg`, `skier.jpg`.
- **Not yet available:** real project content (all `Information.json` entries are placeholders). There are no testimonials, client names, awards or metrics. Do not invent any.

## Product Principles

1. Get the reviewer to the work fast. Projects come first and contact is never far away.
2. Show the result and the process: what he did, his role, the tools, and links to the working files.
3. The site is part of the portfolio. Its build quality is itself evidence of his dev skill.
4. Let personality show without getting in the way of judging the work.
5. Keep content data-driven so adding or removing a project (or the whole AppState section) is just a folder or flag change.

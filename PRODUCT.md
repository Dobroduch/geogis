# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

static HTML/CSS/JS (no build tooling, no framework)

## Users

Primary users are individual property/landowners in and around Holíč and the Myjava, Senica, and Piešťany region of Slovakia who need geodetic services — property surveys, boundary marking, cadastral registration, or legalizing an unauthorized ("black") building. Secondary users include construction clients needing geometric plans and surveying for construction/engineering projects, and municipalities or GIS clients needing mapping/GIS work.

## Product Purpose

GEOGIS SK, spol. s r.o. is a geodetic and cartographic services company. The site markets its services (geodesy, GIS, legal/cadastral/contract work) and drives inquiries through phone, email, and a contact form, across two offices/regions: Holíč (headquarters) and a Myjava/Senica/Piešťany service area.

## Positioning

An established, trusted local/regional geodetic firm with 30 years of experience based in Holíč, serving the wider Myjava/Senica/Piešťany area — not primarily competing on price or national scale, but on being a known, long-standing local firm.

## Operating Context

- Two points of contact: Sídlo spoločnosti Holíč (head office — physical address, phone, email, Mon–Fri 8:00–16:00) and Služby v oblasti Myjava, Senica a Piešťany (a service-area listing with phone/email/hours but no physical address).
- Clients reach the company by phone, email, or the site's contact form (currently wired to Netlify Forms for testing; a hardened PHP backend — send-mail.php — is built and ready for when the site moves to classic PHP hosting).
- Legal/registration facts are published on the Kontakt page: IČO, DIČ, IČ DPH (platiteľ DPH since 11.2.2004), and Obchodný register entry (Okresný súd Trnava, oddiel Sro, vložka č. 14356/T).
- A GDPR processing notice sits under the contact form (controller, purpose, retention, and the data subject's rights).

## Capabilities and Constraints

Services shown on the homepage:
- Geodetické služby — geometric plans, land/building staking, positional and elevation surveys, construction/control surveys.
- Geo-informačné systémy — solution design, software delivery, map-making for municipalities, vectorization/digitization, printing.
- Konzultácie a poradenstvo — exemptions from agricultural/forest land fund, access to third-party land, land leases.
- Vypracovanie zmlúv a návrhov na vklad do katastra — purchase/donation/exchange contracts, co-ownership settlement, easement agreements, cadastral registration filings.
- Zameranie adresného bodu — address-point surveying, a legal requirement for buildings occupancy-approved after 1 July 2015.
- Zastupovanie a legalizácia stavieb — representation in zoning/building/occupancy proceedings, and legalizing unauthorized ("black") buildings under the building amnesty.

Constraints:
- No backend framework or build pipeline — plain HTML/CSS/JS by design.
- Currently deployed/tested on Netlify (Netlify Forms active); will move to classic PHP hosting later, at which point the form switches to the already-built send-mail.php (3 documented steps noted in kontakt.html/script.js).
- send-mail.php is tested locally only — not yet connected to a live production PHP host.

## Brand Commitments

- Name: GEOGIS SK, spol. s r.o.
- Logo: a geodetic/survey-mark icon (assets/icons/logo-mark.png); orange accent color used throughout.
- Tone: professional, Slovak-language copy, formal "Vy/Váš" address.

## Evidence on Hand

- Real and confirmed: company address (Sibírska č. 1329, 908 51 Holíč), phone numbers, emails (vavra@geogis.sk, kollar@geogis.sk), opening hours, IČO/DIČ/IČ DPH/OR registration details, and the "1000+ Realizovaných projektov" / "30 rokov skúseností" trust-badge stats.
- The 3 service-card photos (card-geodesy.jpg, card-gis.jpg, card-land.jpg) are confirmed final, not placeholders.
- Placeholder — must not be treated as final: the 6 gallery photos on galeria.html (generic stock images of surveying equipment, standing in until the client supplies real project photos) and the third footer phone number ("+421 XXX XXX XXX").

## Product Principles

1. Lead with trust and longevity (30 years, local roots) over price or scale — the firm's core appeal is being a known, established local name.
2. Serve the individual property owner first: content and process framing (the 4-step "Ako postupujeme" timeline, the legal/cadastral services) should read as approachable for someone navigating their own property/building paperwork, not just a B2B vendor pitch.
3. Keep technical/legal accuracy high — IČO/DIČ/registration facts, opening hours, and legal service descriptions (e.g. the 1 July 2015 address-point rule) carry real legal weight for clients.
4. Preserve the plain, dependency-free static-site architecture; don't introduce a framework or build step without a clear reason.
5. Treat the gallery photos and the placeholder phone number as temporary — flag them again before the site is considered launch-ready.

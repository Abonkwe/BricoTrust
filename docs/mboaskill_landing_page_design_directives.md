# MboaSkill — Landing Page Design & Build Directives

**A practical design handoff based on the four supplied references**  
*Modern TrustTech • Local Services Marketplace*

* **Brand Palette Swatches:** `#153B36` | `#159B8B` | `#B5D83D` | `#D5A66B` | `#F8FAFC`
* **Product:** MboaSkill
* **Demo Scope:** Plumbing services in Molyko, Buea (working assumption)
* **Stack:** React, Node.js, JavaScript, AI-assisted request parsing
* **Version:** 1.0 — 12 November 2026 (Prepared for the Silicon Mountain Hackathon 2026)

> **DESIGN GOAL:** Create a polished, human-centred marketplace that feels like a credible technology product — not a generic corporate site and not a one-trade contractor brochure. The design must lead visitors into the working request-to-match-to-booking journey.

---

## How to Use This Document

This is the design and implementation brief for the MboaSkill landing page. It converts the four visual references supplied by the team into one coherent direction. Use it as the source of truth for layout, copy, colour, components, interactions, and demo acceptance. The screenshots are inspiration, not templates to copy pixel-for-pixel.

### Document Map

| Part | What it specifies |
| :--- | :--- |
| **1. Design decision** | The visual direction and the role of each supplied reference. |
| **2. Brand system** | Colours, typography, spacing, imagery, iconography, and visual tone. |
| **3. Information architecture** | Navigation, section order, and page objective. |
| **4. Detailed page blueprint** | Exact section-by-section content, layout, components, and calls to action. |
| **5. Interaction specification** | Search, AI request assistant, profile cards, Trust Passport, and booking entry. |
| **6. Responsive and accessible design** | Mobile-first behaviour, low-data constraints, readability, and accessibility. |
| **7. Technical handoff** | React component plan, data boundaries, states, security, and analytics. |
| **8. Demo acceptance checklist** | What must work before the page is considered complete. |

> **PRIMARY DECISION:** The four references are sufficient. Do not spend more time searching for templates. Use Reference 1 for visual impact and service storytelling, Reference 2 for SaaS clarity and spacing, Reference 3 for trade-specific photography, and Reference 4 for marketplace flow and product explanation.

### One-Line Creative Brief

Design a confident, modern, and locally grounded service marketplace that helps customers request a plumbing service, understand why a particular artisan is recommended, inspect evidence behind that artisan's skills, and continue to booking — while giving artisans a clear route to build a professional reputation.

---

## 1. Design Direction and Reference Analysis

The intended result sits between the four references. It should have the confident hero and service-card clarity of the cleaning/restoration reference, the whitespace and product-led storytelling of the medical SaaS reference, the trade-specific human imagery of the plumbing reference, and the structured marketplace journey of the cleaner marketplace reference.

### Reference Breakdown

* **REFERENCE 1 — CLEANING / RESTORATION**
  * **Borrow:** Bold hero, prominent worker image, clear CTA, service cards, offer/benefit storytelling.
  * **Avoid:** Too many repeated green buttons, excessive decorative waves, long promotional blocks.
* **REFERENCE 2 — SAAS / MEDICAL PLATFORM**
  * **Borrow:** Generous whitespace, clean teal palette, floating UI mockups, benefit cards, map/coverage storytelling, numbered process.
  * **Avoid:** Overloading the page with dashboard screenshots or copying the medical visual language literally.
* **REFERENCE 3 — PLUMBING SERVICE**
  * **Borrow:** Trade-specific hero photography, strong service message, focused service examples, and clear navigation.
  * **Avoid:** Making MboaSkill look like one plumber's own business website or using generic lorem ipsum.
* **REFERENCE 4 — HOME SERVICES MARKETPLACE**
  * **Borrow:** Clear customer journey, mobile-product previews, structured benefit sections, balanced use of people and interface.
  * **Avoid:** Too much bright blue, repetitive feature blocks, and stock-illustration overload.

> **BLEND RATIO:** Use Reference 1 as the strongest structural influence (about 40–45%), Reference 2 for SaaS polish and breathing room (about 25%), Reference 3 for trade identity (about 15%), and Reference 4 for marketplace/product storytelling (about 15%). These are creative guidance proportions, not measured design scores.

### What the Combined Design Should Feel Like

* **Professional and trustworthy**, but not cold or overly corporate.
* **Human and locally relevant**, with credible artisan photography rather than generic office imagery.
* **Product-led:** Show the search/request interface and Trust Passport, not only marketing claims.
* **Clear and uncluttered:** One primary action per major section, consistent buttons, and restrained decoration.
* **Expandable:** The visual identity should later accommodate other trades and locations without redesigning the entire site.

---

## 2. Brand and Visual Design System

### 2.1 Colour Palette

| Token | Hex | Use | Rules |
| :--- | :--- | :--- | :--- |
| **Deep forest** | `#153B36` | Primary brand, dark hero panels, footer, primary buttons. | Use white text. This is the main trust colour. |
| **Teal** | `#159B8B` | Icons, links, highlights, secondary buttons, UI accents. | Use sparingly; avoid making every section teal. |
| **Warm lime** | `#B5D83D` | Primary CTA fill, small emphasis, active states. | Use dark forest text for strong contrast. |
| **Warm gold** | `#D5A66B` | Secondary accent for craftsmanship or subtle highlights. | Do not use for status badges or long text. |
| **Off-white** | `#F8FAFC` | Main page background and whitespace. | Default canvas; keep cards mostly white. |
| **Deep text** | `#263744` | Headings and body text. | Avoid pure black for a softer appearance. |
| **Muted slate** | `#596B78` | Supporting text, labels, metadata. | Maintain readable contrast. |
| **Pale mint** | `#EAF4F2` | Trust panels, light section backgrounds. | Use as a soft surface, not a large saturated block. |

### 2.2 Typography

| Role | Font recommendation | Desktop guide | Mobile guide |
| :--- | :--- | :--- | :--- |
| **Display / hero** | Manrope ExtraBold or Plus Jakarta Sans Bold | 44–56 px | 34–40 px |
| **Section heading** | Manrope Bold | 30–36 px | 26–30 px |
| **Card heading** | Manrope Semibold | 18–22 px | 17–19 px |
| **Body** | Inter Regular | 16–18 px | 15–16 px |
| **Small labels** | Inter Medium | 12–14 px | 12–13 px |
| **Buttons** | Inter Semibold | 14–16 px | 14–16 px |

* Use a consistent line-height: `1.05–1.15` for large headlines and `1.45–1.65` for body text.
* Keep paragraphs short.
* Avoid all-caps for full sentences.
* Do not use more than two font families.

### 2.3 Layout, Spacing, and Shape

* **Desktop content max-width:** `1,160–1,240 px`; centre the page and retain generous side margins.
* **Grid:** Use a 12-column desktop grid, 8-column tablet grid, and 4-column mobile grid.
* **Spacing system:** `8, 12, 16, 24, 32, 48, 64, and 88 px`. Avoid arbitrary one-off gaps.
* **Cards:** `14–20 px` corner radius; subtle border; very light shadow only where elevation clarifies hierarchy.
* **Buttons and form controls:** `10–14 px` radius; minimum touch target $44 \times 44$ px.
* Use a restrained wave or curved transition only once or twice — never between every section.
* Prefer alignment and whitespace over decorative blobs, floating circles, or gradients.

### 2.4 Photography and Illustrations

* Use realistic, respectful photography showing African artisans in real working environments. Images should feel like evidence of a person doing a trade, not staged corporate stock.
* Use a consistent photographic treatment, natural lighting, and uncluttered backgrounds.
* **Hero image:** One confident plumber at work or holding appropriate tools; show competence and approachability.
* **Artisan profile cards:** Use actual pilot artisans only with consent. For a prototype, label synthetic/demo profiles clearly.
* **Work samples:** Use approved, consented portfolio images; do not reuse unrelated photos as proof of an artisan's work.
* **Product mockups:** Use authentic screenshots of the actual MboaSkill flow, not invented dashboard metrics.
* Avoid generated or stock images presented as real artisans, real customers, real assessments, or completed jobs.

### 2.5 Icons and Status Badges

* Use one consistent outline icon family such as **Lucide**.
* **Recommended icons:** `Search`, `MapPin`, `ShieldCheck`, `BadgeCheck`, `Wrench`, `ClipboardCheck`, `MessageCircle`, `CalendarClock`, `Star`, `ArrowRight`, `UserRound`, `Building2`.
* Use icons as visual aids, never as the only label.
* **Status labels must be evidence-specific:** `"Phone confirmed"`, `"Identity checked"`, `"Skill assessed - leak repair"`, `"Reference checked"`, `"Job confirmed"`.
* Avoid a generic `"100% verified"` badge or unexplained total trust score.

---

## 3. Landing Page Objectives and Information Architecture

### 3.1 Primary Conversion Goals

| Audience | Primary goal | Primary CTA | Secondary CTA |
| :--- | :--- | :--- | :--- |
| **Customer / household** | Create a service request and reach suitable artisans. | Request a service | How matching works |
| **Artisan** | Start a free profile and submit skill evidence. | Join as an artisan | How verification works |
| **Property manager / business** | Start a maintenance conversation or request a pilot. | Talk to MboaSkill | See business use case |

> **DO NOT SPLIT ATTENTION:** The first screen should prioritise the customer service request. Artisan acquisition is the secondary path, visibly available but not competing with the primary customer CTA.

### 3.2 Navigation

| Item | Destination / action | Notes |
| :--- | :--- | :--- |
| **Wordmark** | Homepage top | Text logo `"MboaSkill."`; use simple custom mark only if already available. |
| **Find an artisan** | Search/request flow | Scroll or route to service request form. |
| **How it works** | How-it-works section | Anchor link. |
| **Trust & verification** | Verification section | Explain evidence and limits. |
| **For artisans** | Artisan CTA section / registration | Secondary navigation path. |
| **For businesses** | Property manager contact section | Optional for demo if time allows. |
| **Sign in** | Login route | Show only if authentication is implemented. |
| **Primary nav CTA** | Request a service | Visible on desktop; simplified mobile equivalent. |

### 3.3 Recommended Page Order

| Order | Section | Visitor question answered |
| :--- | :--- | :--- |
| **01** | Header / navigation | Where am I and what can I do? |
| **02** | Hero + request search | Can this help me find the service I need? |
| **03** | Trust proof strip | Why should I trust the information? |
| **04** | How it works | How does the process work end to end? |
| **05** | Service category / pilot scope | What services are available here? |
| **06** | Artisan match preview | What does a recommended artisan look like? |
| **07** | Trust Passport explanation | How do you know this artisan has the claimed skill? |
| **08** | AI matching explanation | How does the system identify the right artisan? |
| **09** | For artisans CTA | How can a skilled worker join? |
| **10** | FAQ + footer | What are the limitations, policies, and contact routes? |

### 3.4 Scope Discipline for the Hackathon Demo

The brand can be designed for future multi-trade expansion, but the live demo must remain aligned with the selected pilot trade and geography. The current working assumption is **plumbing in Molyko, Buea**. Keep the service picker and location options scoped to what the team can actually support. Do not display many trades or cities just to make the platform look larger.

---

## 4. Detailed Page Blueprint: Sections 01–05

### 01. Header / Navigation

* **Layout:** Clean white or off-white top bar, sticky after scroll if useful. Wordmark on the left, compact navigation links in the centre/right, primary CTA at the far right. Keep the header slim — approximately `72–80 px` desktop and `60–68 px` mobile.
* **Wordmark:** `"MboaSkill."` Use Deep Forest (`#153B36`) for the text and Teal (`#159B8B`) for a small dot or symbol. Do not invent a complex logo during the hackathon unless time allows.
* **Desktop links:** `Find an artisan` | `How it works` | `Trust & verification` | `For artisans`. Primary button: `"Request a service"`.
* **Mobile:** Logo, menu icon, and one prominent request CTA; move secondary links into the menu.

### 02. Hero Section — Highest Priority

* **EXACT HEADLINE:** `Find skilled local artisans. Hire with confidence.`
* **Supporting copy:** `"Tell us what needs fixing. MboaSkill helps you discover local plumbers using skill-specific evidence, community references and confirmed work history."`
* **Eyebrow:** `LOCAL SERVICES, BACKED BY EVIDENCE`
* **Primary CTA:** `Request a plumbing service`
* **Secondary CTA:** `How MboaSkill works`
* **Optional microcopy:** `Pilot service area: Molyko, Buea`

#### Hero Layout

| Desktop | Mobile |
| :--- | :--- |
| Two-column split. Left: headline, supporting text, search/request card, and reassurance line. Right: large human artisan photo or real product screenshot layered subtly with the artisan image. | Single-column. Headline and one-line explanation first, then a compact request form, then image. Keep the primary CTA visible without excessive scrolling. |

#### Hero Request Card Fields

| Field | Input type | Behaviour |
| :--- | :--- | :--- |
| **What do you need?** | Select / short text | Pilot default: Plumbing. Options should reflect supported plumbing tasks only. |
| **Describe the problem** | Textarea or guided choices | Example placeholder: `"A pipe is leaking under my kitchen sink."` |
| **Where do you need help?** | Location input | Pilot area: Molyko, Buea; allow a landmark or nearby area. Do not require GPS. |
| **When do you need it?** | Select | Today / within a few days / flexible. Do not imply real-time availability unless confirmed. |
| **Submit** | Button | `"Find a plumber"`. Creates or opens the actual request flow. |

* **Friction Rule:** The hero should not force the customer to create an account before describing a basic service need. Ask for contact details only when necessary to send the request or confirm a booking. Do not request an exact home address before a suitable artisan is selected.

### 03. Trust Proof Strip

Directly under the hero, show three compact trust principles in a light mint (`#EAF4F2`) strip. Use icons plus short labels:
* `"Skill-specific assessments"`
* `"Local references"`
* `"Reviews from confirmed jobs"`

> **COPY RULE:** These are platform process promises. Only label a specific artisan as assessed, referenced, or reviewed when the corresponding evidence exists. Do not imply every listed artisan has completed all checks.

### 04. How It Works

| Step | Heading | Copy | Visual |
| :--- | :--- | :--- | :--- |
| **01** | Describe the job | Tell us what needs fixing and where. | Request form / message icon. |
| **02** | Get a suitable match | The matching system filters by service, area, skill evidence, and availability. | Illustrated match card. |
| **03** | Agree and confirm | Compare the details, agree the price, then confirm the completed job. | Booking and confirmation UI. |

### 05. Service Scope / Category Cards

* For the pilot, show a small, focused set of plumbing problems rather than a large catalogue of unrelated trades.
* **Suggested cards:** `Leak repair`, `Tap / fixture installation`, `Drain blockage`, `Pipe installation`.
* Each card includes one relevant image or clear icon, a 2-line description, and `"Request this service"`.
* Do not show services the team cannot verify or support. If a service requires additional certification or safety checks, indicate that the request will be reviewed before matching.

---

## 5. Detailed Page Blueprint: Sections 06–10

### 06. Artisan Match Preview

This section should show what the customer will see after submitting a request. Use one or two sample artisan cards with clearly labelled demo data if no real artisans have consented to be shown.

#### Required Artisan Card Content

| Element | Example | Rule |
| :--- | :--- | :--- |
| **Name** | Sample Plumber A | Use real name only with consent; otherwise show `"Demo artisan"`. |
| **Trade / area** | Plumbing • Molyko | Must match actual supported service area. |
| **Skill evidence** | Leak repair — practical assessment passed | Show assessed task, not generic `"expert"`. |
| **Other evidence** | Past-client reference checked | Name the evidence type and source category. |
| **Work history** | 3 platform-confirmed jobs | Only display real completed job records; sample data must be marked. |
| **Availability** | Available after 2:00 PM | Only show when updated/confirmed; otherwise `"Availability not confirmed"`. |
| **Quote** | Estimate available after job details | Do not invent standard pricing or imply a fixed price without a quote. |
| **Action** | View Trust Passport / Request booking | Actions must lead to implemented screens. |

* **Design:** Card should be white with fine border, `14–18 px` radius, compact profile image, name and trade, then two or three evidence chips. Put the strongest skill evidence near the top. Keep rating secondary to proof.

### 07. Artisan Trust Passport Section

This is MboaSkill's key differentiator. Give it a dedicated explanatory section with a large product mockup on one side and simple copy on the other.

* **SECTION HEADLINE:** `Trust should be earned, not claimed.`
* **Supporting copy:** `"Each artisan profile can show what has been checked, who assessed it, which skill was demonstrated and which jobs have been confirmed. Customers can inspect the evidence behind a recommendation."`

#### Passport UI Elements

* **Artisan identity / contact status** — displayed separately from skill status.
* **Skill credential** — exact task name, result, assessor category, date, and credential status.
* **Community reference** — relationship and scope of the reference, with private contact details hidden.
* **Confirmed jobs** — count only from completed bookings recorded on MboaSkill.
* **Review history** — reviews attached to confirmed jobs and clear sample size.
* **Limitations** — explain what has not been assessed and avoid implying a universal licence.

* **Visual Guideline:** Use one large sample Trust Passport mockup. Add a visible `"Illustrative demo profile"` label if the data is simulated. Do not decorate it with a fake official seal or government-looking certification emblem.

### 08. AI Matching Explanation

* **SECTION HEADLINE:** `From a simple request to a relevant local match.`
* **Copy:** `"Describe your problem in everyday language. MboaSkill structures the request, checks the service and location, then presents eligible artisans with clear reasons for each recommendation."`
* **Visual:** A three-part UI sequence:
  1. Customer text bubble (`"A pipe is leaking under my sink in Molyko"`)
  2. Structured request chips (`Plumbing` / `Leak repair` / `Molyko` / `Today`)
  3. Match card showing real evidence fields.
* **Guardrail:** AI must be presented as a request-understanding assistant. The backend eligibility and ranking rules determine which artisan records can be returned. Do not claim that AI certifies artisans or guarantees work quality.

### 09. For Artisans Section

* **SECTION HEADLINE:** `Your skills deserve to be seen.`
* **Copy:** `"Build a simple professional profile, share evidence of your work and grow a reputation through confirmed customer jobs. Basic registration and core verification are free during the pilot."`
* **Primary CTA:** `Join as an artisan`
* **Secondary link:** `See how skill verification works`
* **Visual & Copy Rule:** Use a real artisan/workshop photo or a simple profile interface preview. Avoid implying guaranteed work or income.

### 10. FAQ, Contact, and Footer

* **Suggested FAQs:**
  * `"Do I need a certificate to join?"`
  * `"How are skills checked?"`
  * `"What does a verified badge mean?"`
  * `"Can I use MboaSkill without a smartphone?"`
  * `"How are prices agreed?"`
  * `"What if I have a problem with a job?"`
* **Footer links:** `About MboaSkill`, `How verification works`, `Customer support`, `Privacy notice`, `Terms of use`, `For artisans`.
* Add an honest contact channel the team monitors during the pilot. Include locality and pilot-scope notice.

---

## 6. Interaction Specification and Product States

### 6.1 Primary Request Journey

| Stage | User action | System response | Failure / fallback |
| :--- | :--- | :--- | :--- |
| **Start** | Select plumbing and enter task/location. | Validate supported task and pilot area. | Offer assisted contact or explain out-of-area limitation. |
| **Understand** | Submit description. | AI extracts task, area, and urgency into structured fields. | Allow customer to edit fields; never silently infer uncertain details. |
| **Clarify** | Confirm suggested task and details. | Save confirmed request. | Ask one concise follow-up if task is ambiguous. |
| **Match** | Request shortlist. | Backend filters eligible artisans and ranks candidates. | If none, say no suitable match is currently available. |
| **Compare** | Open profile / Trust Passport. | Show evidence, availability status, and quote details. | Mark unknown or stale information clearly. |
| **Book** | Select artisan and submit request. | Create booking/request reference and notify artisan. | Show pending state until artisan accepts; do not claim booking is confirmed. |
| **Complete** | Confirm job using a one-time process. | Update job state and unlock review. | Support dispute/report path if parties disagree. |

### 6.2 AI Request Assistant Behaviour

* Accept short free-text requests; voice may be a later enhancement.
* Extract only: `service/trade`, `task`, `location`, `urgency`, `optional budget`, and `contact preference`.
* Return structured values for customer confirmation before creating a request.
* Ask for clarification when the task or location is ambiguous.
* Do not invent artisan data, available times, price ranges, or assessment records.
* Do not make safety-critical diagnoses; for emergency or hazardous conditions, show a human-support / emergency guidance route defined by the product team.
* Use the backend matching API to retrieve actual eligible records; the model must not directly query unrestricted database tables.

### 6.3 Required UI States

| State | What to display |
| :--- | :--- |
| **Empty** | Helpful first-use prompt and example request; no fake data. |
| **Loading** | `"Finding suitable plumbers..."` with clear progress feedback; avoid fake percentage counters. |
| **Clarification needed** | One question such as `"Is the leak from the tap or the pipe?"` |
| **No match** | `"No suitable assessed plumber is currently available in this area. You can leave a request or contact support."` |
| **Match results** | Ranked eligible profiles, explanation, and evidence labels. |
| **Availability unknown** | `"Availability not confirmed"` rather than green `"Available"` badge. |
| **Request pending** | Show that the artisan has not yet accepted. |
| **Error / offline** | Preserve typed request where possible and provide a retry or contact fallback. |
| **Demo data** | Persistent `"Demo profile / Sample data"` label on any fictional record. |

### 6.4 CTA and Button Rules

* **Primary CTA throughout the page:** `"Request a service"` or contextual `"Find a plumber"`.
* **Artisan CTA:** `"Join as an artisan"`.
* Do not use vague CTA labels such as `"Learn more"` where a specific action is possible.
* Buttons must perform the action indicated. No decorative/inert buttons.
* Use one primary button style; secondary actions should be outline or text links.

---

## 7. Responsive, Accessible, and Low-Data Behaviour

### 7.1 Breakpoints

| Viewport | Layout rules |
| :--- | :--- |
| **Large desktop: $\ge 1200$ px** | Wide two-column hero; multi-column service/profile cards; full navigation; content max-width `1,240 px`. |
| **Tablet: `768–1199 px`** | Reduce hero image size; 2-column card grids; keep search form wide; simplify navigation if needed. |
| **Mobile: $< 768$ px** | Single-column flow; mobile nav; form fields stacked; cards full width; avoid horizontal scrolling. |
| **Small mobile: $< 390$ px** | Shorter headline line breaks; compact labels; buttons full width; no overlapping hero overlays. |

### 7.2 Mobile Priorities

* Keep the request form visible early — do not put a tall hero photograph above the main action.
* Use one-column cards and a compact profile preview.
* Ensure buttons, select fields, and inputs are easy to tap.
* Use sticky bottom `"Request a service"` only if it does not obscure content or system navigation.
* Collapse secondary content into accordions where helpful, but keep trust limitations and verification definitions accessible.
* Do not rely on hover for important information.

### 7.3 Low-Data and Basic-Phone Considerations

* Compress photos to `WebP`/`AVIF` and generate responsive sizes.
* Lazy-load images below the first viewport.
* Avoid background video, auto-playing animations, and large sliders.
* Keep hero image file size modest; text and request form should render before decorative media.
* Make the core request flow usable on a basic mobile connection.
* Offer a phone/WhatsApp-assisted route if that channel is actively supported.
* For basic phones, do not promise a USSD or SMS workflow until implemented; mention it only as a roadmap capability.

### 7.4 Accessibility Requirements

* Use semantic headings in order (one `H1`, then `H2`/`H3`).
* All form controls require visible labels, not only placeholder text.
* Every image needs meaningful `alt` text or decorative empty `alt`.
* Maintain sufficient text/background contrast; do not use lime text on white.
* Use visible keyboard focus and keyboard-operable navigation.
* Error messages must identify the field and describe how to fix it.
* Never communicate status by colour alone; include text labels and icons.
* Respect `prefers-reduced-motion` preferences; keep animation subtle.
* Use plain language and explain `"skill assessed"`, `"reference checked"`, and `"job confirmed"`.

---

## 8. Technical Handoff for the React / Node.js Team

### 8.1 Suggested Frontend Component Structure

```text
src/
├── components/
│   ├── SiteHeader.jsx
│   ├── HeroRequestForm.jsx
│   ├── TrustProofStrip.jsx
│   ├── HowItWorks.jsx
│   ├── ServiceCategoryCard.jsx
│   ├── ArtisanMatchCard.jsx
│   ├── TrustPassportPreview.jsx
│   ├── AIMatchingExplainer.jsx
│   ├── ArtisanJoinCTA.jsx
│   ├── FAQAccordion.jsx
│   └── SiteFooter.jsx
├── pages/
│   ├── LandingPage.jsx
│   ├── RequestPage.jsx
│   ├── MatchResultsPage.jsx
│   └── ArtisanProfilePage.jsx
├── services/
│   └── api.js
└── styles/
    ├── tokens.css
    └── globals.css
```

### 8.2 Suggested Backend Integration

| Frontend action | Backend endpoint concept | Security / data rule |
| :--- | :--- | :--- |
| **Submit service request** | `POST /api/requests` | Validate fields; store customer consent/contact minimally. |
| **Parse request** | `POST /api/requests/parse` | Return structured suggestions only; user must confirm. |
| **Get matches** | `GET /api/requests/:id/matches` | Backend applies eligibility filters and ranking; only eligible records returned. |
| **Open artisan profile** | `GET /api/artisans/:id/public-profile` | Return public fields only; never expose ID documents / private reference contacts. |
| **View Trust Passport** | `GET /api/artisans/:id/credentials` | Return issuer, scope, date, status, and public evidence summaries. |
| **Create booking request** | `POST /api/bookings` | Require authenticated/verified contact as appropriate; create pending status. |
| **Artisan onboarding** | `POST /api/artisans` | Apply input validation, consent, and abuse protections. |

### 8.3 Data Authenticity and Demo Rules

* Use actual database records for every live match result.
* Store the origin of every status: who checked it, when, and by which process.
* The public site must not let a frontend flag create a verification status; that decision is server-controlled.
* Use role-based access for customer, artisan, assessor, and administrator screens.
* Sample records must be visibly marked `"Demo data"`.
* Do not hardcode successful reviews, artisan counts, partner logos, or customer testimonials.

### 8.4 Analytics Events

| Event | Why it matters |
| :--- | :--- |
| `hero_request_started` | Measures whether the main hero CTA is clear. |
| `request_submitted` | Measures intent and request completion. |
| `request_clarification_answered` | Identifies confusing task descriptions. |
| `match_list_viewed` | Measures matching response delivery. |
| `trust_passport_opened` | Shows whether trust evidence is useful to customers. |
| `artisan_contact_or_booking_requested` | Measures conversion to real service engagement. |
| `artisan_join_clicked` | Measures supply-side interest. |
| `faq_opened` / `support_clicked` | Identifies unresolved user questions. |

---

## 9. Ready-to-Use Landing Page Copy

### 9.1 Navigation
* **Wordmark:** `MboaSkill.`
* **Links:** `Find an artisan` | `How it works` | `Trust & verification` | `For artisans`
* **Main button:** `Request a service`

### 9.2 Hero
* **EYEBROW:** `LOCAL SERVICES, BACKED BY EVIDENCE`
* **H1:** `Find skilled local artisans. Hire with confidence.`
* **SUPPORTING COPY:** `Tell us what needs fixing. MboaSkill helps you discover local plumbers using skill-specific evidence, community references and confirmed work history.`
* **Primary CTA:** `Request a plumbing service`
* **Secondary CTA:** `How MboaSkill works`
* **Scope note:** `Pilot service area: Molyko, Buea.`

### 9.3 Trust Strip
* `Skill-specific assessments`
* `Local references`
* `Reviews from confirmed jobs`

### 9.4 How It Works
* **01 — Describe the job:** Tell us what needs fixing and where.
* **02 — Get a suitable match:** We filter by service, area, skill evidence, and availability.
* **03 — Agree and confirm:** Compare the details, agree the price, and confirm the completed job.

### 9.5 Trust Passport
* **HEADING:** `Trust should be earned, not claimed.`
* **BODY:** `Each artisan profile can show what has been checked, who assessed it, which skill was demonstrated and which jobs have been confirmed. Inspect the evidence behind a recommendation.`

### 9.6 AI Matching
* **HEADING:** `From a simple request to a relevant local match.`
* **BODY:** `Describe your problem in everyday language. MboaSkill structures the request, checks the service and location, then presents eligible artisans with clear reasons for each recommendation.`

### 9.7 Artisan CTA
* **HEADING:** `Your skills deserve to be seen.`
* **BODY:** `Build a simple professional profile, share evidence of your work and grow a reputation through confirmed customer jobs. Basic registration and core verification are free during the pilot.`

### 9.8 Suggested FAQ Answers

| Question | Suggested answer |
| :--- | :--- |
| **Do I need a certificate to join?** | Not necessarily. MboaSkill can collect work evidence and references, and may arrange a task-specific practical assessment. Some regulated or high-risk work may require additional qualifications or authorisation. |
| **How are skills checked?** | Depending on the skill, evidence may include practical assessments by authorised assessors, work samples, and corroborated references. Each status explains what was checked. |
| **What does "skill assessed" mean?** | It means an authorised assessor evaluated the artisan against a specific task or competency. It does not mean every task in the trade has been assessed. |
| **How are prices agreed?** | The artisan provides a quote for the described scope. Customers should confirm labour, estimated materials, travel charges, and any changes before work begins. |
| **What if something goes wrong?** | Use the support/report route to document the issue. MboaSkill can review platform records and refer the case for human handling; the platform should not promise an unimplemented warranty. |

---

## 10. Design Rules, Content Integrity, and Demo Acceptance

### 10.1 Do
* Use the four supplied references as the complete visual starting point; do not keep searching for more templates.
* Combine the references intentionally: strong hero and cards, SaaS whitespace, real trade photography, and a clear user journey.
* Make the search/request interface the primary action in the hero.
* Show the Trust Passport as a product feature, not an ornamental badge.
* Keep the pilot trade and location visible and honest.
* Use real evidence or clearly labelled demo data.
* Keep the design mobile-first, fast, lightweight, and readable.
* Make all buttons and links functional.
* Explain the meaning and scope of every verification status.

### 10.2 Do Not
* Do not copy any reference exactly or keep its original logos, company names, copy, or people.
* Do not use fake metrics such as `"10,000 verified artisans"` or `"99% trusted"`.
* Do not show fake reviews, testimonials, partner logos, or government seals.
* Do not claim all artisans are verified if only a subset has evidence.
* Do not show `"available now"` unless availability has been confirmed and timestamped.
* Do not let AI claim that a worker is certified or safe for tasks outside their assessed scope.
* Do not overload the page with gradients, waves, animations, popups, or multiple competing CTAs.
* Do not use a generic five-star rating as the only proof of trust.

### 10.3 Definition of Done — Landing Page

| Checklist area | Acceptance criteria |
| :--- | :--- |
| **Visual direction** | The page visibly combines the four references into one coherent TrustTech marketplace design. |
| **Hero clarity** | A first-time visitor can identify the service, pilot locality, and primary action within a few seconds. |
| **Working request** | Hero form validates and submits a real request to the backend or an explicitly labelled demo flow. |
| **Trust explanation** | The page explains the difference between identity, skill assessment, references, and confirmed job history. |
| **Match preview** | The UI demonstrates why an artisan is recommended using actual or clearly labelled sample data. |
| **Artisan pathway** | An artisan can find the free registration / evidence-submission route. |
| **Mobile** | All sections work on narrow screens without horizontal overflow or clipped text. |
| **Accessibility** | Labels, contrast, focus states, alt text, and keyboard operation are checked. |
| **Performance** | Images are compressed, below-the-fold media is lazy-loaded, and no heavy autoplay media exists. |
| **Truthfulness** | No invented users, reviews, partner claims, statistics, verification badges, or unconfirmed availability. |
| **Security** | The frontend does not set verification states; server APIs enforce role and record ownership. |
| **QA** | Tested on at least one Android phone and one desktop browser; core journey completed end to end. |

### 10.4 Suggested Final Demo Sequence

1. Start at the landing page and enter: `"A pipe is leaking under my sink in Molyko. I need help today."`
2. Show the parsed request and allow the user to confirm or edit it.
3. Show matching artisans retrieved from the database, with explicit skill evidence and availability status.
4. Open one Trust Passport and explain exactly what the assessment proves and what it does not prove.
5. Select an artisan and create a booking request.
6. Demonstrate the completion confirmation and verified-review rule using clearly labelled demo records if necessary.

### 10.5 Recommended Build Order

| Order | Build task | Done when |
| :--- | :--- | :--- |
| **1** | Design tokens and page shell | Colours, type, content width, spacing, and shared button styles are implemented. |
| **2** | Header and hero | Navigation, hero copy, photo, and request card work on desktop and mobile. |
| **3** | Request form integration | Inputs validate, request is submitted, and errors are visible. |
| **4** | Trust and process sections | Trust proof strip and three-step journey explain the product accurately. |
| **5** | Match preview and Trust Passport | Cards display evidence-specific fields and clear demo labels where needed. |
| **6** | AI explanation and artisan CTA | AI role is accurately described; artisan join route works. |
| **7** | FAQ, footer, and final QA | Links work, content is complete, and core journey passes on a phone. |

### 10.6 Designer-to-Developer Handoff Package

| Handoff item | Required content |
| :--- | :--- |
| **Design frames** | Desktop `1440 px`, tablet `768 px`, and mobile `390 px` layouts. |
| **Component states** | Default, hover/focus, disabled, loading, error, empty, and success states. |
| **Assets** | Logo/wordmark, approved photos, icon SVGs, image alt text, and asset-use permissions. |
| **Content source** | Final copy for hero, service labels, verification explanations, FAQs, and footer. |
| **Interaction notes** | What each button, search control, card, and navigation link does. |
| **Data / API map** | Which endpoint supplies each live field; which fields are sample/demo data. |
| **QA notes** | Tested devices, browsers, known limitations, and unresolved issues. |

> **FINAL DESIGN PRINCIPLE:** The homepage must not merely say `"trust us"`. It must show visitors how trust is produced: evidence is collected, skills are assessed within a defined scope, recommendations are explainable, and reviews follow confirmed jobs.
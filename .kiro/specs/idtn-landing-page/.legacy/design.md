# Design Specification — Landing Page IDTN

**Status:** Draft for review  
**Design principle:** light technical editorial, progressive disclosure, motion as enhancement

## 1. Design principles

1. **Clarity before decoration:** setiap elemen visual harus membantu memahami IDTN.
2. **Light by default:** halaman terasa terang sejak first paint; area gelap hanya aksen terbatas/footer.
3. **Technical but approachable:** istilah engineering tersedia tanpa menjadikan seluruh copy sulit dipahami.
4. **Evidence over claims:** data tanpa approval tidak dirender.
5. **Motion supports hierarchy:** animasi mengarahkan perhatian, bukan membuat user menunggu.
6. **Accessible by default:** keyboard, touch, reduced motion, and no-JS fallback adalah bagian desain.

## 2. Design tokens

```css
:root {
  --color-surface-base: #ffffff;
  --color-surface-soft: #f5f8fa;
  --color-surface-blue: #eef8fc;
  --color-surface-dark: #102a43;
  --color-ink: #102a43;
  --color-ink-muted: #52606d;
  --color-ink-subtle: #7b8794;
  --color-line: #d9e2ec;
  --color-brand-cyan: #00a9d9;
  --color-brand-blue: #087ea4;
  --color-success: #16866a;
  --color-warning: #b7791f;
  --color-danger: #c53030;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;

  --radius-sm: 0.375rem;
  --radius-md: 0.625rem;
  --radius-lg: 1rem;
  --radius-pill: 999px;

  --shadow-sm: 0 1px 3px rgba(16, 42, 67, 0.08);
  --shadow-md: 0 8px 24px rgba(16, 42, 67, 0.10);
  --focus-ring: 0 0 0 3px rgba(0, 169, 217, 0.30);

  --content-max: 80rem;
  --copy-max: 40rem;
  --header-height: 5rem;
}
```

Rules:
- Base surfaces are white/light.
- Navy full-bleed is reserved for footer and optional bounded technical panel.
- Cyan is never used for long body copy or large background areas.
- Every color used in production must map to a token.

## 3. Typography system

- Primary: approved brand sans-serif; fallback `system-ui, -apple-system, sans-serif`.
- Technical metadata: approved monospace; fallback `ui-monospace, SFMono-Regular, monospace`.
- H1: clamp-based responsive size, approximately 2.5–4.5rem, line-height 0.98–1.1.
- H2: approximately 2–3rem, line-height 1.1–1.2.
- Body: 1rem–1.125rem, line-height 1.55–1.7.
- Labels: 0.6875–0.8125rem, uppercase only for short metadata.
- Maximum paragraph width: 40rem.
- Do not use font weight or uppercase as the only information hierarchy.

## 4. Layout and grid

- Content max width: 1200–1280px depending on Figma final.
- Desktop outer gutter: 64–80px.
- Tablet gutter: 32px.
- Mobile gutter: 20–24px.
- Desktop grid: 12 columns, gap 24px.
- Tablet grid: 8 columns, gap 20px.
- Mobile grid: 4 columns or one flow column, gap 16px.
- Section vertical padding: 80–120px desktop, 56–80px tablet, 48–64px mobile.
- Avoid absolute positioning for content-bearing elements.
- Reserve image/visual aspect ratios before loading assets.

## 5. Component architecture

```text
src/
├── app/
│   ├── content.ts
│   ├── config.ts
│   └── main.ts
├── components/
│   ├── Header/
│   ├── MobileMenu/
│   ├── Hero/
│   ├── OpticalNetworkVisual/
│   ├── CompanyStrip/
│   ├── About/
│   ├── Solutions/
│   ├── SolutionCard/
│   ├── DwdmExplorer/
│   ├── WorkProcess/
│   ├── Contact/
│   ├── InquiryForm/
│   ├── ScrollProgress/
│   └── Footer/
├── styles/
│   ├── tokens.css
│   ├── base.css
│   └── utilities.css
├── assets/
│   ├── brand/
│   ├── images/
│   └── icons/
└── lib/
    ├── motion.ts
    ├── validation.ts
    └── analytics.ts
```

Components should receive content/config rather than hardcoding business data inside visual components.

## 6. Page composition

### Header
White, sticky, 72–80px default height. Desktop nav visible at `>= 1024px`; mobile drawer below. Use a skip link before header content. Header compact state must be CSS/transform-based.

### Hero
12-column layout: copy 6–7 columns, visual 5–6 columns. Copy order: eyebrow → H1 → supporting copy → primary/secondary action. Visual is an informative SVG with a static fallback.

### CompanyStrip
Light blue/soft surface, compact facts separated by vertical lines on desktop and stacked on mobile. Only approved facts.

### About
Text and evidence/diagram split. Avoid generic stock-photo framing. If photo is used, include caption/context and optimized asset.

### Solutions
Responsive card grid. Cards have visible number, title, summary, detail cue, and a defined active/focus state. Do not force equal height if content would be truncated.

### DwdmExplorer
Desktop:
- Two-column sticky composition.
- Visual remains visible while explanatory steps change.
- Scroll progress maps deterministically to a finite list of states.

Mobile:
- Visual above or beside a stepper.
- Buttons/tabs select each state.
- No dependency on pinned viewport sections.

### WorkProcess
Desktop timeline with active line and stage details. Mobile stacked cards/accordion. Direct stage selection is always available.

### Contact
Two columns desktop, one column mobile. Contact details use semantic address/link markup. Form has field-level errors, submit status, and privacy/consent copy if required.

### Footer
Navy is acceptable here as visual anchor. Use approved contrast-safe text tokens and minimal motion.

## 7. Interaction and state model

### Header state
```text
default → compact (scroll threshold) → default (scroll top)
```

### Mobile menu state
```text
closed → opening → open → closing → closed
```

Escape and close action always return focus to menu trigger.

### Solution card state
```text
idle → hover/focus → active/expanded
```

Expanded content must also be reachable by keyboard/touch.

### DWDM state
```text
static → entering → step(0..n) → complete
```

With reduced motion or no JS: render `complete` static state.

### Form state
```text
idle → validating → submitting → success
                         ↘ error → idle/retry
```

## 8. Optical SVG design

- SVG viewBox fixed and responsive through CSS.
- Decorative labels and lines use `vector-effect: non-scaling-stroke` where appropriate.
- Informative diagram gets title/desc or adjacent textual equivalent.
- Fiber path animation uses stroke dash properties; no filter blur dependency.
- Pulse has bounded duration and pauses when off-screen.
- Keep SVG DOM small; avoid thousands of nodes.
- Static final state must communicate the same architecture as animated state.

## 9. Motion architecture

Preferred implementation: GSAP + ScrollTrigger only where required; native IntersectionObserver for simple reveal if it reduces bundle size.

Utilities:
- `createReducedMotionMediaQuery()`.
- `revealOnIntersect()`.
- `animateFiberPath()`.
- `createDwdmController()`.
- `createScrollProgress()`.
- `destroyMotion()` on route/unmount if framework is introduced.

Rules:
- Initialize after DOM/content is available.
- Never hide content permanently while waiting for animation initialization.
- Kill ScrollTrigger instances on teardown.
- Respect visibility/offscreen state.
- Test 60fps-ish behavior on mid-range mobile; degrade to static if needed.

## 10. Data/config design

```ts
type ApprovalStatus = 'draft' | 'review' | 'approved' | 'deprecated';

type CompanyContent = {
  legalName: string;
  address: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  approval: ApprovalStatus;
};

type Solution = {
  id: string;
  number: string;
  title: string;
  summary: string;
  detail: string;
  approval: ApprovalStatus;
};

type InquiryPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  solution: string;
  message: string;
  consent?: boolean;
};
```

Production content loader must reject or filter non-approved claims. Contact endpoint URL is environment configuration, never a secret in source.

## 11. Form/API contract

`POST /api/inquiries` or approved external provider.

Request: JSON `InquiryPayload`.  
Success: `202` with `{ "ok": true, "referenceId": "..." }`.  
Validation failure: `400` with field error map.  
Rate limited: `429`.  
Server failure: `5xx`.

Client behavior:
- Never expose internal error details.
- Preserve form values after retryable failure.
- Do not log email, phone, or message contents.
- Abort stale request on navigation if supported.

## 12. SEO/accessibility design

- Static semantic content first; enhancement second.
- One H1 and logical section headings.
- Skip link, landmark labels, visible focus, `aria-live` form status.
- `alt` strategy documented per image: informative vs decorative.
- Canonical and OG metadata generated from config.
- JSON-LD only from approved company data.

## 13. Performance design

- Build-time CSS and JS; no Tailwind CDN.
- Preload only critical font/hero asset if measured beneficial.
- Use AVIF/WebP with width descriptors.
- Avoid layout shift from fonts/images by dimensions/fallbacks.
- Code-split optional carousel/map modules if implemented.
- Set performance budgets in CI where possible.

## 14. ADR summary

- **ADR-001 Light theme:** mandated by stakeholder; dark only as bounded accent/footer.
- **ADR-002 No jQuery/WOW/Waypoints:** avoid redundant runtime dependencies.
- **ADR-003 SVG optical visual:** communicates product domain better than generic 3D illustration.
- **ADR-004 Progressive enhancement:** core copy/form/navigation must work without motion/JS.
- **ADR-005 Approved content gate:** prevents fake metrics, contacts, and client claims.

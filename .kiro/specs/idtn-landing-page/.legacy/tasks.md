# Implementation Task List — Landing Page IDTN

**Task notation:** `[P0]` release blocker, `[P1]` MVP, `[P2]` post-MVP.  
**Dependency notation:** `D: T-xxx` means task depends on another task.

## Phase 0 — Governance, inputs, and decisions

- [ ] **T-001 [P0]** Assign product owner, technical owner, content approver, and deployment owner.
- [ ] **T-002 [P0]** Export Figma frames, inspect measurements, typography, colors, components, and responsive variants.
- [ ] **T-003 [P0]** Resolve visual discrepancy: light theme is mandatory; document approved exceptions for navy panels/footer.
- [ ] **T-004 [P0]** Obtain logo SVG, favicon, monochrome logo, and permitted brand assets. D: T-001.
- [ ] **T-005 [P0]** Obtain approved company name, positioning, address, phone, WhatsApp, email, and social URLs.
- [ ] **T-006 [P0]** Obtain approval for all technical claims: DWDM capacity, bitrate, SLA, coverage, years, projects, and client logos.
- [ ] **T-007 [P0]** Decide language strategy and translation ownership.
- [ ] **T-008 [P0]** Decide inquiry destination, retention policy, privacy notice, anti-spam, and analytics consent.
- [ ] **T-009 [P0]** Create content inventory with status `draft/review/approved/deprecated`.

**Exit criteria:** no unresolved P0 business input; content owners and approvals are recorded.

## Phase 1 — Design lock and technical RFC

- [ ] **T-010 [P0]** Map every Figma section to a requirement ID.
- [ ] **T-011 [P0]** Produce desktop/tablet/mobile page map.
- [ ] **T-012 [P0]** Finalize color, typography, spacing, radius, border, shadow, and breakpoint tokens.
- [ ] **T-013 [P0]** Create copy deck for hero, about, solutions, DWDM, process, contact, and footer.
- [ ] **T-014 [P0]** Create motion storyboard for hero path, reveal, DWDM, timeline, and card states.
- [ ] **T-015 [P0]** Define static fallback for every animated component.
- [ ] **T-016 [P0]** Define accessibility behavior for navigation drawer, accordion, form, SVG, and reduced motion.
- [ ] **T-017 [P0]** Write/approve form API contract and error contract. D: T-008.
- [ ] **T-018 [P0]** Record ADR decisions in `design.md` and review with stakeholders.

**Exit criteria:** design sign-off, responsive states documented, no component without fallback/state behavior.

## Phase 2 — Repository and foundation

- [ ] **T-019 [P0]** Scaffold Vite application with strict build configuration.
- [ ] **T-020 [P0]** Add Tailwind/build CSS and remove CDN dependency.
- [ ] **T-021 [P0]** Add lint, format, type/check strategy, and pre-commit/CI commands if repository policy permits.
- [ ] **T-022 [P0]** Create component, asset, content, lib, and style directories.
- [ ] **T-023 [P0]** Implement design tokens and CSS reset/base styles.
- [ ] **T-024 [P0]** Configure environment variables with `.env.example`; do not commit secrets.
- [ ] **T-025 [P0]** Add semantic document shell, language, title, metadata, canonical, favicon, and OG defaults.
- [ ] **T-026 [P0]** Add content/config schema and approved-content validation. D: T-009, T-023.

**Exit criteria:** clean starter build, lint/check available, tokens render in a sample component, no secret in repository.

## Phase 3 — Static page implementation

- [ ] **T-027 [P0]** Implement skip link and semantic landmarks.
- [ ] **T-028 [P0]** Implement responsive Header desktop.
- [ ] **T-029 [P0]** Implement MobileNavigation with focus management and Escape.
- [ ] **T-030 [P0]** Implement Hero copy, CTA, and static visual fallback.
- [ ] **T-031 [P0]** Implement CompanyStrip from approved content.
- [ ] **T-032 [P0]** Implement About section and evidence blocks.
- [ ] **T-033 [P0]** Implement SolutionCard grid and static expanded/detail behavior.
- [ ] **T-034 [P0]** Implement DwdmExplorer static diagram and stepper controls.
- [ ] **T-035 [P0]** Implement WorkProcess with directly selectable stages.
- [ ] **T-036 [P0]** Implement optional capability section only when approved data exists.
- [ ] **T-037 [P0]** Implement ContactDetails using semantic address/links.
- [ ] **T-038 [P0]** Implement InquiryForm fields, labels, client validation, and accessible errors.
- [ ] **T-039 [P0]** Implement Footer and legal/privacy links.
- [ ] **T-040 [P0]** Verify mobile/tablet/desktop layout against Figma. D: T-027–T-039.

**Exit criteria:** all required content is readable and navigable with JavaScript disabled; no fake data.

## Phase 4 — Motion and interaction

- [ ] **T-041 [P1]** Implement reduced-motion capability detection first.
- [ ] **T-042 [P1]** Implement hero line reveal with no content flash/hiding failure.
- [ ] **T-043 [P1]** Implement SVG fiber draw and bounded light pulse.
- [ ] **T-044 [P1]** Implement section reveal via IntersectionObserver/GSAP.
- [ ] **T-045 [P1]** Implement solution hover/focus/expanded states.
- [ ] **T-046 [P1]** Implement desktop DWDM scrub/pin state controller. D: T-034, T-041.
- [ ] **T-047 [P1]** Implement mobile DWDM stepper with no pin dependency.
- [ ] **T-048 [P1]** Implement process timeline scroll/focus state.
- [ ] **T-049 [P1]** Implement sticky compact header without CLS.
- [ ] **T-050 [P1]** Implement scroll progress with accessible label or decorative treatment.
- [ ] **T-051 [P1]** Ensure all GSAP/observer listeners are cleaned up when applicable.
- [ ] **T-052 [P1]** Test animation on mid-range mobile and degrade expensive effects if needed.

**Exit criteria:** motion enhances but is not required; reduced-motion and touch behavior pass.

## Phase 5 — Form, integrations, and security

- [ ] **T-053 [P0]** Implement endpoint adapter using approved URL from environment.
- [ ] **T-054 [P0]** Implement submitting, success, validation, network error, server error, retry, and duplicate-submit behavior.
- [ ] **T-055 [P0]** Add server-side validation/sanitization or verify provider behavior.
- [ ] **T-056 [P0]** Add rate limit, honeypot, CAPTCHA, or provider anti-spam according to decision T-008.
- [ ] **T-057 [P0]** Add privacy/consent handling and retention documentation.
- [ ] **T-058 [P1]** Add official WhatsApp/phone/email links.
- [ ] **T-059 [P1]** Add map embed/link with privacy and performance consideration.
- [ ] **T-060 [P1]** Add analytics events without PII; gate by consent if required.
- [ ] **T-061 [P1]** Add CSP/security headers at hosting layer where available.

**Exit criteria:** test inquiry reaches approved destination; no PII in logs/analytics; abuse controls documented.

## Phase 6 — SEO, accessibility, and content QA

- [ ] **T-062 [P0]** Review H1–H3 hierarchy, landmarks, labels, alt text, and link names.
- [ ] **T-063 [P0]** Run keyboard-only audit including mobile drawer, solution details, DWDM stepper, and form.
- [ ] **T-064 [P0]** Run screen-reader smoke test for navigation, diagram equivalent, and form feedback.
- [ ] **T-065 [P0]** Run contrast test for all token combinations and focus states.
- [ ] **T-066 [P0]** Test reduced motion and verify no hidden content.
- [ ] **T-067 [P0]** Verify title, description, canonical, OG, favicon, robots, sitemap, and JSON-LD.
- [ ] **T-068 [P0]** Content review: grammar, Indonesian terminology, approved claims, contacts, and permissions.

**Exit criteria:** accessibility and content sign-off; no unapproved claims/assets.

## Phase 7 — Test automation and release validation

- [ ] **T-069 [P0]** Add unit tests for validation, content approval filter, DWDM state mapping, and form state reducer.
- [ ] **T-070 [P0]** Add component tests for header menu, solution interaction, DWDM stepper, and form states.
- [ ] **T-071 [P0]** Add browser smoke/e2e tests for CTA, anchors, menu, form success/error, and reduced motion.
- [ ] **T-072 [P0]** Test latest two versions of Chrome, Edge, Firefox, and Safari where available.
- [ ] **T-073 [P0]** Test mobile touch, orientation, slow network, offline failure response, and small viewport.
- [ ] **T-074 [P0]** Run production build, lint, type/check, test suite, and dependency audit.
- [ ] **T-075 [P0]** Run Lighthouse and Core Web Vitals measurement on representative mobile profile.
- [ ] **T-076 [P1]** Fix all critical/major issues and record accepted deviations.

**Exit criteria:** CI/release checks green; performance budget and known deviations approved.

## Phase 8 — Deployment and operations

- [ ] **T-077 [P0]** Configure production hosting, HTTPS, domain, redirects, cache policy, and compression.
- [ ] **T-078 [P0]** Configure form endpoint secrets and environment variables in deployment platform.
- [ ] **T-079 [P0]** Configure monitoring for uptime, form failures, JS errors, and key conversion events.
- [ ] **T-080 [P1]** Create rollback procedure and deployment checklist.
- [ ] **T-081 [P1]** Verify robots/sitemap/indexability after deployment.
- [ ] **T-082 [P1]** Perform production smoke test from desktop and mobile.
- [ ] **T-083 [P1]** Handover content update instructions and ownership.

**Exit criteria:** production smoke passes, rollback is possible, monitoring and ownership are documented.

## Definition of done

A task is done only when implementation, responsive behavior, accessibility state, error state, tests, and documentation relevant to that task are complete.

The feature is release-ready only when:
- All P0 tasks are complete.
- Requirements have traceable implementation or explicit approved exclusion.
- No placeholder contact, fake metric, unapproved claim, or unlicensed asset remains.
- Light theme is preserved across first paint, responsive states, and footer policy.
- Form, CTA, navigation, and optional sections behave correctly.
- Reduced-motion/no-JS fallbacks exist.
- Production checks and performance budgets pass or deviations are approved.
- Stakeholder signs off against Figma and approved content.

# Non-Card Layouts

## Use This File

Read this file when a product UI feels over-cardified, fragmented, or padded by repeated panels without gaining clarity.

Use this file when the goal is to flatten the page structure without weakening hierarchy, scan flow, affordance, or maintainability.

## Core Thesis

- Non-card layout is a page-level structural strategy, not a blanket ban on contained components.
- Keep core workflows and dense information surfaces on the base page plane when continuous scanning matters.
- Build boundaries through alignment, spacing rhythm, typography, density shifts, rails, and sticky context before adding surfaces.
- Remove repeated containers that do not improve grouping.
- Keep local cards only for detached, elevated, interruptive, or strongly independent interactions.
- Do not force non-card treatment onto heterogeneous widget boards, product grids, or modules that need strong object boundaries.
- If the page collapses after container removal, rebuild structure first instead of restoring decorative panels.
- Let global layout logic dominate over ad hoc local padding.

## Structural Rules

- Anchor primary content to the base layer when the page supports one connected workflow, reading flow, or dense data surface.
- Use pinned or sticky context markers when scroll depth makes grouping hard to maintain.
- Use edge-to-edge zoning for major context shifts, but keep readable content width disciplined inside those zones.
- Use clear structural splits in master-detail layouts without turning each side into separate floating panels.
- Establish a stable vertical alignment axis for headings, controls, tables, and content blocks.
- Let typography signal section starts and hierarchy before relying on fills, strokes, or shadows.
- Keep tertiary actions inline when they belong to a row or item and do not need independent emphasis.
- Prefer proximity over enclosure for grouping related controls, settings, and content blocks.
- Use subdued dividers only when density is too high for spacing alone.
- Use negative space as a grouping tool, but keep content anchored to a coherent grid.
- On mobile, recompose order and context instead of merely squeezing desktop layouts.
- Preserve control affordance: flatten page structure first, not inputs, popovers, overlays, or other interactive surfaces.

## Decision Boundaries

Prefer non-card dominant layouts for:

- settings pages
- audit logs and activity feeds
- documentation pages
- long tables with filters and batch actions
- detail pages with one dominant operational or reading thread

Prefer hybrid layouts for:

- user detail pages mixing flat narrative content with detached tools or widgets
- analytics workbenches with a flat main canvas and elevated control palettes
- pages where most content benefits from continuity but some modules need stronger independence

Prefer card dominant layouts for:

- dashboard homepages with heterogeneous widgets
- ecommerce product grids
- independently movable or semantically isolated modules

## Rewrite Playbook

1. Flatten the foundation by removing repeated same-level panel fills, borders, shadows, and radii.
2. Re-establish the main page plane and a stable alignment axis.
3. Rebuild grouping through spacing ratios: tighter within groups, looser between true sections.
4. Strengthen hierarchy through headings, labels, and action emphasis so structure no longer depends on boxes.
5. Reintroduce only the minimum separation still needed: rails, sticky context, subdued dividers, or local elevation.
6. Keep contained surfaces for overlays, alerts, detached tools, code-heavy inserts, and other privileged local modules.
7. Validate by checking whether reading order, grouping, and action clarity still hold without decorative containers.

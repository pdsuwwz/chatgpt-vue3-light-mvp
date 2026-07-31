# Review Rubric

## Use This File

Use this rubric when reviewing frontend code or rendered UI from an aesthetic and UX perspective.

## Review Order

Always review in this order:

1. Composition and structural balance
2. Layout rhythm and information density
3. Typography and copy fit
4. Component craftsmanship
5. Interaction states and behavior
6. Color system and surface contrast
7. Depth cues: border, shadow, blur, glow
8. Motion and transition quality
9. Mobile translation

## Severity Language

Use these severity levels:

- **Critical:** the page fails to communicate the core message, action, or structure
- **High:** the hierarchy or visual system materially weakens trust, clarity, or usability
- **Medium:** the direction is acceptable but still generic, noisy, or uneven in meaningful areas
- **Low:** the issue is local polish and does not undermine the overall composition

## Finding Format

For each finding, provide:

1. the visible problem
2. why it harms perception or usability
3. the correction direction

Example structure:

- **High:** The primary header block, metric strip, and feature cards all compete for the same first read.
  Why it matters: the page feels busy and noncommittal, so the user gets no clear entry point.
  Fix direction: reduce the weight of the supporting modules and let the primary header block establish the first hierarchy.

## Review Standards

- Prioritize structural issues over decorative comments.
- Call out when the default state is too loud to support meaningful hover, focus, selected, or error behavior.
- Call out when selected and pressed states are visually confused.
- Call out when component role confusion makes tabs, drawers, tables, or cards feel semantically wrong.
- Call out forced asymmetry or attention-seeking composition as a product-quality issue.
- Call out when the palette is unstable or the accent is overused.
- Call out when shadow, blur, or glow is compensating for weak composition.
- Call out when animation makes the interface feel slower or less professional.
- Explain what should be removed, not only what should be added.

## What To Avoid In Reviews

- lists of CSS tweaks without user impact
- vague praise like "looks modern" or vague criticism like "needs more polish"
- recommending gradients, glass, or motion before fixing hierarchy
- spending half the review on minor spacing issues when the layout is fundamentally generic

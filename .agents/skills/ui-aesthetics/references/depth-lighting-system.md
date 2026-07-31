# Depth Lighting System

## Use This File

Read this file when the UI needs more material definition, better elevation discipline, calmer dark-mode hierarchy, or tighter control over shadows, highlights, glow, and surface separation.

## Core Principles

- Treat depth as structural language for spatial hierarchy, not as decorative polish.
- Keep shadows, highlights, and surface separation consistent enough to imply one coherent lighting model.
- Prefer depth cues that clarify stacking order, material separation, and interaction priority.
- Let base-layer components remain largely flat unless elevation solves a specific problem.
- Treat glow as an exceptional emphasis channel, not a resting-state aesthetic.

## Lighting Model

- Assume one coherent global light logic across the interface.
- Avoid per-component lighting behavior that makes the system feel assembled rather than unified.
- Use light, shadow, and edge definition to reinforce where a surface sits relative to the page plane.

## Surface Hierarchy

- Base-layer surfaces should rely primarily on spacing, tone, and light structural boundaries.
- Raised surfaces should earn their separation through actual layering needs such as menus, popovers, sticky regions, or modal content.
- Do not give many neighboring surfaces the same elevated treatment unless they genuinely belong to one floating layer.
- If multiple modules feel equally lifted, the stacking logic is probably collapsing.

## Shadow Families

### Grounding shadows

- tighter, quieter shadows that help a raised surface feel attached to its immediate plane
- useful when an overlay or floating element needs clearer anchoring

### Elevation shadows

- softer, broader shadows that suggest distance from the base plane
- useful for menus, popovers, modals, and other justified overlays

### Rules

- prefer layered shadow logic over one muddy blurred shadow
- keep ordinary cards, form controls, and layout blocks mostly flat unless elevation is semantically meaningful
- never use shadow as a substitute for spacing, borders, or hierarchy
- if shadows become the dominant visual texture, they are too strong

## Highlight Rules

- Use highlights to define edge clarity and perceived material thickness, not to decorate everything.
- Subtle edge or inner highlights can improve tactile precision on darker or elevated surfaces.
- Highlights should stay quieter than typography and content.
- If a highlight reads first as chrome or gloss, it is too strong.
- Use highlight logic consistently with the rest of the lighting model.

## Glow Rules

- Treat glow as a scarce emphasis resource.
- Reserve it for rare, high-value, or strongly semantic signals.
- Avoid persistent glow on ordinary buttons, cards, form controls, or structural containers.
- Do not use colored glow to compensate for weak hierarchy or weak composition.
- In luminous interfaces, keep glow localized, small in spread, and subordinate to the main layout.
- If glow appears on many elements at once, it stops communicating priority.

## When Elevation Is Justified

Use stronger elevation only when it explains:

- overlays that break out of the document flow
- contextual menus and popovers
- modals and layered dialogs
- tooltips
- sticky regions that need clear separation from scrolling content
- selected or active surfaces only when the workflow truly benefits from a stronger focal plane

Avoid stronger elevation for:

- ordinary content cards in dense grids
- routine form fields
- static dashboard blocks that can be grouped through spacing and tone
- every primary button by default

## Light UI Versus Dark UI

### Light UI

- depth often reads through shadow against bright canvases
- separation can come from subtle cast shadow, light surface contrast, and careful border discipline

### Dark UI

- depth often reads more clearly through lighter surface planes, sharper edge definition, and controlled highlights
- shadows may still help, but they rarely carry the full hierarchy alone
- do not mirror light-mode shadow logic directly into dark mode

### Shared rule

- build elevation through surface hierarchy first, then add shadow only if it still contributes meaningful separation

## Shared Failure Signals

- blurred shadow haze under too many elements
- dark surfaces that differ too little in luminance to establish hierarchy
- glow used as permanent emphasis for ordinary components
- highlights that read as chrome rather than edge definition
- different modules appearing to be lit from different directions
- fake-premium blur trying to replace actual composition

## Quick Depth Check

Before final output, check:

- Is depth clarifying stacking order, or just decorating surfaces?
- Do ordinary components stay mostly flat unless elevation is necessary?
- Are shadows layered and restrained rather than muddy and theatrical?
- Are highlights subtle enough to support the material model without becoming gloss?
- Is glow rare enough to still carry meaning?
- In dark UI, does hierarchy come from surface luminance and edge clarity before shadow?
- If all shadows and glow were removed, would the interface still have clear grouping and hierarchy?

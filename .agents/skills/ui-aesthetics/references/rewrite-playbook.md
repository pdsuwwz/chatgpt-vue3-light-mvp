# Rewrite Playbook

## Use This File

Read this file before editing an existing UI when the user wants the result to feel cleaner, more premium, more concise, or more visually mature.

## Rewrite Levels

### Light Polish

Use when:

- the composition is already correct
- the main issues are spacing, typography, contrast, weak control emphasis, or noisy states

Allowed changes:

- tighten spacing rhythm
- strengthen type hierarchy
- improve CTA prominence
- simplify color usage
- refine shadow and border discipline
- quiet default states and strengthen focus, pressed, or selected behavior
- shorten or remove noisy animation

### Medium Restructure

Use when:

- the page goal is clear but the grouping or emphasis is weak
- several modules compete for attention
- the palette, components, or states need system-level cleanup
- the structure works in broad strokes but the interface still feels generic or cheap

Allowed changes:

- regroup sections
- reweight module prominence
- tighten widths, alignments, and section density
- reduce container count
- rebuild component metrics and hierarchy
- redesign state behavior for consistency
- redesign motion behavior for consistency

### Full Rebuild

Use when:

- the page has no convincing focal point
- the layout pattern is fundamentally generic or mismatched to the content
- component patterns fight the product role
- mobile translation collapses the intended hierarchy

Allowed changes:

- replace the composition system
- rebuild section order
- redefine the stable primary block and supporting modules
- replace weak component patterns
- rebuild state and motion logic from scratch
- reset the color and depth system
- rewrite component treatments to match the new hierarchy

## Decision Rule

Start with the lightest rewrite level that can realistically fix:

1. the structural balance
2. the reading sequence
3. the component quality
4. the state behavior
5. the palette discipline
6. the depth and motion noise

Escalate when the current structure keeps forcing generic outcomes.

## Refactor Sequence

Follow this order:

1. strip decorative noise and remove effects that may be hiding structural problems
2. validate the layout in grayscale or near-grayscale
3. establish the stable primary block
4. regroup secondary content and restore reading order
5. rebuild spacing rhythm and type hierarchy
6. rebuild component metrics and visual discipline
7. refine state behavior: hover, focus, pressed, selected, loading, success, error
8. rebuild the color and surface hierarchy
9. add only the depth the interface still needs
10. add only the motion the interface still needs

## Rewrite Heuristics

- If the UI still fails without gradients, shadows, and glow, do not add them back yet.
- If several related controls fail to share compatible heights, radii, padding, or state logic, the system needs at least medium restructure.
- If selected and pressed states are confused, treat that as a system issue, not a local styling bug.
- If every panel feels lifted, flatten the interface before deciding what truly deserves elevation.
- If a platform or ecommerce page feels squeezed, remove the outer mega-card first and rebuild it as a full-width page skeleton with constrained inner zones.
- If motion is more noticeable than the task, remove it first and then reintroduce only the transitions that clarify response or hierarchy.

## Output Contract

Before making broad edits, state:

1. the chosen rewrite level
2. the main visual failure
3. the intended direction
4. what will be removed or quieted before new polish is added

Short example:

- Rewrite level: medium restructure
- Main problem: the layout is serviceable but every section has equal weight, so the page feels generic
- Direction: reduce container noise, establish a stable primary block, quiet the secondary modules, rebuild component metrics, and move to a calmer color system
- Remove first: unnecessary borders, hover drama, and non-essential shadow

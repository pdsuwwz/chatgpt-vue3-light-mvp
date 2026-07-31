# UI Aesthetics Core Contract

Use this shared guide when adapting the `ui-aesthetics` skill to any agent surface.

## Intent

Raise frontend visual judgment for web interfaces with a bias toward refined product-grade composition, precise component craftsmanship, disciplined interaction states, controlled motion, and coherent depth systems.

## Default goals

- preserve the requested artifact scope and information density
- make hierarchy obvious within seconds
- let layout, spacing, and typography carry most of the quality
- keep color restrained and role-driven
- treat depth and motion as supporting systems, not decoration
- keep the result shippable and maintainable

## Non-negotiables

- Preserve the user's requested scope. A component stays a component unless the user asks for a page.
- Decide the visual thesis before rewriting implementation details.
- Prefer spatial grouping, alignment, and type hierarchy over decorative wrappers.
- Do not add filler marketing copy, fake stats, or extra sections just to make the UI feel designed.
- Keep default states quiet so hover, focus, selected, loading, success, and error states still have headroom.
- Use glow, blur, gradients, and heavy shadow only when they clarify layering or emphasis.
- Recompose for mobile instead of merely squeezing desktop layouts.

## Task routing

Choose one primary route before acting:

1. **Generation** — create a new page, section, or component.
2. **Review** — critique why the UI feels weak, generic, noisy, or cheap.
3. **Refactor** — rewrite the existing implementation directly.
4. **Component Polish** — improve controls, cards, forms, tables, modals, or overlays.
5. **State / Motion Refinement** — tighten hover, focus, active, selected, loading, success, and error behavior.
6. **Depth / Lighting Refinement** — tighten shadow, highlight, blur, glow, and dark-mode separation.

## Priority order

1. scope and artifact boundaries
2. composition and structural balance
3. spacing rhythm and information density
4. typography and copy fit
5. component craftsmanship
6. interaction states and behavior
7. color system and semantic restraint
8. depth cues
9. motion and transitions

## Rewrite depth

- **Light polish** — structure is already right; improve spacing, type, states, and restraint.
- **Medium restructure** — regroup modules, reweight hierarchy, and reduce generic framing.
- **Full rebuild** — replace unstable composition or noisy visual systems from the ground up.

## Output contract

- Start with the route and a short visual thesis.
- Tie critique to readability, trust, focus, or action clarity.
- If rewriting, state the rewrite depth before implementation details.
- Preserve short copy footprints unless content design is explicitly requested.

## Detailed references

Use `reference-map.md` to decide which file under `./references/` to load next.
# Color System

## Use This File

Read this file when the UI needs a more expensive-looking palette, when accent usage feels noisy, or when the page feels flat because the neutrals are weak.

## 1. Build Neutrals First

- Define background, surface, raised surface, text, muted text, and border before choosing the accent.
- Keep neutral steps calm and related.
- Prefer crisp true neutrals or slightly cool neutrals by default.
- Do not default to cream, ivory, beige, or warm off-white as a premium shortcut.
- Introduce noticeable warmth only when the content, brand, or material metaphor clearly calls for it.
- Let sections differ through hierarchy first, not through random tint shifts.

## 2. Use Accent Sparingly

- Choose one primary accent for actions and key emphasis.
- Keep accent concentrated in CTA, active states, selected data points, or one hero signal.
- If the accent appears everywhere, it stops creating hierarchy.
- Do not spend strong accent color on ordinary resting surfaces that should stay structurally quiet.

## 3. Prefer Controlled Saturation

- Higher-end palettes usually rely on disciplined saturation, not maximum vividness.
- Push contrast through value and context before pushing chroma.
- Avoid bright accent-on-dark everywhere unless the product genuinely calls for that energy.
- Quiet interfaces usually feel more expensive when saturation is slightly lower than your first instinct.

## 4. Make Color Assign Role

- Color should communicate structure: action, selection, status, warning, emphasis.
- Do not use multiple decorative hues without distinct semantic jobs.
- Stabilize text and surface colors so the action color remains meaningful.
- Prefer trustworthy, calm palettes over loud brand theater.
- Keep persistent selected state, transient pressed state, and semantic state visually distinct.

## 5. Keep Default States Quiet

- Default states should spend the least amount of color energy in the system.
- Let structure, spacing, and type do most of the work before resting controls start using strong fills.
- Save stronger contrast and hue shifts for hover, focus, selected, success, warning, and error states.
- If the resting UI is already loud, the system loses room for meaningful escalation.

## 6. Handle Semantic Colors With Restraint

- Success, warning, and error colors should feel precise, not shouted.
- Prefer mature, slightly muted semantic tones over raw traffic-light primaries.
- Do not flood large fields or panels with semantic color unless the whole area genuinely carries that state.
- Pair semantic color with iconography, text, or structure rather than relying on hue alone.

## 7. Keep Surfaces Cohesive

- Use a small number of surface tones.
- Raised cards, panels, and overlays should feel like members of one material family.
- If each section has a different background treatment, the product starts to feel assembled instead of designed.
- In dark UI, establish hierarchy through controlled luminance steps before adding glow or heavy shadow.

## 8. Light And Dark Mode Logic

### Light UI

- Depth and grouping can often rely on subtle value shifts, borders, and restrained shadow.
- Pure white can work, but large bright fields may need very light tonal separation to avoid structural drift.

### Dark UI

- Surface hierarchy depends more on luminance differences between layers than on shadow alone.
- Slightly lighter planes and careful edge definition usually clarify depth better than muddy blur.
- Do not simply invert light-mode colors and keep the same contrast logic.

## 9. Avoid Cheap Premium Signals

- Dark background plus cyan glow is not a premium system by itself.
- Gradient fills should support emphasis or atmosphere, not compensate for weak layout.
- Metallic, neon, and glass-like treatments need very tight restraint.
- Colored glow should remain rare and should not replace a coherent neutral system.

## 10. Component Rules

- Primary buttons may carry the strongest accent weight.
- Secondary buttons should rely more on contrast, border, or tonal fill than on competing colors.
- Tags, chips, and badges should usually be quieter than CTAs.
- Do not let charts, alerts, and controls all fight for the same brightest hue.
- Inputs, selects, and ordinary cards should usually rely on neutral discipline before they borrow semantic or brand color.

## 11. Quick Palette Test

Check:

- Are the neutrals stable across sections?
- Do the neutrals feel deliberate without leaning on warm-white luxury cues?
- Is there a single obvious accent hierarchy?
- Would the page still feel credible if the accent saturation dropped by 15%?
- Are support components quieter than primary actions?
- Are default states quiet enough to leave room for selected, focus, and semantic states?
- Are success and error tones mature enough to inform without screaming?
- In dark UI, does surface hierarchy still work before glow is introduced?

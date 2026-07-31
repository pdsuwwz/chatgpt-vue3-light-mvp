# Motion Patterns

## Use This File

Read this file when transitions, micro-interactions, or dynamic feedback feel theatrical, slow, generic, or disconnected from the interface structure, or when the UI needs a clearer motion grammar for components, overlays, or progressive content changes.

## Core Principles

- Motion should explain response, hierarchy, and spatial change before it expresses personality.
- Prefer motion that is felt immediately and understood subconsciously over motion that asks to be watched.
- Different interaction types should move with different weights: localized controls respond faster, larger spatial transitions may take slightly longer.
- Use the fewest motion channels necessary to communicate the change.
- Motion should preserve user orientation, not interrupt reading or delay action.

## Motion Channels

- **Opacity:** useful for confirmation, layering, and controlled reveal
- **Transform:** useful for press states, panel motion, and localized spatial shifts
- **Scale:** acceptable in tight bounds for overlays or pressed states, but rarely for ordinary hover
- **Shadow:** should remain mostly structural; animate lightly if depth feedback genuinely benefits
- **Blur:** reserve for rare overlay or atmosphere use cases, not routine interaction transitions

## Shared Failure Signals

- transitions that become more noticeable than the task itself
- hover motion that feels floaty, slow, or performative
- pressed states that bounce, ripple, or exaggerate
- content changes that make users wait for information they already requested
- multiple strong motion channels firing at once for minor interactions
- reveal sequences that feel choreographed rather than functional

## Hover Motion

### Purpose

- confirm interactivity and cursor location immediately

### Refined feel

- almost imperceptible, fast, and machine-like
- more like a surface or contrast shift than a visible animation

### Cheap or theatrical failures

- slow fade-ins
- obvious lift on flat list items
- playful bounce or scale for routine controls

### Preferred channels

- opacity
- contrast
- very light shadow change when depth already exists

### Restraint level

- extreme

### Notes

- ordinary hover states should rarely alter layout or obvious geometry

## Press Feedback

### Purpose

- acknowledge click or tap input instantly

### Refined feel

- firm, grounded, and slightly compressed
- stronger on contact than on release, without drama

### Cheap or theatrical failures

- scaling up on press
- oversized ripple effects
- lag between input and visible acknowledgment

### Preferred channels

- transform compression
- darker value
- reduced perceived elevation

### Restraint level

- high

### Notes

- use transform-based feedback to avoid reflow

## Tab Switching

### Purpose

- help users move across parallel views without losing orientation

### Refined feel

- the content changes decisively
- the main motion belongs to the active indicator or the tab state itself

### Cheap or theatrical failures

- full-content fades that delay reading
- sluggish sliding indicators
- transitions that make tabs feel like carousel slides when they are not

### Preferred channels

- indicator translation
- label contrast
- minimal opacity shifts on tab labels if needed

### Restraint level

- extreme

### Notes

- keep content motion minimal unless the interface is explicitly paginated

## Accordion Expand / Collapse

### Purpose

- reveal nested content while preserving vertical spatial logic

### Refined feel

- smooth vertical displacement that the eye can track
- nearby layout moves clearly enough to maintain context

### Cheap or theatrical failures

- jumpy end states
- wobbling layout
- exaggerated spring behavior in dense lists

### Preferred channels

- height change
- vertical transform
- opacity on revealed inner content

### Restraint level

- moderate

### Notes

- avoid blur and avoid motion that makes the revealed content feel detached from the parent row

## Modal Enter / Exit

### Purpose

- establish a new dominant layer and interrupt the current page flow

### Refined feel

- decisive, elevated, and focused
- the modal arrives as a new z-layer, not as a scene transition

### Cheap or theatrical failures

- flying in from off-screen
- dramatic rotation
- exaggerated bounce or overshoot

### Preferred channels

- backdrop opacity
- modal opacity
- slight scale or slight translate

### Restraint level

- high

### Notes

- blur on the backdrop is optional and should never compensate for weak hierarchy

## Drawer Transitions

### Purpose

- introduce a parallel workflow or panel while preserving page context

### Refined feel

- edge-anchored insertion with controlled deceleration
- scrim and panel movement feel synchronized

### Cheap or theatrical failures

- flat, linear slide-deck motion
- floating drawer panels that behave like modals
- panel and scrim timing that feel disconnected

### Preferred channels

- horizontal or vertical translation, depending on edge
- scrim opacity

### Restraint level

- moderate

### Notes

- anchor the motion to the viewport edge, not to a floating card metaphor

## Toast Motion

### Purpose

- deliver transient system feedback without interrupting the main workflow

### Refined feel

- confident entry, quiet presence, graceful exit
- visible enough to register but not dominant enough to distract

### Cheap or theatrical failures

- wobble, bounce, or celebratory motion
- sudden disappearance with no soft exit
- countdown UI that creates anxiety

### Preferred channels

- slight translation
- opacity

### Restraint level

- very high

### Notes

- keep toast motion peripheral and short

## Dropdown / Popover Motion

### Purpose

- unfold contextual options from a local origin trigger

### Refined feel

- fast, origin-aware, and subordinate to the selection task
- the panel feels connected to the trigger instead of appearing arbitrarily

### Cheap or theatrical failures

- linear slide-down motion
- sequentially animating menu items after the container opens
- delayed assembly of routine menus

### Preferred channels

- transform with origin awareness
- opacity

### Restraint level

- extreme

### Notes

- keep menus actionable immediately; the user should not wait for them to finish “building”

## Skeleton To Content Transition

### Purpose

- mask loading while preserving spatial structure and preventing layout shift

### Refined feel

- geometry remains stable
- placeholder and real content hand off smoothly

### Cheap or theatrical failures

- flash-snap replacement
- collapsing structure before content appears
- high-contrast shimmer that becomes more visible than the loading itself

### Preferred channels

- opacity cross-fade
- low-contrast shimmer where appropriate

### Restraint level

- very high

### Notes

- the skeleton should map closely to the final content footprint

## List / Card Reveal

### Purpose

- guide the eye through newly introduced groups of content without staging a performance

### Refined feel

- short, cohesive reveal that supports scan order
- enough movement to register new content, not enough to become choreography

### Cheap or theatrical failures

- long waterfall stagger
- large translation distances
- reveal sequences that block scrolling or interaction

### Preferred channels

- slight translation
- opacity

### Restraint level

- high

### Notes

- if many items load at once, the sequence should still finish quickly and remain non-blocking

## Quick Motion Check

Before final output, check:

- Does each transition explain state, hierarchy, or spatial change?
- Is any motion becoming more memorable than the content or action?
- Are hover and pressed states tighter than overlays and panel transitions?
- Are multiple strong motion channels being used where one would suffice?
- Do transitions preserve orientation instead of delaying interaction?
- Are overlays moving like layers rather than scenes?
- Do loading and reveal transitions avoid flash, wobble, and staged choreography?

# Component Aesthetics

## Use This File

Read this file when the UI needs stronger component craftsmanship, when controls feel generic or template-like, or when the page structure is acceptable but the individual elements still feel cheap, noisy, or imprecise.

## Core Principles

- Refined components feel geometrically controlled before they feel styled.
- Use optical alignment, spacing, and radius discipline before relying on shadows, gradients, or glow.
- Keep default states quiet and let focus, pressed, selected, and error states carry stronger emphasis.
- Let each component behave according to its role; do not make every control feel like a hero element.
- Prefer restraint in ordinary controls. Precision feels more expensive than decoration.

## Shared Failure Signals

- cramped labels or values with insufficient breathing room
- inconsistent heights, radii, or internal padding across related controls
- default states that already use too much border, fill, shadow, or color
- hover treatments that rely on lift, glow, or shadow bloom instead of clear feedback
- controls that borrow the wrong visual language from other component types
- technically aligned elements that still feel optically off

## Button

### What gives refinement

- strong optical centering between label, icon, and container
- confident padding and a stable silhouette across sizes
- a pressed state that feels mechanically resolved rather than merely recolored

### What makes it feel cheap

- cramped text, weak label hierarchy, or inconsistent radii between button sizes
- default shadows used as decoration instead of depth clarification
- glowing or gradient-heavy primary buttons in ordinary product UI

### What should stay restrained

- hover motion, glow, and ornamental depth

### Underestimated details

- pressed state behavior
- icon-to-label spacing
- shared height rhythm with adjacent inputs and selects

### Common overdesign traps

- heavy gradients
- oversized hover lift
- theatrical ripple effects

## Input

### What gives refinement

- enough vertical room for text to breathe
- crisp contrast between placeholder, entered value, and supporting label
- a focus state that is clear, external, and geometry-safe

### What makes it feel cheap

- heavy default borders that overpower the resting layout
- muddy filled backgrounds in the default state
- tiny floating labels that sacrifice readability for novelty

### What should stay restrained

- error color intensity
- default fill weight

### Underestimated details

- text inset from the left edge
- label alignment with input content
- cursor and placeholder tone

### Common overdesign traps

- full-field red error fills
- overly dark resting backgrounds
- focus treatments that shift text or padding

## Select

### What gives refinement

- closed-state metrics that match text inputs
- a dropdown panel that clearly detaches into a higher layer when opened
- list-item hover states that feel clean and edge-aware

### What makes it feel cheap

- browser-default styling leaking through a custom system
- oversized chevrons or decorative icons that dominate the field
- dropdowns that feel slower than the selection task requires

### What should stay restrained

- open animation duration
- scrollbar styling

### Underestimated details

- chevron size and weight
- edge-to-edge row highlighting with controlled inner padding
- panel spacing relative to the trigger

### Common overdesign traps

- delayed sliding menus
- over-customized internal scrollbars
- dropdowns that visually compete with the page

## Tabs

### What gives refinement

- active state carried mainly by text contrast and a crisp structural indicator
- fast, decisive switching behavior
- inactive states that remain legible without competing with the active tab

### What makes it feel cheap

- tabs styled like pills or segmented controls without a reason
- active backgrounds or boxes that add unnecessary weight
- transitions that delay already-requested content

### What should stay restrained

- indicator animation
- background treatment

### Underestimated details

- inactive text contrast
- indicator thickness and alignment to the grid
- spacing between tabs versus page rhythm

### Common overdesign traps

- lagging sliding-pill indicators
- full-content fades on every tab switch
- equal emphasis across active and inactive tabs

## Card

### What gives refinement

- definition through spacing, tone, and very light structural separation
- calm internal hierarchy with padding that exceeds or matches surrounding rhythm
- surface treatment that supports grouping without pretending every card floats

### What makes it feel cheap

- large blurred shadows under every card
- oversized radii that make data surfaces feel juvenile
- too many nested boxes inside the card

### What should stay restrained

- corner radius
- hover elevation
- background tint shifts

### Underestimated details

- internal padding versus external margin balance
- how many surface treatments exist in one card
- whether the card truly needs to break from the page plane

### Common overdesign traps

- dramatic lift-on-hover
- muddy shadow haze
- decorative chrome compensating for weak hierarchy

## Table

### What gives refinement

- quiet structure, generous row rhythm, and disciplined alignment
- numbers aligned for comparison and text aligned for scan speed
- headers that label clearly without overpowering the data

### What makes it feel cheap

- zebra striping used as a substitute for spacing and alignment
- strong vertical dividers that fragment reading
- sticky headers that cast permanent heavy shadows

### What should stay restrained

- header styling
- row hover treatment
- visual separators

### Underestimated details

- tabular numeral usage for numeric columns
- column alignment discipline
- row height consistency across dense and relaxed tables

### Common overdesign traps

- loud header backgrounds
- over-busy cell borders
- card-like styling applied to every row

## Modal

### What gives refinement

- clear z-layer separation from the page
- strong internal structure with a decisive title area and stable actions
- enough padding to make the modal feel deliberate rather than cramped

### What makes it feel cheap

- weak separation from the background
- action buttons crowded against the edge
- content and actions bleeding together without clear hierarchy

### What should stay restrained

- entrance animation
- decorative depth effects

### Underestimated details

- close button placement within the top-right padding zone
- bottom action area structure
- scroll behavior inside long modal content

### Common overdesign traps

- flying or bouncing dialog entrances
- multiple modal layers
- blur and glow used to fake authority

## Drawer

### What gives refinement

- clear anchoring to the viewport edge
- stable internal structure for secondary workflows or settings
- motion that supports insertion rather than spectacle

### What makes it feel cheap

- floating drawer panels that behave like oversized modals
- widths so large that the pattern stops making semantic sense
- scrim and panel movement that feel disconnected

### What should stay restrained

- width
- internal nesting complexity

### Underestimated details

- top and bottom anchoring
- width relative to task complexity
- relationship between drawer title, content, and actions

### Common overdesign traps

- arbitrary outer margins
- heavy navigation stuffed into a secondary panel
- modal-style visual treatment on edge-anchored UI

## Badge

### What gives refinement

- tiny, disciplined geometry with strong optical centering
- muted background and stronger text of the same hue family
- minimal visual weight relative to surrounding controls

### What makes it feel cheap

- saturated color that competes with buttons and alerts
- pill geometry that feels inflated or cramped
- double-emphasis through both strong fill and strong outline

### What should stay restrained

- saturation
- radius
- outline usage

### Underestimated details

- optical vertical centering of tiny text
- hue relationship between background and label
- horizontal padding at very small sizes

### Common overdesign traps

- neon status chips
- badge treatments louder than the information they annotate
- oversized corner rounding on dense UI

## Toast

### What gives refinement

- confident but peripheral presence
- concise message hierarchy
- predictable stacking and dismissal behavior

### What makes it feel cheap

- long wrapped copy that turns a transient notice into a panel
- entry motion that competes with the main task
- poor queue behavior when many toasts appear quickly

### What should stay restrained

- screen time
- animation intensity
- optional progress affordances

### Underestimated details

- stacking rhythm
- message length discipline
- whether the toast should replace or accumulate

### Common overdesign traps

- countdown bars
- bouncing entries
- success toasts louder than the successful action

## Switch

### What gives refinement

- a thumb and track relationship that feels deliberate and tactile
- quiet inactive state and decisive active state
- clear internal spacing so the thumb never feels jammed into the track

### What makes it feel cheap

- flat vector-like construction with no material hierarchy
- active colors that are harsher than the surrounding system
- cramped geometry at small sizes

### What should stay restrained

- state color intensity
- internal decoration

### Underestimated details

- thumb-to-track gap
- contrast between active and inactive tracks
- shared scale with adjacent form controls

### Common overdesign traps

- icons stuffed into the thumb
- exaggerated motion
- overly glossy or toy-like treatments

## Checkbox

### What gives refinement

- a clean box shape with controlled corner radius
- a checkmark drawn for the box rather than dropped in generically
- label alignment that feels optically exact

### What makes it feel cheap

- browser-default appearance in an otherwise custom system
- indeterminate states that look accidental or misaligned
- oversized visible boxes used to solve hit-target problems

### What should stay restrained

- animation
- visible size inflation

### Underestimated details

- first-line label alignment
- stroke weight of the checkmark
- contrast relationship between checked and unchecked states

### Common overdesign traps

- ripple-heavy check interactions
- oversized boxes instead of larger hit areas
- checkmarks that feel too generic for the component scale

## Quick Component Check

Before final output, check:

- Do related controls share compatible heights, radii, and padding logic?
- Are default component states quiet enough to leave room for interaction states?
- Do icon weight, label tone, and geometry belong to the same visual system?
- Is depth used only where elevation is genuinely meaningful?
- Are hover and pressed behaviors restrained enough for serious product UI?
- Does each component still look credible if gradients, glow, and strong shadow are removed?

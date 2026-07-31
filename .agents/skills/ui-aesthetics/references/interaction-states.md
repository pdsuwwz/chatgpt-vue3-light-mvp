# Interaction States

## Use This File

Read this file when the quality of hover, focus, pressed, selected, loading, success, error, or disabled behavior matters, or when the UI feels noisy, inconsistent, or theatrically reactive even though the static layout is acceptable.

## Core Principles

- Treat states as controlled variations of one component system, not as separate visual identities.
- Let the default state stay quiet so interactive and semantic states still have visual headroom.
- Prefer state changes that preserve geometry and layout stability while adjusting emphasis, contrast, or local feedback.
- Distinguish clearly between transient interaction states and persistent data or selection states.
- Keep state feedback local to the element or task whenever possible.

## Preferred State Channels

- **Hover:** subtle contrast, luminance, border, or icon emphasis
- **Pressed:** slight compression, reduced elevation, darker value
- **Focus:** external ring or outline with stable internal geometry
- **Selected:** text contrast, tonal fill, or localized structural indicator
- **Disabled:** reduced emphasis through tone or opacity while preserving recognition
- **Loading:** inline indicator substitution without container collapse
- **Success:** brief localized confirmation with low visual drama
- **Error:** stroke, icon, and helper text working together

## Shared Failure Signals

- default states that already spend too much contrast, color, or shadow
- hover feedback that causes layout jitter or visible choreography
- missing pressed feedback that makes controls feel unresponsive
- selected states styled like click feedback, or vice versa
- focus treatments that damage padding or readability
- disabled states that become illegible
- loading indicators that flash for near-instant actions
- error states that rely on red alone

## Default

### Role

- establish structural clarity, hierarchy, and available actions without competing for attention

### Refined feel

- quiet, highly legible, and structurally confident
- spacing, typography, and gentle separation carry most of the work

### Cheap or overdone signals

- heavy default shadows
- loud borders on every element
- unnecessary accent color on resting controls

### Preferred change channels

- this is the baseline; other states should deviate from it

### What should remain stable

- dimensions
- typography baselines
- spacing rhythm
- grid alignment

### Common mistakes

- trying to make the default state visually exciting
- spending so much emphasis in the resting state that focus and error no longer stand out

## Hover

### Role

- confirm interactivity and hit-area accuracy immediately

### Refined feel

- quick, local, and low-drama
- more like a material shift than a visible animation

### Cheap or overdone signals

- hover lift on ordinary list rows or flat controls
- glow or shadow bloom used as default interactivity signal
- slow fade-ins that make the interface feel heavy

### Preferred change channels

- background luminance
- border contrast
- icon or label contrast

### What should remain stable

- element footprint
- text weight
- surrounding layout

### Common mistakes

- adding a visible border that shifts layout
- changing multiple strong channels at once for minor controls

## Active / Pressed

### Role

- acknowledge physical interaction immediately and bridge user action to system response

### Refined feel

- firm, grounded, and mechanically resolved
- the component feels momentarily compressed, not decorated

### Cheap or overdone signals

- scaling up on click
- flashy inverse-color responses
- theatrical ripple behavior that delays feedback

### Preferred change channels

- slight transform compression
- reduced perceived elevation
- darker or denser surface value

### What should remain stable

- layout footprint
- nearby alignment
- label legibility

### Common mistakes

- no pressed feedback at all
- reflowing nearby content instead of using transform-based feedback

## Focus

### Role

- show keyboard and assistive-navigation position clearly and accessibly

### Refined feel

- crisp, external, radius-aware, and unmistakable
- utility-forward without looking accidental

### Cheap or overdone signals

- fuzzy browser glow left untreated in an otherwise precise system
- heavy inner borders that eat into padding
- invisible focus because outline was removed

### Preferred change channels

- external ring
- external offset gap when helpful

### What should remain stable

- internal padding
- text position
- core background and content geometry

### Common mistakes

- removing focus styles entirely
- making focus too decorative or too faint to navigate by

## Selected

### Role

- persistently indicate current choice, active view, or chosen item within a set

### Refined feel

- decisive but integrated into the system
- stronger contrast or a clear structural marker rather than a full visual takeover

### Cheap or overdone signals

- flooding the entire element with strong saturated brand color
- styling selected state like a pressed-state interaction effect

### Preferred change channels

- text contrast
- tonal fill
- localized indicator line, bar, or edge treatment

### What should remain stable

- spatial footprint
- surrounding rhythm
- component role clarity

### Common mistakes

- confusing selected with active/pressed
- making every selected item visually louder than the content it contains

## Disabled

### Role

- communicate current unavailability without confusing the system structure or stealing attention

### Refined feel

- quieter, lower emphasis, but still recognizable and legible
- visually present enough to preserve spatial memory

### Cheap or overdone signals

- disappearing into the background
- overly dramatic “not allowed” styling
- contrast so low that the control becomes unreadable

### Preferred change channels

- tone reduction
- saturation reduction
- measured opacity reduction

### What should remain stable

- shape
- size
- position
- component identity

### Common mistakes

- relying on disabled appearance alone without explaining why the action is unavailable
- removing the element entirely and breaking layout memory

## Loading

### Role

- confirm that the system received the action and is working

### Refined feel

- localized, context-aware, and structurally stable
- the interface acknowledges work without freezing more of the screen than necessary

### Cheap or overdone signals

- full-screen loading for small localized actions
- flashy or overly custom busy indicators
- brief spinner flashes for near-instant operations

### Preferred change channels

- inline spinner or progress affordance
- label substitution or opacity change
- temporary interaction lock where necessary

### What should remain stable

- container size
- page layout
- surrounding content position

### Common mistakes

- collapsing buttons or controls during loading
- using the same loading response regardless of action scope

## Success

### Role

- confirm completion clearly, then get out of the way

### Refined feel

- brief, calm, and proportional to the action
- more like closure than celebration

### Cheap or overdone signals

- confetti-style feedback
- giant checkmarks
- loud neon success styling that competes with the work itself

### Preferred change channels

- icon substitution
- subtle tonal shift
- concise inline or toast confirmation

### What should remain stable

- surrounding layout
- workflow continuity
- user momentum

### Common mistakes

- forcing manual dismissal for trivial success states
- making success louder than the completed task

## Error

### Role

- stop the user safely, identify failure clearly, and provide a path to resolution

### Refined feel

- specific, local, and corrective
- visually clear without becoming punitive

### Cheap or overdone signals

- shaking the UI
- flooding large areas with red or pink
- vague text that explains nothing

### Preferred change channels

- stroke color
- warning icon
- helper text
- localized contrast increase

### What should remain stable

- user-entered data
- component geometry
- surrounding layout

### Common mistakes

- relying only on color
- clearing user input on failure
- escalating local errors into page-wide panic styling

## Quick State Check

Before final output, check:

- Are default states quiet enough to leave room for interaction and semantic states?
- Do hover states confirm interactivity without shifting layout?
- Do pressed states feel immediate and mechanically resolved?
- Are selected states clearly different from pressed states?
- Are focus states visible, external, and accessible?
- Are disabled states quiet but still understandable?
- Do loading states preserve geometry and match the scope of the task?
- Do success states recede quickly?
- Do error states combine color, structure, and text instead of relying on red alone?

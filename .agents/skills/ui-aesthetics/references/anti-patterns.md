# Anti-Patterns

## Use This File

Read this file when the output looks polished on first glance but still feels generic, noisy, or cheap.

## Template Hero Plus Card Grid

Symptoms:

- centered headline, paragraph, and CTA above a predictable feature grid
- every section feels interchangeable with any SaaS landing page
- the page has no product structure or hierarchy

Corrective move:

- choose a clearer alignment system
- establish a stable primary block in the first viewport
- vary density only where the content role truly requires it

## Narrow Page Shell

Symptoms:

- a full page sits inside a small centered card-like wrapper without a product reason
- large amounts of screen width are left unused on desktop
- the result feels like a mockup pasted onto the page instead of a real page layout

Corrective move:

- let page-level layouts span the viewport by default
- constrain inner content areas intentionally instead of boxing the whole page
- reserve centered shells for components, dialogs, or specific editorial use cases

## Centered Platform Slab

Symptoms:

- a marketplace, ecommerce, portal, or activity page is wrapped inside one oversized centered card
- side rails, hero framing, and product streams all compete inside one compressed central block
- the main visual and product grid feel squeezed even though the viewport has plenty of width

Corrective move:

- expand the page skeleton across the viewport first
- keep full-page framing flat or lightly structured, then card only the modules that truly need separation
- let category rails, hero zones, campaign bands, and product streams claim horizontal space according to their role

## Scope Inflation

Symptoms:

- a card, widget, or modal prompt gets expanded into a full page or dashboard shell
- navigation, hero copy, footer, or extra sections appear without being requested
- the result feels like a themed demo site instead of the artifact the user asked for

Corrective move:

- lock the requested artifact type before designing
- keep any surrounding canvas minimal and visually quiet
- spend the effort on the requested component itself rather than invented page chrome

## Copy Inflation

Symptoms:

- ordinary cards receive extra headlines, blurbs, badges, or CTA text that were not requested
- visual polish comes from added words instead of better hierarchy
- the interface feels verbose for the amount of functionality it actually has

Corrective move:

- preserve the original information density by default
- tighten labels and supporting text instead of multiplying them
- add new copy only when it solves a functional or clarity problem

## Forced Asymmetry

Symptoms:

- columns, offsets, or card sizes are intentionally imbalanced without a product reason
- the layout leans on tension to feel designed
- the page tries to look bespoke by breaking alignment discipline

Corrective move:

- restore structural balance first
- use hierarchy through spacing, typography, and grouping instead of imbalance
- keep deviations from symmetry rare and content-driven

## Equal-Weight Everything

Symptoms:

- every card, badge, and section competes for the same attention
- there is no fast path for the eye
- the page feels busy despite having enough whitespace

Corrective move:

- reduce the number of visually loud surfaces
- decide what is primary, secondary, and tertiary
- compress secondary modules

## Surface Inflation

Symptoms:

- too many boxes, strokes, shadows, pills, and rounded corners
- layout feels padded but not precise
- components look "designed" individually but weak together

Corrective move:

- remove non-essential containers
- let spacing and typography separate content
- keep only a small set of surface treatments

## Border Soup

Symptoms:

- borders appear on nearly every card, input, panel, and nested region
- boxes are used to explain relationships that spacing should already make clear
- the interface looks like a wireframe that never became a product

Corrective move:

- remove unnecessary strokes first
- re-establish grouping through spacing, alignment, and type hierarchy
- keep borders for true structure, not default separation

## Loud Default State

Symptoms:

- resting controls already use strong contrast, shadows, or color
- the screen feels busy before any interaction happens
- hover, focus, and error states have no visual headroom left

Corrective move:

- quiet the resting state first
- reserve stronger emphasis for interaction and semantic states
- let default hierarchy come from spacing, tone, and typography

## Muddy Premium Palette

Symptoms:

- neutral colors shift too much from section to section
- accent colors appear in too many places
- "premium" is attempted through dark backgrounds plus bright glow
- cream, beige, or warm off-white is used by default to imply luxury

Corrective move:

- stabilize the neutral scale first
- return to crisp neutral or slightly cool neutral surfaces unless warmth is purposeful
- reduce accent usage to actions and a few emphasis points
- choose restrained contrast over attention-seeking drama

## Shadow Fog And Decorative Glow

Symptoms:

- shadows are broad, blurry, and always present
- glow is added without a clear source or purpose
- depth effects obscure edges instead of clarifying them

Corrective move:

- use fewer shadow styles with clearer intent
- keep glow minimal and rare, limited to active emphasis or subtle separation
- let borders and contrast carry most separation

## Fake Premium Blur

Symptoms:

- blur is used to imply sophistication instead of solving layering
- cards, overlays, or hero areas feel hazy rather than precise
- dark UI leans on foggy effects instead of surface hierarchy

Corrective move:

- remove blur and test whether structure still holds
- rebuild depth through luminance, edge definition, and restrained layering
- reintroduce blur only where it genuinely improves separation

## Permanent Glow

Symptoms:

- primary buttons, cards, or idle controls glow in their resting state
- multiple elements all appear equally “special”
- the page tires the eye before interaction begins

Corrective move:

- treat glow as exceptional, not structural
- reserve it for rare active, semantic, or high-value focal signals
- rebuild emphasis through hierarchy before adding luminous effects

## Motion As Decoration

Symptoms:

- everything fades, slides, scales, and blurs at once
- the UI feels slower after animation is added
- hover or entrance effects call attention to themselves

Corrective move:

- animate only what improves orientation or feedback
- shorten durations
- remove overlapping motion channels on the same element

## Hover Theater

Symptoms:

- ordinary controls lift, bloom, tilt, or glow dramatically on hover
- the user notices the effect more than the affordance
- list density breaks because each row performs on cursor contact

Corrective move:

- keep hover local, short, and low-drama
- prefer contrast or tone shifts over visible travel
- reserve stronger motion for overlays or clearly elevated surfaces

## Selected / Pressed Confusion

Symptoms:

- persistent selected items look like they are being actively clicked
- active feedback looks identical to an ongoing chosen state
- tabs, chips, or filters feel semantically muddy

Corrective move:

- keep pressed states transient and mechanical
- keep selected states persistent and structurally clear
- use different channels for interaction feedback versus lasting choice

## Panel Float Syndrome

Symptoms:

- cards, drawers, sticky regions, and overlays all appear lifted to the same degree
- surface hierarchy collapses into one broad floating layer
- nothing feels anchored to the page plane

Corrective move:

- flatten the base layer first
- reserve stronger elevation for true overlays and justified breakouts
- make each level of depth earn its separation

## False Minimalism

Symptoms:

- the page is sparse but not intentional
- large empty gaps replace real hierarchy
- typography is weak, so the interface feels unfinished instead of refined

Corrective move:

- strengthen alignment, spacing, and copy hierarchy
- strengthen focal contrast through composition before adding effects
- let whitespace support hierarchy rather than replace it
- make the primary message more decisive

## Wall Of White

Symptoms:

- every card and panel sits on the same pure-white field with little grouping context
- the eye struggles to anchor structural regions
- dashboard layouts feel scattered despite having enough whitespace

Corrective move:

- introduce subtle field separation only where it clarifies structure
- group related regions through tone and spacing before adding more containers
- keep the background system calm and limited

## Role Confusion

Symptoms:

- tabs behave like pills, drawers behave like modals, tables behave like card grids
- controls borrow visual language from unrelated patterns
- the UI feels trend-driven rather than semantically clear

Corrective move:

- restore the intended role of each component
- let structure and behavior follow the interaction pattern, not a visual fad
- simplify styling until the component reads correctly again

## Desktop Shrink-On-Mobile

Symptoms:

- desktop multi-column logic collapses into a long, flat stack
- emphasis disappears on small screens
- cards and controls feel cramped or repetitive

Corrective move:

- redesign the mobile reading sequence
- combine or remove low-value supporting modules
- preserve the primary action in the first viewport

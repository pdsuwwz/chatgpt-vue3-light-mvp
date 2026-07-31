# Motion Principles

## Use This File

Read this file when the UI needs more polished transitions, when hover and reveal behavior feel cheap, or when animation is making the interface slower instead of smoother.

## 1. Give Motion A Job

- Use motion for orientation, emphasis, or feedback.
- Remove any animation that exists only to look modern.
- If static hierarchy already solves the problem, do not animate it.

## 2. Keep Timings Tight

- Favor `120-180ms` for controls and hover feedback.
- Favor `180-280ms` for panels, drawers, and section shifts.
- Long motion often feels less professional in product UI and should be avoided.

## 3. Reduce Motion Channels

- Avoid combining fade, slide, scale, blur, and glow on the same element.
- Pick one primary transition behavior per interaction.
- The cleaner the layout, the less motion it needs.

## 4. Make Hover States Precise

- Hover should confirm interactivity, not become a spectacle.
- Small shifts in contrast, elevation, or scale are usually enough.
- If cards jump, bloom, and cast dramatic shadows on hover, the UI starts to feel theatrical.

## 5. Use Reveal Motion Carefully

- Stagger only when it improves scan order.
- Prefer subtle section entrances over repeated element-by-element choreography.
- Avoid making users wait through decorative reveals for already obvious content.
- Avoid reveal patterns that turn the interface into a showpiece.

## 6. Keep Feedback Responsive

- Pressed, selected, expanded, and loading states should respond immediately.
- Use motion to confirm system response, not to delay it.
- Snappy feedback usually feels more professional than soft, floaty easing.

## 7. Protect Reduced-Motion Readability

- Important states must still read clearly without animation.
- Motion should enhance comprehension, not carry all of it.
- Avoid relying on animation alone to explain hierarchy changes.

## 8. Quick Motion Test

Check:

- Does every transition explain state or structure?
- Can any sequence be shortened without losing clarity?
- Are hover and entrance effects quieter than the content itself?
- Does the interface feel faster after animation is added, not slower?

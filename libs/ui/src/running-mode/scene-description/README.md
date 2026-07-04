# Scene Description Area

This note indexes the focused scene-description Storybook prototype. Durable conclusions belong in [Running Mode findings](../../../../../docs/planning/running-mode/findings.md), unsettled directions belong in [Running Mode hypotheses](../../../../../docs/planning/running-mode/hypotheses.md), and cross-mode content rules belong in the [Building Mode content authoring guidance draft](../../../../../docs/planning/building-mode/content-authoring-guidance-draft.md).

## Stories

Storybook: `Running Mode/Scene Description`

The prototype exercises:

- bullet-list scene details at `400px`, `480px`, `560px`, and `640px`;
- an optional scene title;
- flavor text replacing scene details through a lens;
- a closed attention-drawing entrance reminder and an automatically open comparison;
- an optional scene-sketch popup;
- all four combinations of optional flavor text and entrance reminders;
- a bounded overflow stress state.

Flavor text is limited to five sentences. This content budget directly shaped the lens comparison and has been promoted to the durable Building Mode guidance linked above.

## Prototype Caveats

- The `208px` card height is a layout-testing constraint, not a settled ideal. The intended case avoids scrolling; the stress story shows internal overflow.
- Layout prototypes may use the content inside a card or integrate it directly into a larger region.
- Scene title ownership and T1 versus fast-T2 placement remain layout questions.
- Popups use absolute positioning inside a clipped card and may be cut off. Product implementation should use an appropriate positioned popup primitive.

## Outcomes

- [F010 - Scene details use a bullet list](../../../../../docs/planning/running-mode/findings.md#f010---scene-details-use-a-bullet-list)
- [F011 - Flavor text works as an optional scene-details lens](../../../../../docs/planning/running-mode/findings.md#f011---flavor-text-works-as-an-optional-scene-details-lens)
- [F012 - Entrance reminders start closed and draw attention](../../../../../docs/planning/running-mode/findings.md#f012---entrance-reminders-start-closed-and-draw-attention)
- [A lightweight scene sketch can replace room geometry prose](../../../../../docs/planning/running-mode/hypotheses.md#a-lightweight-scene-sketch-can-replace-room-geometry-prose)
- [Overflowing scene details may expand as an anchored overlay](../../../../../docs/planning/running-mode/hypotheses.md#overflowing-scene-details-may-expand-as-an-anchored-overlay)
- [Can scene details become an image-led scan surface?](../../../../../docs/planning/running-mode/open-questions.md#can-scene-details-become-an-image-led-scan-surface)

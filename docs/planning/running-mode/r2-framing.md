# Running Mode Layout R2 Framing

R2 is the next full-screen layout iteration after the FPO-only R1 prototypes. Do not start R2 until component-internal studies have provided stronger evidence about content structure and dimensions.

This document holds iteration-specific constraints and candidate directions. Durable conclusions belong in [findings](./findings.md); untested general directions belong in [hypotheses](./hypotheses.md).

## Component Evidence

- [Participant and roster prototype](../../../libs/ui/src/running-mode/roster/README.md) establishes the tested content, states, and fixtures behind the roster constraints.

## Constraints Carried From R1

- Do not add live setting/location/adventure breadcrumbs.
- Do not keep a threat-level badge after an encounter enters live play.
- Do not reserve permanent layout space for Targets.
- Do not create an "A/M highlights" widget. A/M highlighting means cross-highlighting related participants when a conflict source is hovered or focused.
- Keep participant selection and participant/actor detail spatially close.
- Treat the all-lenses direction as deferred, not as a primary R2 candidate.
- Give width-sensitive content explicit minimum or fixed dimensions where necessary.

## Candidate Layouts

R2 can begin with a small known set and leave a couple of slots for ideas discovered during component work:

- a dual-plane layout that gives prep/location and session/encounter distinct ownership without forcing a 50/50 split;
- a session-dominant layout where prep hugs it through the header and a right column;
- a horizontal participant treatment;
- one map-first layout tested with real image readability constraints;
- a tabbed workbench, if component work identifies a stable frame that should remain outside the tabs.

The hand-drawn layout families and width experiments are captured in [`./iterations/layout-r1/feedback-layout-patterns.png`](./iterations/layout-r1/feedback-layout-patterns.png). Treat the image as a space-allocation sketch, not a prescribed set of layouts.

## Open Slots

Do not fill the entire R2 set in advance. Reserve one or two prototype slots for directions that emerge from the component-internal studies.

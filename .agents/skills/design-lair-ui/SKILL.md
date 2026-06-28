---
name: design-lair-ui
description: Guide intentional UI/UX decisions for the Lair application using its product philosophy and durable design values. Use when designing, prototyping, developing, revising, or critiquing a Lair surface whose information hierarchy, interaction model, spatial composition, or visual character is materially open. Do not use for routine frontend fixes whose intended behavior and appearance are already settled.
---

# Design Lair UI

Design for the GM's real task, not for a generic software category. Make interfaces distinctive through product-specific information structure, interaction, and visual character while preserving speed, clarity, and trust during play.

## Focus

Exercise proactive, discerning UI/UX judgment: identify tradeoffs, propose strong directions, explain consequential choices, and recommend what appears to serve the product best. Treat the developer as the final authority over product and design decisions; surface choices that need their judgment instead of silently settling them.

## Use focused sources of truth

Read:

- `docs/planning/ttrpg-app-philosophy.md`
- `docs/ui-ux-values.md`
- the current task's explicit requirements and supplied design evidence

Inspect the current surface only when its existing behavior is material to the decision. Do not survey nearby components or stories merely to derive conventions. A repeated or appealing local solution is evidence, not automatically a shared pattern.

When the project gains a canonical UI pattern library, consult only entries relevant to the current design problem and treat that library as the source of shared interaction language. Until then, prefer coherent task-local decisions over invented cross-component consistency.

Treat the task and current project evidence as more specific than the general heuristics in this skill. Treat working palette values as candidates unless the canonical values identify settled tokens.

## Form a useful direction

Anchor the design in:

- the GM activity and the information or action that must remain easiest;
- the intended scan path and hierarchy of immediate, revealed, and navigated information;
- the spatial and interaction behavior that preserves orientation;
- one visual or interaction idea rooted in Lair's subject, content, or working environment rather than in a fashionable UI category.

Surface this reasoning only when it exposes a decision the developer needs to make or provides useful rationale for comparing designs.

## Resist generic defaults

Recognize the first high-frequency solution, then test whether it fits the actual information and interaction:

- Use structure to express real relationships, priority, or behavior. Do not add cards, pills, labels, dividers, icons, or surfaces merely to make the interface look designed.
- Derive visual character from the GM's environment, the content, and Lair's canonical visual language. Do not import a generic SaaS, fantasy parchment, IDE, or note-app aesthetic wholesale.
- Spend distinctiveness deliberately. Prefer one memorable, justified idea supported by disciplined surrounding details over many decorative gestures.
- Let typography, alignment, spacing, contrast, and geometry establish hierarchy before adding chrome.
- Use motion only when it clarifies transition, continuity, state, or affordance. Do not add a motion quota.
- Remove any visual device that does not improve comprehension, orientation, operation, or atmosphere appropriate to the task.

Do not equate originality with novelty. A familiar pattern is good when its learned behavior fits; a custom treatment is good when it resolves a project-specific problem.

## Adapt judgment to design context

For exploratory design:

- Include a credible baseline unless the task already supplies one.
- Compare meaningfully different information shapes or interaction models, not cosmetic themes.
- Let each alternative test a named question or tradeoff.
- Take a justified design risk when it can reveal a better direction.
- Stress alternatives with representative content, difficult lengths, optional states, and realistic density.

For an established direction:

- Commit to the agreed design instead of manufacturing alternatives.
- Preserve settled decisions while refining hierarchy, rhythm, states, and interaction details.
- Do not turn a focused improvement into an unsolicited redesign.

For critique:

- Judge the result against the task and canonical values, not against generic polish.
- Identify the underlying information or interaction problem before prescribing styling.
- Separate correctness problems, project-value conflicts, and optional taste improvements.

## Design quality check

- Does the interface help the GM find or change the right thing at the right moment?
- Is prominence based on current relevance rather than abstract importance?
- Does density remain readable, scannable, and operable?
- Does revealed detail preserve enough orientation for the main task?
- Does every structural and visual device earn its place?
- Is the result recognizably Lair through product logic and visual language rather than superficial fantasy decoration?
- Does the design answer the task without silently deciding unresolved product questions?

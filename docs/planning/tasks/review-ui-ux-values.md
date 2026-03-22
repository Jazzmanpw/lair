# Review and Reorganize ui-ux-values.md

## Goal

The `docs/ui-ux-values.md` file currently mixes two concerns:

1. **Design system foundations** — palette, typography, spacing philosophy, dark
   mode rationale, layout principles. These are stable, project-wide values that
   should guide all future work.

2. **Component-level specs** — specific component layouts, zone definitions, and
   interaction details for the first prototype pass. These were useful for
   initial iteration prompts but are now partially outdated (the components have
   evolved through 4 iterations) and belong closer to the components themselves.

## What To Do

### 1. Read and audit the current content

Identify which sections are:

- **Still accurate and project-wide** → keep in the doc
- **Still accurate but component-specific** → consider moving to component-level
  docs or removing (the code is the source of truth)
- **Outdated** → remove or update

### 2. Separate concerns

The cleaned-up doc should focus on durable design decisions:

- Color palette and semantic color roles
- Typography choices and hierarchy
- Spacing and density philosophy
- Layout principles (100vh, independent scroll, IDE-like)
- Dark mode rationale and contrast guidelines
- Interaction patterns (hover previews, side panel pinning, etc.)

Component specs that describe specific layouts (e.g., "encounter tab has two
columns with...") should be removed — the Storybook stories and the code itself
are more authoritative at this point.

### 3. Update references

Check if anything in CLAUDE.md or task files references ui-ux-values.md content
that would be affected by the reorganization.

# Running Mode Model Cleanup

Use this as a future task seed for separating historical prototype code from the current Running Mode model direction.

## Why This Matters

Iteration 4 UI components now sit beside older `manual` and legacy models. The name `manual` no longer describes the current runtime model clearly, and future agents may treat historical prototypes as active architecture unless the codebase marks the boundary more explicitly. Historical prototypes were AI-generated, and `manual` types were written by hand to land dev's vision in code. Now, Iteration 4 builds on top of these models, and agents edit them, too, so they're not just `manual` anymore.

## Directions To Compare

- Move obsolete iteration models and UI into archive libraries, so ordinary commands such as `nx storybook ui` focus on the latest active iteration.
- Keep the current library shape, but rename or reorganize `@lair/domain` so historical v2/v3 models are clearly separate from the current root model.
- Add documentation and exports that label historical modules without moving files yet.
- Split Storybook navigation into active and archived prototype groups.
- Preserve older prototypes as design evidence while preventing them from influencing new model decisions accidentally.

## Questions

1. Which UI iterations are still useful as active references?
2. Did v2 and v3 share one model generation, or do they need separate archive labels?
3. Should current Running Mode models move out of `manual` into root domain exports?
4. Should archived prototypes still build and test in normal CI, or only in explicit archive checks?
5. What is the least disruptive reorganization that prevents future-agent confusion?

---
name: verify-storybook-ui
description: Resolve and visually inspect rendered Storybook stories with Codex browser tools. Use for Storybook UI verification, responsive review, interaction-state inspection, screenshots, and browser-based UI iteration.
---

# Verify Storybook UI

Resolve exact story URLs deterministically, choose the least noisy Storybook surface that exposes the needed evidence, and keep browser inspection scoped to relevant stories and states.

## Resolve story URLs

Run the bundled resolver instead of guessing Storybook ports or story IDs:

```powershell
node .agents/skills/verify-storybook-ui/scripts/resolve-story-urls.mjs --story libs/ui/src/running-mode/roster/roster-prototype.stories.tsx --export Exploration --export Groups
```

Repeat `--story PATH` to query another story file. Add one or more `--export NAME` flags after a story path to select exports from that file; omit them to return every story exported by the file. The resolver enumerates active Windows TCP listeners, identifies Storybook servers through `/index.json`, matches source paths and export names, and returns exact manager and canvas URLs. It may require approval because it inspects local listeners and requests localhost.

Use `--base-url http://localhost:PORT` only when the base URL is already known or automatic discovery is unavailable. Do not guess story IDs. If discovery fails, ask for the running Storybook URL; use `@Chrome` only as a last resort when the user has an appropriate Storybook tab open.

## Choose the surface

Use the canvas URL when the story already represents the state under review and the task is visual:

- Inspect static appearance, spacing, typography, overflow, and responsive layout.
- Inspect the settled visual result of a story `play` function.
- Capture clean screenshots without Storybook manager chrome.

Use the manager URL when Storybook tooling is part of the evidence:

- Navigate among stories or modify Controls, args, globals, backgrounds, or viewport settings.
- Inspect the Interactions, Accessibility, Actions, or Visual tests panels.
- Diagnose failed interaction steps or assertions.

When using the manager, click the semantic `Enter full screen` button to hide the sidebar and addons panel temporarily. Exit full screen when panel diagnostics are needed. Prefer the button over keyboard shortcuts.

For interaction-heavy work, use the manager or automated story tests to diagnose behavior, then use the canvas URL to judge the final rendered state.

## Verify with the browser

Follow the installed Browser skill to connect to `@Browser`, then:

1. Open only the resolved stories relevant to the change.
2. Inspect the normal viewport and only the responsive breakpoints material to the task.
3. Exercise requested interactions and inspect their resulting visual states.
4. Read DOM, computed state, console output, or network details only when diagnosing a concrete issue.
5. Iterate after code changes, relying on Storybook hot reload or explicitly reloading when needed.
6. Report the stories, states, interactions, and viewport sizes checked, plus any remaining uncertainty.

Do not survey the whole Storybook, collect unrelated screenshots, or load manager panels without a reason.

# Lair Workspace

Nx workspace for the TTRPG app prototype. The primary app lives in `apps/lair`; planning notes live under `docs/planning/`. The referenced vault lives in `E:\Persisted\НРИ` and Codex access is configured in `.claude/settings.json`.

## Prototype Changeability

This is a solo pet project, not a public API surface. Prefer clear current structure over backward compatibility for internal code, docs, exports, names, and file layout. When older shapes make the project harder to navigate or change, move or rename them directly instead of preserving aliases, wrappers, or compatibility paths by default. Keep historical work only when it remains useful as archive evidence.

## External references

- **TTRPG vault**: `E:\Persisted\НРИ` — source content for scenes, creatures, adventures
- **PF2e statblock callout plugin**: `O:\obsidian\ttrpg-adventure-plugin\.obsidian\plugins\pf2e-statblock-callout\` — custom Obsidian plugin for rendering PF2e statblocks from callouts. Uses Century Gothic font, CSS-based styling. Reference for future statblock component implementation.
- **App philosophy**: `docs/planning/ttrpg-app-philosophy.md` — design principles and what the app is/isn't. Read when discussing design direction, UX decisions, or the app's goals.

## Primary language

Ultimately, all the data in the app will be in Russian. Use Russian in fixtures data.

## Style agreements

- Don't overuse variables. If an expression is self-descriptive, and it's only used in one place, prefer putting it inline (`const relativeToRoot = '../'.repeat(options.libDir.split(/[/\\]/).length);`) instead of creating a variable (`const depth = options.libDir.split(/[/\\]/).length; const relativeToRoot = '../'.repeat(depth);`)
- Don't use `React` as a default import or as a global. always import functions and types from `React`
- Self-documenting code is our goal. Self-documenting code doesn't need short comments explaining what it does. By default, don't add comments. If you think the comment is needed, try to find a way to make the code cleaner without comments. If it seems (low confidence) necessary, ask the user. If it's necessary with high confidence, add it right away.
- Merged declarations (usually a type + a namespace) can be imported as a single unit. There's no need to do things like `import {MyMergedEntity, type MyMergedEntity as MyMergedEntityType} from './my-merged-entity.ts';`. Just `import {MyMergedEntity} from './my-merged-entity.ts';` and use it both as a type and as a value.
- Use React memoization deliberately. It's necessary to keep effects and other memoizations working, or any other places that care about referential equality. We are not going to have heavy enough computations to justify memoization for the sake of performance. So don't use it by default.
- Prefer extracting JSX into named components over local `renderX` helpers.

## Nx guidelines

- Always run tasks through `nx` (`nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Use `nx show project <name> --json` to understand project configuration, not raw `project.json` (which only has partial config)
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- Don't assume Nx configuration details — check `nx.json`, project config, or Nx docs when unsure
- If you don't like generation results, consider rolling back (cautiously if there are changes unrelated to generation) and generating again
- For code verification, run `nx affected --base HEAD -t lint -- --fix` and `nx affected --base HEAD -t typecheck build test | tail -n 20`
- When `nx` says "the workspace is out of sync", running `nx sync` both reports AND applies the sync. No need to run it a second time.
- Before committing, run `nx format` to fix prettier formatting across the workspace

## Running Mode

For work under `docs/planning/running-mode/`, read and follow `docs/planning/running-mode/AGENTS.md` before proceeding.

## Troubleshooting

- If tests fail because Playwright has a wrong version, check the version installed in `O:\omni\omni` (it's the only other project using Playwright) and update the version of the package in this repo to match. Then, run `npx playwright install`, and tests should run

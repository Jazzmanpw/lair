# Lair Workspace

Nx workspace for the TTRPG app prototype. The primary app lives in `apps/lair`; planning notes live under `docs/planning/`. The referenced vault lives in `E:\Persisted\НРИ` and Codex access is configured in `.claude/settings.json`.

## Style agreements

- Don't overuse variables. If an expression is self-descriptive, and it's only used in one place, prefer putting it inline (`const relativeToRoot = '../'.repeat(options.libDir.split(/[/\\]/).length);`) instead of creating a variable (`const depth = options.libDir.split(/[/\\]/).length; const relativeToRoot = '../'.repeat(depth);`)
- Don't use `React` as a default import or as a global. always import functions and types from `React`
- Self-documenting code is our goal. Self-documenting code doesn't need short comments explaining what it does. By default, don't add comments. If you think the comment is needed, try to find a way to make the code cleaner without comments. If it seems (low confidence) necessary, ask the user. If it's necessary with high confidence, add it right away.

## Nx guidelines

- Always run tasks through `nx` (`nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Use `nx show project <name> --json` to understand project configuration, not raw `project.json` (which only has partial config)
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- Don't assume Nx configuration details — check `nx.json`, project config, or Nx docs when unsure
- If you don't like generation results, consider rolling back (cautiously if there are changes unrelated to generation) and generating again
- For code verification, run `nx affected --base HEAD -t eslint:lint -- --fix` and `nx affected --base HEAD -t typecheck build test | tail -n 20`
- When `nx` says "the workspace is out of sync", running `nx sync` both reports AND applies the sync. No need to run it a second time.
- Before committing, run `nx format` to fix prettier formatting across the workspace

### Codex Note

- In Codex sandbox sessions, run Nx with `TMPDIR=/tmp TMP=/tmp TEMP=/tmp NX_DAEMON=false NX_ISOLATE_PLUGINS=false`
- `tools/package.json` points `@lair/tools/plugin` at `tools/src/plugin-shim.cjs`, a tiny CommonJS shim that loads `tools/src/plugin.ts` through `jiti`
- The shim avoids the local-plugin SWC/ESM issues on both local machines and in Codex; the extra temp and isolation env vars are still needed because Nx plugins and `tsx` otherwise try to use sandbox-incompatible temp/process behavior

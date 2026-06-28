@CLAUDE.md

## Harness-specific notes

- In Codex sandbox sessions, run Nx with `TMPDIR=/tmp TMP=/tmp TEMP=/tmp NX_DAEMON=false NX_ISOLATE_PLUGINS=false`
- `tools/package.json` points `@lair/tools/plugin` at `tools/src/plugin-shim.cjs`, a tiny CommonJS shim that loads `tools/src/plugin.ts` through `jiti`
- The shim avoids the local-plugin SWC/ESM issues on both local machines and in Codex; the extra temp and isolation env vars are still needed because Nx plugins and `tsx` otherwise try to use sandbox-incompatible temp/process behavior
- On native Windows, UI browser tests automatically use the installed Chrome channel when `CODEX_SHELL=1`; the Windows sandbox blocks Playwright's downloaded Chromium executable under `%LOCALAPPDATA%\ms-playwright`
- For repo-local skills, ignore `quick_validate.py` when it fails with `ModuleNotFoundError: yaml`; do not install PyYAML only for this validation. Inspect the generated files and run the repository formatter instead—the skills only need to work locally in this repo.
- Keep generated `agents/openai.yaml` only for skills intended to appear in user-facing UI. Agent-invoked repo-local skills need only the required `SKILL.md` frontmatter, so remove generated UI metadata after initialization.

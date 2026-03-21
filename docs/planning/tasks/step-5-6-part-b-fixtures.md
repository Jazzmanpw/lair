# Part B: Fixture Data

## Context

Part A defined UI-facing types in `libs/domain`. This part hand-writes fixture data from
the source vault to feed the Storybook stories in Part C.

The vault lives at `E:\Persisted\НРИ`. The source adventure is at:
`Salty Scars/Приключения/Исследование заброшенной лаборатории/`

## Prerequisites

- Part A completed (types exist in `libs/domain/src/scene.ts` and `creature.ts`)
- `E:\Persisted\НРИ` is in `additionalDirectories` (already configured)

## What To Do

### 1. Read source files

Read these vault files to extract fixture data:

| Source file                 | What to extract                                                                                                                                                                                |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ИЗЛ Вход в лабораторию.md` | Richest scene: flavor text, room description, 3 skill checks, encounter (4 creatures, threat level, dramatic question, conflict sources), trap (door puzzle), treasures, links to other scenes |
| `ИЗЛ Зал с жаровнями.md`    | No creatures, elaborate trap complex, links to multiple scenes                                                                                                                                 |
| `ИЗЛ Морг.md`               | Simpler scene: skill checks, single trap, treasure table                                                                                                                                       |
| `Химера Тяньгу.md`          | Full PF2e creature statblock                                                                                                                                                                   |

### 2. Create `libs/domain/src/fixtures/scenes.ts`

Hand-write 3 `Scene` objects using the types from `@lair/domain/scene`:

- `entranceScene` — from Вход в лабораторию
- `brazierHallScene` — from Зал с жаровнями
- `morgueScene` — from Морг

Keep the original Russian text in string values. Transcribe the structural content into
the typed fields. For fields that are less important for the layout stories (e.g., detailed
skill check outcome text), an abbreviated version is fine — just enough to make the stories
meaningful.

### 3. Create `libs/domain/src/fixtures/creatures.ts`

Hand-write 1 `CreatureStatblock` object:

- `chimeraStatblock` — from Химера Тяньгу

Map the statblock content into the structured blocks: `header`, `perception`, `defense`,
`offense`, `concept`.

### 4. Update `libs/domain/package.json` exports

Add the fixtures export path:

```json
{
  "exports": {
    "./scene": "./src/scene.ts",
    "./creature": "./src/creature.ts",
    "./fixtures/scenes": "./src/fixtures/scenes.ts",
    "./fixtures/creatures": "./src/fixtures/creatures.ts"
  }
}
```

No barrel `index.ts` for fixtures either. Explicit paths only.

### 5. Verify

- `nx typecheck domain` passes
- Fixture objects conform to the types without type errors

## Files To Create/Modify

- `libs/domain/src/fixtures/scenes.ts` — create
- `libs/domain/src/fixtures/creatures.ts` — create
- `libs/domain/package.json` — update `exports` field

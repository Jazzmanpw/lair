# Part A: Domain Types

## Context

First prototype step for the TTRPG app. We need minimal UI-facing types in `libs/domain`
to support Storybook stories that explore layout and spatial structure for a "Running Scene
Workspace".

These types are NOT the full domain model. They are intentionally simple UI-facing display
types — many fields that will later be constrained (e.g., proficiencies as enums, traits
as a fixed set) are kept as plain strings for now. The goal is to explore layout, not to
model PF2e correctly.

Each type file should start with a TODO comment noting this:
`// TODO: These are simplified UI-facing display types for layout prototyping.`
`// The real domain model will replace or wrap them with proper constraints.`

Fields use English names; fixture data (Part B) will contain the actual Russian-language
content.

## What To Do

### 1. Create `libs/domain/src/scene.ts`

Types needed:

```ts
/** Wikilink reference to another entity */
export type LinkRef = {
  id: string; // slug, e.g. "entrance"
  label: string; // display text, e.g. "Вход в лабораторию"
};

export type SceneMeta = {
  id: string;
  title: string;
  location: LinkRef;
  adventure: LinkRef;
  setting: LinkRef;
};

export type SkillCheck = {
  title: string;
  skill: string;
  dc: number;
  difficulty: string; // e.g. "Trained", "Expert"
  outcomes: {
    criticalSuccess?: string;
    success?: string;
    failure?: string;
    criticalFailure?: string;
  };
};

export type EncounterCreatureRef = {
  creature: LinkRef;
  count: number;
};

export type Encounter = {
  threatLevel: string; // e.g. "Moderate 3"
  dramaticQuestion: string;
  conflictSources: string[];
  creatures: EncounterCreatureRef[];
};

export type TrapStatblock = {
  name: string;
  levelOrType: string;
  traits: string[];
  stealth?: string;
  disable?: string;
  trigger?: string;
  effect?: string;
  description?: string; // markdown, not parsed further yet
};

export type TreasureItem = {
  name: string;
  note?: string;
};

export type Scene = {
  meta: SceneMeta;
  flavorText: string;
  roomDescription: string[]; // bullet list items
  skillChecks: SkillCheck[];
  encounter: Encounter | null;
  traps: TrapStatblock[];
  treasures: TreasureItem[];
  linkedSceneIds: string[];
};
```

No `tags` field — the TypeScript type itself is the discriminator.

### 2. Create `libs/domain/src/creature.ts`

Structure the statblock into blocks matching the PF2e reference
(`PF2e/Шпаргалки/Статблок существа.md`):

```ts
import type {LinkRef} from './scene.ts';

export type CreatureHeader = {
  name: string;
  level: number;
  traits: string[]; // e.g. ["Unique", "Large", "Dragon", "Beast"]
};

export type PerceptionBlock = {
  perception: string; // e.g. "+8, darkvision"
  languages: string[];
  skills: string[]; // e.g. ["Acrobatics +7", "Arcana +5"]
  abilityModifiers: {
    str: string;
    dex: string;
    con: string;
    int: string;
    wis: string;
    cha: string;
  };
  items?: string[];
  interactionAbilities?: string[];
};

export type DefenseBlock = {
  ac: string;
  saves: {fort: string; ref: string; will: string};
  hp: string;
  immunities?: string[];
  resistances?: string[];
  weaknesses?: string[];
  automaticAbilities?: string[]; // auras, passive defenses
  reactiveAbilities?: string[]; // reactions, free actions off-turn
};

export type OffenseBlock = {
  speed: string;
  melee?: string[]; // display strings for now
  ranged?: string[];
  spells?: string; // kept as a block for now
  innateSpells?: string;
  focusSpells?: string;
  offensiveAbilities?: string[];
};

export type CreatureConcept = {
  theme: string[];
  role: string;
  feeling: string;
};

export type CreatureStatblock = {
  id: string;
  header: CreatureHeader;
  description: string;
  perception: PerceptionBlock;
  defense: DefenseBlock;
  offense: OffenseBlock;
  concept?: CreatureConcept;
};
```

### 3. Update `libs/domain/package.json` exports

```json
{
  "exports": {
    "./scene": "./src/scene.ts",
    "./creature": "./src/creature.ts"
  }
}
```

No barrel `index.ts`. Consumers import explicitly:
`import type {Scene} from '@lair/domain/scene'`

### 4. Verify

- `nx typecheck domain` passes
- `nx test domain` passes
- No barrel exports, only explicit `exports` in package.json

## Files To Create/Modify

- `libs/domain/src/scene.ts` — create
- `libs/domain/src/creature.ts` — create
- `libs/domain/package.json` — update `exports` field

## Files To Delete

- `libs/domain/src/vite-env.d.ts` — only if it's a skeleton placeholder with no real content

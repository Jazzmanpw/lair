# Running Mode Screen — Data Budget

Documents the concrete data volume each layout zone must handle, derived from
the adventure vault (`Исследование заброшенной лаборатории`, 9 rooms) and
existing v4 domain fixtures.

This is layout-neutral input. It describes content volume only — not layout
strategy, zone placement, or which zones should be combined or separated.

## Scene Header

**Scene title:** 1 line, 15-40 characters (Russian).

**Breadcrumb:** Setting › Location › Adventure. 3 segments, ~60-80 characters
total. Secondary orientation — small text.

**Height:** ~60-70px with padding.

## Room Prompts (Bullet Descriptions)

Bullet list of physical room details the GM reads/paraphrases for players.

**Volume per room:** 4-5 bullets. Each bullet is 1-2 lines at comfortable
reading width (~600px). The longest bullet (Вход room 1) is ~250 characters
(2 lines at 80ch).

**Height at 13-14px font:** 5 bullets × ~20-40px = **100-200px**.

## Flavor Text

Read-aloud blockquote. GM reads it once when players enter the room.

**Volume:** 2-4 sentences, 150-350 characters. Typically ~250 characters.

**Height:** ~60-80px in a blockquote at 13px.

## Room-Start Reminders

"Есть ловушки" type tips. The GM processes these before narrating.

**Volume:** 0-1 per room. 1-2 lines when present.

**Height:** ~24-30px when present. Absent in many rooms.

## Triggers

Running-mode grouping over skill checks, traps, nearby-area cues, and
prepared creature setup cues.

### Skill Checks

**Volume per room:** 1-3 checks. Each has:

- Title/action framing: 1 line (~40-80ch)
- Skill + DC + difficulty: 1 line (~30ch)
- Outcome text: 2-4 outcomes, each 1-2 lines

**Compact form (title + skill + DC only):** ~1 line per check, ~24px each.
Outcome text is detail content, not the compact trigger.

**Compact height:** 3 checks × ~24px = **~72px**.

### Traps

**Volume per room:** 0-1 traps. When present, traps are complex:

- Name + hazard level + traits: 1 line
- Description: 1-3 lines
- Stealth/Disable/Trigger/Effect: 4-6 lines
- Outcome paragraphs: 4-8 lines
- Sub-mechanics (e.g., Непроходимая комната has 4 sub-statblocks): 20-50
  additional lines each

**Compact form (name + hazard level):** 1 trap × ~24px = **~24px**. Full trap
detail is 200-500px of statblock-style content.

### Nearby-Area Cues

Derived from `linkedSceneIds`. Each linked scene can carry a "has creatures /
has traps" indicator.

**Volume:** 2-4 linked scenes per room.

### Prepared Creature Setups

Creature/group setups not yet in session but could enter play.

**Volume:** 0-4 setups per room. Each has a name + type indicator.

**Compact form:** Name + creature/group badge = 1 line each, ~24px.

### All Triggers Combined (Compact)

~120-160px if all categories present.

## Session Participants

### Creature Participants

**Volume per session:** 2-8 creature instances. The densest encounter
(Питомник) has 6 (2 dogs + 4 rats from 2 setup types).

**Per-instance data:**

- Name: 15-35 characters
- HP: current/max, ~7 characters
- Conditions: 0-3 condition badges, each ~8-15ch
- Reaction available: icon/badge
- Group membership: 0-1 group name
- A/M hint: 1-2 word relevance marker (optional)

**Row height:** ~32-40px for a compact single-line row. ~48-56px if conditions
are on a second line.

**Total height:** 6 creatures × ~40px = **~240px**. 8 creatures × ~40px =
**~320px**.

### Group Participants

**Volume:** 0-2 groups. Each is a single row with name + group motivation.

**Row height:** ~32-40px.

### Participant Grouping Headers

When encounter is active, participants split into: In conflict /
Non-conflicting / Out of game. Each group has a small header.

**Volume:** 2-3 group headers × ~24px = **~48-72px**.

### Participant Zone Total

Typical (4-6 creatures + 1 group + 2 headers): **~280-340px**.
Worst case (8 creatures + 2 groups + 3 headers): **~440px**.

## Encounter Context

Present only when an encounter is active.

### Dramatic Question

1 sentence, 40-80 characters. Always 1 line. **~28-32px** with emphasis
styling.

### Conflict Sources

2-3 per encounter. Each has:

- Opposition text: 1 sentence, 40-100 characters
- Status: active/resolved badge
- Linked reasons: 0-2 aspect/motivation references

3 sources × ~28px = **~84px**.

### Encounter Threat Level

1 badge. "Жестокая угроза 3" / "Средняя угроза 3". **~24px** or inline.

### Encounter Context Total

**~140-160px**.

## A/M Surface

Behavior-critical but too dense for inline. Accessed via one interaction.

### Per Participant

- Aspects: 1-2, each 30-70 characters
- Role: 1 phrase, 20-50 characters
- Feeling: 1 word, 5-15 characters
- Abilities: 2-4, each 20-60 characters
- Motivations: 0-2 runtime, each 20-50 characters

**Per-participant height:** ~120-160px with all fields.

### Total A/M Surface

6 participants × ~140px = **~840px**. Can group by setup type (2 types ×
~200px + individual motivations per instance).

## Tactical State (Initiative Active)

### Flow

- Turn order: list of ~6-8 names in sequence
- Active participant: highlighted
- Round number: 1 counter

**Height:** ~40px horizontal, ~200-300px vertical.

### Roster

Same data as participant rows, re-sorted by initiative order. Same height
budget as Session Participants above.

### Actor (Active Participant Decision Surface)

The richest single-participant view:

- A/Ms: 2-3 aspects + 1-2 motivations = ~5-7 lines
- Actions/abilities: 2-4 summaries, each 1-2 lines = ~4-8 lines
- Attacks: 1-3 entries with to-hit and damage = ~3-6 lines
- Spells (if any): 2-6 spell names with actions = ~2-6 lines
- Speed: 1 line

**Total:** ~15-25 lines, **~400-600px** rendered. Largest single zone when
tactics are active.

### Targets

- AC + saves: 1 line
- Relevant conditions: 0-3 badges
- Response hints: 0-2 lines

**Height:** ~60-100px.

### Interrupts

- Passive abilities: 0-2 entries across all participants
- Available reactions: 0-4 entries
- Triggered reminders: 0-1

**Height:** ~80-160px.

## Reference (Statblock)

Full creature statblock. A moderate creature (Химера Тяньгу) renders at
~700px tall in ~300px width.

## Linked Scenes

2-4 linked scene cards per room. Each card: title + breadcrumb + creature/trap
counts.

**Per-card height:** ~60-70px.

**Total:** 4 cards × ~65px = **~260px**.

## Map / Atmosphere Image

1 image per scene. Variable size; needs at least ~150-200px to be useful.

## Vault Note Section → Running Mode Zone Mapping

| Vault note section    | Running mode zone                | Access tier               |
| --------------------- | -------------------------------- | ------------------------- |
| `# Title`             | Scene header                     | Immediate                 |
| `> Flavor blockquote` | Flavor text                      | Immediate                 |
| `- Bullet list`       | Room prompts                     | Immediate                 |
| `> [!tip]` callouts   | Room-start reminders             | Immediate                 |
| `> [!skill-check]`    | Triggers (compact + detail)      | Immediate / Low-overhead  |
| `# Существа`          | Encounter context + Participants | Immediate                 |
| `> Dramatic question` | Dramatic question                | Immediate                 |
| `> Conflict sources`  | Conflict sources                 | Immediate                 |
| `- Creature list`     | Prepared setups / Participants   | Immediate                 |
| `# Ловушки`           | Triggers (compact + detail)      | Immediate / Low-overhead  |
| `> [!statblock]`      | Reference (statblock)            | Low-overhead / Eventually |
| `# Сокровища`         | Not on running surface           | Eventually                |
| `linkedSceneIds`      | Linked scenes                    | Immediate                 |

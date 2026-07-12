# Reminder And Inquiry Candidate Inventory

This inventory records the pre-prototype routing decisions produced by the [candidate-inventory task](./tasks/shared-surface-candidate-inventory.md). It is evidence and routing guidance, not a final taxonomy, execution index, or surface specification. Candidate prototypes and promoted design memory may supersede its provisional shape conclusions.

## Evaluation Model

- A **reminder** protects a prepared consequence that should occur when its condition is met but may be missed if the GM forgets it.
- An **inquiry reference** offers intentionally authored roll-guarded discovery material that the GM can consult when the players seek information. Its [content role](../building-mode/content-authoring-guidance-draft.md#inquiry-references) is narrower than all possible checks.

These roles can all respond to events at the table. Their distinction is what omission costs: a forgotten reminder skips a consequence, while an unavailable inquiry reference increases lookup or improvisation work.

## Current Candidates

| Candidate                         | User moment                                                                                                                      | Likely T1                                                                | T2                                                                                                   | Current disposition                                                                                                       |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Inquiry reference                 | Players seek information for which the GM prepared scene-specific discovery material                                             | Inquiry identity, with action + target as the first prototype hypothesis | Skill, DC parts, adjustments, disclosed facts, and explicit deeper references                        | Prototype first. Compare later as lower-weight content inside the reminder surface and as a separate neighboring surface. |
| Pending environmental trigger     | A discrete fictional condition occurs and should produce a consequence                                                           | Condition + compact consequence or identity                              | Full hazard, trap, or environmental resolution, including discovery and disable paths where relevant | Strong reminder candidate. Hazards and custom traps are representative samples, not the whole family.                     |
| Persistent environmental effect   | Position, proximity, or another continuing condition makes an effect apply repeatedly                                            | Area or condition + effect identity and essential cadence                | Exact effect, saves, immunity cadence, source, and other resolution detail                           | Prototype with pending triggers; test whether persistent effects need a distinct treatment or surface.                    |
| Toggleable environmental effect   | A persistent or recurring effect can be turned on and off during play                                                            | Source + current active/inactive state + compact effect identity         | Activation/deactivation procedure, current state, exact effect, and runtime note                     | Prototype as a separate environmental candidate from one-shot stateful activations.                                       |
| Stateful environmental activation | An activation changes the environment and may create a lasting or recurring result                                               | Activation condition before firing; active result afterward              | Procedure, rolled result, duration, recurring resolution, and free-form runtime annotation           | Strong reminder candidate with a distinct unresolved runtime-note problem.                                                |
| Creature interrupt                | A creature can use a reaction or triggered free action outside its turn                                                          | Trigger + source + action-type mark + compact consequence                | Full trigger, requirements, effect, targets, and availability context                                | Strong reminder candidate. Start with formal reactions and triggered free actions.                                        |
| Custom reminder note              | A prep-authored or runtime-authored note should stay visible because the GM wants to remember it at a specific moment or context | Authored reminder line, optionally with context or timing                | Full note, source context, recovery state, and explicit references                                   | Prototype view-only fixtures now. Domain handling and creation flow belong to later authoring/runtime-note work.          |

Any candidate may carry explicit references to other prep notes or system material. Link-following and contextual retrieval belong to the separate [reference-retrieval question](./open-questions.md#how-should-contextual-reference-retrieval-follow-links).

## Representative Evidence

- **Inquiry references:** `Вспомнить информацию о костях`, `Идентифицировать магию на двери и в рунах`, and the two restroom rune checks.
- **Pending environmental triggers:** `Клетки у двери`, `Неустойчивая куча инструментов`, and `Непроходимая комната`.
- **Persistent environmental effects:** the three-headed dog's `Ужасающее присутствие`.
- **Toggleable environmental effects:** the owlbear can start and stop thrashing as a free action, unlike always-on auras.
- **Stateful environmental activations:** `Ароматические световые жаровни`, whose activation produces a rolled aroma result that may remain relevant.
- **Creature interrupts:** the petrified dog's `Клин оружия` and other formal reactions or triggered free actions found during later fixture work.
- **Custom reminder notes:** scene-entry reminders and view-only free-form reminder fixtures.

The Salty Scars room index is at [Salty Scars Lab Room Map](../../salty-scars-lab-room-map.md). Vault examples are prototype inputs rather than canonical product taxonomy.

## Recommended Prototype Sequence

1. [Inquiry reference item internals](./tasks/inquiry-reference-item-internals.md), establishing the first compact action-and-target and resolution-detail grammar.
2. [Environmental reminder item internals](./tasks/environmental-reminder-item-internals.md), comparing pending triggers, persistent effects, toggleable effects, and stateful environmental activations.
3. [Creature interrupt item internals](./tasks/creature-interrupt-item-internals.md), testing formal reactions and triggered free actions against the environmental grammar.
4. [Custom reminder note item internals](./tasks/custom-reminder-note-item-internals.md), testing view-only free-form reminder fixtures without designing creation flow.
5. [Reminder and inquiry surface composition](./tasks/reminder-inquiry-surface-composition.md), comparing reminders alone, lower-weight inquiry references in the same surface, and separate neighboring surfaces.

The [prototype index](./tasks/reminder-inquiry-item-prototypes.md) owns the live execution order. The [shared prototype guidance](./reminder-inquiry-shared-guidance.md) owns common task constraints.

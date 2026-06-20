# Domain Naming

Name domain entities for what they are in the app's model of mastering a TTRPG. The framework describes the GM's practice rather than only the fictional world or one rules engine, so terms such as `Participant`, `Encounter`, and `ConflictSource` carry deliberately narrow meanings.

- Treat established domain terms as reserved vocabulary. Do not reuse them for adjacent concepts that only happen to have a similar shape or UI role.
- Prefer specific qualified terms over broad ordinary words. Atomic domain concepts should usually fit in one or two words, with a third when honesty requires it.
- Do not let a name claim more than the model knows. Structural names such as `InitiativeEntry` are preferable to stronger but inaccurate names such as `Combatant`.
- Preserve conceptual distinctions when shapes happen to match. Similar shapes are a reason to investigate shared meaning, not proof that a shared abstraction exists.
- General containers are useful when their relationship is named. Avoid vague collections such as `entries` when the containing concept does not make the relationship clear.
- Keep representation terms such as `Record`, `RowData`, or `Modal` inside implementation layers unless representation is genuinely part of the concept.

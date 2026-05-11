# Encounter Initiation A11y Naming Draft

This draft captures the intended accessible naming model for encounter
initiation forms. The current encounter initiation component is a POC: it
validates the encounter draft data flow and several form interactions, but it is
not the final UI structure.

Avoid adding broad accessibility naming complexity to the current POC unless it
is needed for validation. Preserve the naming direction here so a later UI pass
can implement it with the final interaction model.

## Participant rows

Participant row labels should use setup identity as the stable structural
anchor.

Examples:

- `Participant: Petrified dog`
- `Participant: Petrified dog 1`
- `Participant: Petrified dog 2, Ash-Ear`

The setup name explains where the runtime participant came from. The editable
participant name explains who this instance is during play. When both are useful,
the row label can include both the setup occurrence and the runtime name.

Child controls inside the participant row should keep simple scoped labels:

- `Name`
- `Variation`
- `Groups`
- `Motivation 1`

Tests should prefer scoping queries through the participant row or group instead
of making every child control globally unique.

## Duplicate generated names

When multiple creature participants are created from the same setup, the UI may
seed generated names with occurrence numbers.

Example:

- first `Petrified dog`
- after adding another:
  - `Petrified dog 1`
  - `Petrified dog 2`

This should only affect names that still look generated from the setup name.
Hand-authored names should not be rewritten.

## Conflict source rows

Conflict sources are short-lived and text-defined. Their closest identity is the
opposition text.

Examples:

- `Conflict source: Protect the ruined kennel`
- `Conflict source 2`

Use a numeric fallback while the opposition is empty.

Child controls inside the conflict source row should keep simple scoped labels:

- `Opposition`
- `Link reason`

## Testing direction

Prefer accessible, scoped queries:

```ts
within(
  screen.getByRole('group', {name: /participant: petrified dog 2/i}),
).getByRole('textbox', {name: /name/i});

within(
  screen.getByRole('group', {
    name: /conflict source: protect the ruined kennel/i,
  }),
).getByRole('textbox', {name: /opposition/i});
```

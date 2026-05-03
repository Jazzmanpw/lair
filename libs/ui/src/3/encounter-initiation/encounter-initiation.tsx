import {useForm} from '@tanstack/react-form';
import {useStore} from '@tanstack/react-store';
import {useMemo, useState} from 'react';
import type {CreatureStatblock} from '@lair/domain/manual/pf2e';
import type {ParticipantSetup} from '@lair/domain/manual/prep';
import type {Participant} from '@lair/domain/manual/running';
import {
  createDefaultValues,
  deriveInitialCreatureState,
  type EncounterDraftInput,
  EncounterDraftSchema,
  type ResolvedEncounterDraft,
} from './helpers.ts';

export type EncounterInitiationProps = {
  availableSetups: ParticipantSetup<'creature'>[];
  statblocks: Record<string, CreatureStatblock>;
  sessionParticipants: Participant<'creature'>[];
  onSubmit: (result: ResolvedEncounterDraft) => void;
  onCancel: () => void;
};

const generateId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `id-${Math.random().toString(36).slice(2)}`;

type ReasonOption = {
  type: 'aspect' | 'motivation';
  id: string;
  value: string;
};

type ReasonGroup = {
  label: string;
  options: ReasonOption[];
};

function computeReasonPool(
  participants: EncounterDraftInput['participants'],
  setupsById: Record<string, ParticipantSetup<'creature'>>,
): {groups: ReasonGroup[]; byId: Map<string, ReasonOption>} {
  const groups: ReasonGroup[] = [];
  const seen = new Set<string>();

  const setupIdsInOrder: string[] = [];
  for (const p of participants) {
    if (!setupIdsInOrder.includes(p.setupId)) setupIdsInOrder.push(p.setupId);
  }

  for (const setupId of setupIdsInOrder) {
    const setup = setupsById[setupId];
    const options: ReasonOption[] = [];
    for (const aspect of setup.concept.theme.aspects) {
      if (seen.has(aspect.id)) continue;
      seen.add(aspect.id);
      options.push({type: 'aspect', id: aspect.id, value: aspect.value});
    }
    if (options.length > 0) groups.push({label: setup.name, options});
  }

  for (const p of participants) {
    if (!p.variationId) continue;
    const setup = setupsById[p.setupId];
    const variation = setup.meta.variations.find((v) => v.id === p.variationId);
    if (!variation || seen.has(variation.aspect.id)) continue;
    seen.add(variation.aspect.id);
    groups.push({
      label: variation.name,
      options: [
        {
          type: 'aspect',
          id: variation.aspect.id,
          value: variation.aspect.value,
        },
      ],
    });
  }

  for (const p of participants) {
    const options: ReasonOption[] = [];
    for (const m of p.motivations) {
      if (!m.value || seen.has(m.id)) continue;
      seen.add(m.id);
      options.push({type: 'motivation', id: m.id, value: m.value});
    }
    if (options.length > 0) groups.push({label: p.name, options});
  }

  const byId = new Map<string, ReasonOption>();
  for (const g of groups) for (const o of g.options) byId.set(o.id, o);
  return {groups, byId};
}

export default function EncounterInitiation({
  availableSetups,
  statblocks,
  sessionParticipants,
  onSubmit,
  onCancel,
}: EncounterInitiationProps) {
  const setupsById = useMemo(
    () => Object.fromEntries(availableSetups.map((setup) => [setup.id, setup])),
    [availableSetups],
  );

  const form = useForm({
    defaultValues: createDefaultValues(),
    validators: {onSubmit: EncounterDraftSchema},
    onSubmit: ({value}) => {
      onSubmit(EncounterDraftSchema.parse(value));
    },
  });

  const [selectedSetupId, setSelectedSetupId] = useState(
    availableSetups[0]?.id ?? '',
  );
  const [selectedSessionParticipantId, setSelectedSessionParticipantId] =
    useState(sessionParticipants[0]?.id ?? '');

  const formParticipants = useStore(
    form.store,
    (state) => state.values.participants,
  );

  const {groups: reasonGroups, byId: reasonById} = useMemo(
    () => computeReasonPool(formParticipants, setupsById),
    [formParticipants, setupsById],
  );

  const usedSessionIds = useMemo(
    () => new Set(formParticipants.map((p) => p.id)),
    [formParticipants],
  );
  const availableSessionParticipants = useMemo(
    () => sessionParticipants.filter((p) => !usedSessionIds.has(p.id)),
    [sessionParticipants, usedSessionIds],
  );

  function removeReasonFromAllSources(reasonId: string) {
    const sources = form.getFieldValue('conflictSources');
    for (let i = 0; i < sources.length; i++) {
      const reasons = sources[i].reasons;
      if (reasons.some((r) => r.id === reasonId)) {
        form.setFieldValue(
          `conflictSources[${i}].reasons`,
          reasons.filter((r) => r.id !== reasonId),
        );
      }
    }
  }

  function cleanupReasonsForParticipantRemoval(index: number) {
    const p = form.getFieldValue('participants')[index];
    for (const m of p.motivations) removeReasonFromAllSources(m.id);
    if (p.variationId) {
      const s = setupsById[p.setupId];
      const v = s?.meta.variations.find((v) => v.id === p.variationId);
      if (v) removeReasonFromAllSources(v.aspect.id);
    }
    const all = form.getFieldValue('participants');
    if (!all.some((op, i) => i !== index && op.setupId === p.setupId)) {
      const s = setupsById[p.setupId];
      if (s)
        for (const a of s.concept.theme.aspects)
          removeReasonFromAllSources(a.id);
    }
  }

  return (
    <form
      className="flex flex-col gap-4 p-6 bg-(--lair-bg) text-(--lair-text) font-(--lair-font)"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <div className="grid grid-cols-2 gap-6 items-start">
        <fieldset className="flex flex-col gap-2 border border-(--lair-border) p-3">
          <legend className="text-sm font-bold px-1">Participants</legend>

          <div className="flex items-end gap-2">
            <label
              htmlFor="participant-setup-picker"
              className="flex flex-col gap-1 flex-1"
            >
              <span className="text-sm">From setup library</span>
              <select
                id="participant-setup-picker"
                className="border border-(--lair-border) bg-transparent px-2 py-1 text-sm"
                value={selectedSetupId}
                onChange={(event) => setSelectedSetupId(event.target.value)}
              >
                {availableSetups.map((setup) => (
                  <option key={setup.id} value={setup.id}>
                    {setup.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              className="border border-(--lair-border) px-3 py-1 text-sm"
              onClick={() => {
                const setup = setupsById[selectedSetupId];
                if (!setup) return;
                form.pushFieldValue('participants', {
                  id: generateId(),
                  setupId: setup.id,
                  name: setup.name,
                  variationId: setup.meta.variations.length ? '' : undefined,
                  motivations: [],
                  state: deriveInitialCreatureState(
                    statblocks[setup.meta.statblockId],
                  ),
                });
              }}
            >
              Add from setup
            </button>
          </div>

          {sessionParticipants.length > 0 && (
            <div className="flex items-end gap-2">
              <label
                htmlFor="participant-session-picker"
                className="flex flex-col gap-1 flex-1"
              >
                <span className="text-sm">From session</span>
                <select
                  id="participant-session-picker"
                  className="border border-(--lair-border) bg-transparent px-2 py-1 text-sm"
                  disabled={availableSessionParticipants.length === 0}
                  value={
                    availableSessionParticipants.length > 0
                      ? selectedSessionParticipantId
                      : ''
                  }
                  onChange={(event) =>
                    setSelectedSessionParticipantId(event.target.value)
                  }
                >
                  {availableSessionParticipants.length === 0 ? (
                    <option value="">All session participants added</option>
                  ) : (
                    availableSessionParticipants.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))
                  )}
                </select>
              </label>
              <button
                type="button"
                className="border border-(--lair-border) px-3 py-1 text-sm"
                disabled={availableSessionParticipants.length === 0}
                onClick={() => {
                  const participant = sessionParticipants.find(
                    (p) => p.id === selectedSessionParticipantId,
                  );
                  if (!participant) return;
                  const setup = setupsById[participant.setupId];
                  form.pushFieldValue('participants', {
                    id: participant.id,
                    setupId: participant.setupId,
                    name: participant.name,
                    variationId: setup?.meta.variations.length ? '' : undefined,
                    motivations: participant.motivations.map((m) => ({...m})),
                    state: participant.state,
                  });
                  const remaining = availableSessionParticipants.filter(
                    (p) => p.id !== participant.id,
                  );
                  if (remaining.length > 0) {
                    setSelectedSessionParticipantId(remaining[0].id);
                  }
                }}
              >
                Add from session
              </button>
            </div>
          )}

          <form.Field name="participants" mode="array">
            {(participantsField) => (
              <ul className="flex flex-col gap-3">
                {participantsField.state.value.map((participant, index) => {
                  const setup = setupsById[participant.setupId];
                  return (
                    <li
                      key={participant.id}
                      className="flex flex-col gap-2 border border-(--lair-border) p-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <form.Field name={`participants[${index}].name`}>
                          {(nameField) => (
                            <input
                              type="text"
                              aria-label="Participant name"
                              className="text-sm font-bold bg-transparent border border-transparent hover:border-(--lair-border) focus:border-(--lair-border) px-1 py-0.5 outline-none"
                              value={nameField.state.value}
                              onChange={(event) =>
                                nameField.handleChange(event.target.value)
                              }
                            />
                          )}
                        </form.Field>
                        <button
                          type="button"
                          className="text-xs border border-(--lair-border) px-2 py-0.5"
                          onClick={() => {
                            cleanupReasonsForParticipantRemoval(index);
                            void form.removeFieldValue('participants', index);
                          }}
                        >
                          Remove participant
                        </button>
                      </div>

                      {setup &&
                        setup.meta.variations.length > 0 &&
                        participant.variationId !== undefined && (
                          <form.Field
                            name={`participants[${index}].variationId`}
                          >
                            {(variationField) => (
                              <label className="flex flex-col gap-1">
                                <span className="text-xs">Variation</span>
                                <select
                                  aria-label="Variation"
                                  className="border border-(--lair-border) bg-transparent px-2 py-1 text-sm"
                                  value={variationField.state.value ?? ''}
                                  onChange={(event) => {
                                    const oldId = variationField.state.value;
                                    if (oldId) {
                                      const oldVar = setup.meta.variations.find(
                                        (v) => v.id === oldId,
                                      );
                                      if (oldVar)
                                        removeReasonFromAllSources(
                                          oldVar.aspect.id,
                                        );
                                    }
                                    variationField.handleChange(
                                      event.target.value,
                                    );
                                  }}
                                >
                                  <option value="">None</option>
                                  {setup.meta.variations.map((v) => (
                                    <option key={v.id} value={v.id}>
                                      {v.name}
                                    </option>
                                  ))}
                                </select>
                              </label>
                            )}
                          </form.Field>
                        )}

                      <form.Field
                        name={`participants[${index}].motivations`}
                        mode="array"
                      >
                        {(motivationsField) => (
                          <div className="flex flex-col gap-2">
                            <ul className="flex flex-col gap-1">
                              {motivationsField.state.value.map(
                                (motivation, mIndex) => (
                                  <li
                                    key={motivation.id}
                                    className="flex items-center gap-2"
                                  >
                                    <form.Field
                                      name={`participants[${index}].motivations[${mIndex}].value`}
                                    >
                                      {(valueField) => (
                                        <label className="flex flex-col gap-1 flex-1">
                                          <span className="text-xs">
                                            Motivation
                                          </span>
                                          <input
                                            type="text"
                                            className="border border-(--lair-border) bg-transparent px-2 py-1 text-sm"
                                            value={valueField.state.value}
                                            onChange={(event) =>
                                              valueField.handleChange(
                                                event.target.value,
                                              )
                                            }
                                          />
                                        </label>
                                      )}
                                    </form.Field>
                                    <button
                                      type="button"
                                      className="text-xs border border-(--lair-border) px-2 py-0.5"
                                      onClick={() => {
                                        removeReasonFromAllSources(
                                          motivation.id,
                                        );
                                        void form.removeFieldValue(
                                          `participants[${index}].motivations`,
                                          mIndex,
                                        );
                                      }}
                                    >
                                      Remove motivation
                                    </button>
                                  </li>
                                ),
                              )}
                            </ul>
                            <button
                              type="button"
                              className="self-start text-xs border border-(--lair-border) px-2 py-0.5"
                              onClick={() =>
                                form.pushFieldValue(
                                  `participants[${index}].motivations`,
                                  {id: generateId(), value: ''},
                                )
                              }
                            >
                              Add motivation
                            </button>
                          </div>
                        )}
                      </form.Field>
                    </li>
                  );
                })}
              </ul>
            )}
          </form.Field>
        </fieldset>

        <div className="flex flex-col gap-4">
          <form.Field name="dramaticQuestion">
            {(field) => (
              <label className="flex flex-col gap-1">
                <span className="text-sm font-bold">Dramatic question</span>
                <input
                  type="text"
                  className="border border-(--lair-border) bg-transparent px-2 py-1 text-sm"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                />
              </label>
            )}
          </form.Field>

          <fieldset className="flex flex-col gap-2 border border-(--lair-border) p-3">
            <legend className="text-sm font-bold px-1">Conflict sources</legend>
            <form.Field name="conflictSources" mode="array">
              {(field) => (
                <>
                  <ul className="flex flex-col gap-3">
                    {field.state.value.map((_source, index) => {
                      const linkedReasons = _source.reasons;
                      const linkedIds = new Set(linkedReasons.map((r) => r.id));
                      const filteredGroups = reasonGroups
                        .map((g) => ({
                          ...g,
                          options: g.options.filter(
                            (o) => !linkedIds.has(o.id),
                          ),
                        }))
                        .filter((g) => g.options.length > 0);

                      return (
                        <li
                          key={index}
                          className="flex flex-col gap-2 border border-(--lair-border) p-2"
                        >
                          <div className="flex items-center gap-2">
                            <form.Field
                              name={`conflictSources[${index}].opposition`}
                            >
                              {(oppositionField) => (
                                <label className="flex flex-col gap-1 flex-1">
                                  <span className="text-xs">Opposition</span>
                                  <input
                                    type="text"
                                    className="border border-(--lair-border) bg-transparent px-2 py-1 text-sm"
                                    value={oppositionField.state.value}
                                    onChange={(event) =>
                                      oppositionField.handleChange(
                                        event.target.value,
                                      )
                                    }
                                  />
                                </label>
                              )}
                            </form.Field>
                            <button
                              type="button"
                              className="text-xs border border-(--lair-border) px-2 py-0.5"
                              onClick={() =>
                                void form.removeFieldValue(
                                  'conflictSources',
                                  index,
                                )
                              }
                            >
                              Remove conflict source
                            </button>
                          </div>

                          <form.Field
                            name={`conflictSources[${index}].reasons`}
                            mode="array"
                          >
                            {(reasonField) =>
                              reasonField.state.value.length > 0 && (
                                <ul className="flex flex-col gap-1">
                                  {reasonField.state.value.map(
                                    (reason, reasonIndex) => {
                                      const option = reasonById.get(reason.id);
                                      return (
                                        <li
                                          key={reason.id}
                                          className="flex items-center gap-2 text-xs"
                                        >
                                          <span className="flex-1">
                                            {option?.value ??
                                              `${reason.type}:${reason.id}`}
                                          </span>
                                          <button
                                            type="button"
                                            className="border border-(--lair-border) px-1 py-0.5"
                                            onClick={() => {
                                              void form.removeFieldValue(
                                                `conflictSources[${index}].reasons`,
                                                reasonIndex,
                                              );
                                            }}
                                          >
                                            Unlink
                                          </button>
                                        </li>
                                      );
                                    },
                                  )}
                                </ul>
                              )
                            }
                          </form.Field>

                          {filteredGroups.length > 0 && (
                            <LinkReasonControl
                              groups={filteredGroups}
                              onLink={(reason) => {
                                form.pushFieldValue(
                                  `conflictSources[${index}].reasons`,
                                  {type: reason.type, id: reason.id},
                                );
                              }}
                            />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  <button
                    type="button"
                    className="self-start text-xs border border-(--lair-border) px-2 py-0.5"
                    onClick={() =>
                      form.pushFieldValue('conflictSources', {
                        opposition: '',
                        reasons: [],
                      })
                    }
                  >
                    Add conflict source
                  </button>
                </>
              )}
            </form.Field>
          </fieldset>

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              className="border border-(--lair-border) px-3 py-1 text-sm"
              onClick={onCancel}
            >
              Cancel
            </button>
            <form.Subscribe selector={(state) => state.canSubmit}>
              {(canSubmit) => (
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="border border-(--lair-border) px-3 py-1 text-sm disabled:opacity-50"
                >
                  Confirm
                </button>
              )}
            </form.Subscribe>
          </div>
        </div>
      </div>
    </form>
  );
}

function LinkReasonControl({
  groups,
  onLink,
}: {
  groups: ReasonGroup[];
  onLink: (reason: ReasonOption) => void;
}) {
  const allOptions = groups.flatMap((g) => g.options);
  const [selected, setSelected] = useState(allOptions[0]?.id ?? '');

  const effectiveSelected = allOptions.find((r) => r.id === selected)
    ? selected
    : (allOptions[0]?.id ?? '');

  return (
    <div className="flex items-end gap-2">
      <label className="flex flex-col gap-1 flex-1">
        <span className="text-xs">Link reason</span>
        <select
          aria-label="Link reason"
          className="border border-(--lair-border) bg-transparent px-2 py-1 text-xs"
          value={effectiveSelected}
          onChange={(event) => setSelected(event.target.value)}
        >
          {groups.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.value}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>
      <button
        type="button"
        className="text-xs border border-(--lair-border) px-2 py-0.5"
        onClick={() => {
          const reason = allOptions.find((r) => r.id === effectiveSelected);
          if (reason) onLink(reason);
        }}
      >
        Link
      </button>
    </div>
  );
}

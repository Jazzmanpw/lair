import {useStore} from '@tanstack/react-store';
import {useMemo, useState} from 'react';
import type {CreatureStatblock} from '@lair/domain/manual/pf2e';
import type {ParticipantSetup} from '@lair/domain/manual/prep';
import type {Participant} from '@lair/domain/manual/running';
import {
  createEncounterFormOptions,
  withEncounterForm,
} from './encounter-form.ts';
import {deriveInitialCreatureState} from './helpers.ts';

type ParticipantsSectionProps = {
  availableSetups: ParticipantSetup<'creature'>[];
  statblocks: Record<string, CreatureStatblock>;
  sessionParticipants: Participant<'creature'>[];
  setupsById: Record<string, ParticipantSetup<'creature'>>;
};

const generateId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `id-${Math.random().toString(36).slice(2)}`;

export const ParticipantsSection = withEncounterForm({
  ...createEncounterFormOptions(),
  props: {
    availableSetups: [],
    statblocks: {},
    sessionParticipants: [],
    setupsById: {},
  } as ParticipantsSectionProps,
  render: function Render({
    form,
    availableSetups,
    statblocks,
    sessionParticipants,
    setupsById,
  }) {
    const [selectedSetupId, setSelectedSetupId] = useState(
      availableSetups[0]?.id ?? '',
    );
    const [selectedSessionParticipantId, setSelectedSessionParticipantId] =
      useState(sessionParticipants[0]?.id ?? '');

    const formParticipants = useStore(
      form.store,
      (state) => state.values.participants,
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
                  motivations: participant.motivations,
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
                        <form.Field name={`participants[${index}].variationId`}>
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
                                      removeReasonFromAllSources(motivation.id);
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
    );
  },
});

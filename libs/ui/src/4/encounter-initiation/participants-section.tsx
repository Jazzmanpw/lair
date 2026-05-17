import {useStore} from '@tanstack/react-store';
import {useMemo, useState} from 'react';
import type {CreatureStatblock} from '@lair/domain/manual/pf2e';
import type {ParticipantSetup} from '@lair/domain/manual/prep';
import type {Participant} from '@lair/domain/manual/running';
import {
  createCreatureParticipantFormEntry,
  createEncounterFormOptions,
  createGroupParticipantFormEntry,
  ensureGroupParticipant,
  withEncounterForm,
} from './encounter-form.ts';

type ParticipantsSectionProps = {
  availableSetups: ParticipantSetup[];
  statblocks: Record<string, CreatureStatblock>;
  sessionParticipants: Participant[];
  setupsById: Record<string, ParticipantSetup>;
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
    const groupSetups = useMemo(
      () =>
        availableSetups.filter(
          (setup): setup is ParticipantSetup<'group'> => setup.type === 'group',
        ),
      [availableSetups],
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

    function removeReasonsForGroup(groupId: string) {
      const group = form
        .getFieldValue('participants')
        .find(
          (participant) =>
            participant.type === 'group' && participant.id === groupId,
        );
      if (!group || group.type !== 'group') return;
      const setup = setupsById[group.setupId];
      if (setup?.type === 'group') {
        for (const aspect of setup.concept.theme.aspects)
          removeReasonFromAllSources(aspect.id);
      }
      for (const motivation of group.motivations)
        removeReasonFromAllSources(motivation.id);
    }

    function cleanupReasonsForGroupUnlink(
      groupId: string,
      participantIndex: number,
    ) {
      const participants = form.getFieldValue('participants');
      if (
        participants.some(
          (participant, index) =>
            index !== participantIndex &&
            participant.type === 'creature' &&
            participant.groupIds.includes(groupId),
        )
      )
        return;
      removeReasonsForGroup(groupId);
    }

    function isGroupLinked(groupId: string) {
      return form
        .getFieldValue('participants')
        .some(
          (participant) =>
            participant.type === 'creature' &&
            participant.groupIds.includes(groupId),
        );
    }

    function cleanupReasonsForParticipantRemoval(index: number) {
      const participant = form.getFieldValue('participants')[index];
      for (const motivation of participant.motivations)
        removeReasonFromAllSources(motivation.id);

      if (participant.type === 'group') {
        removeReasonsForGroup(participant.id);
        return;
      }

      if (participant.variationId) {
        const setup = setupsById[participant.setupId];
        const variation =
          setup?.type === 'creature'
            ? setup.meta.variations.find(
                (v) => v.id === participant.variationId,
              )
            : undefined;
        if (variation) removeReasonFromAllSources(variation.aspect.id);
      }

      const all = form.getFieldValue('participants');
      if (
        !all.some(
          (other, otherIndex) =>
            otherIndex !== index &&
            other.type === 'creature' &&
            other.setupId === participant.setupId,
        )
      ) {
        const setup = setupsById[participant.setupId];
        if (setup)
          for (const aspect of setup.concept.theme.aspects)
            removeReasonFromAllSources(aspect.id);
      }

      for (const groupId of participant.groupIds)
        cleanupReasonsForGroupUnlink(groupId, index);
    }

    function ensureGroup(setupId: string) {
      const nextValues = ensureGroupParticipant(
        {
          ...form.state.values,
          participants: form.getFieldValue('participants'),
        },
        availableSetups,
        sessionParticipants,
        setupId,
      );
      if (nextValues.participants === form.getFieldValue('participants')) {
        return form
          .getFieldValue('participants')
          .find(
            (participant) =>
              participant.type === 'group' && participant.setupId === setupId,
          )?.id;
      }

      const group = nextValues.participants.find(
        (participant) =>
          participant.type === 'group' && participant.setupId === setupId,
      );
      if (group) form.pushFieldValue('participants', group);
      return group?.id;
    }

    function groupIdForSetup(setupId: string) {
      return (
        formParticipants.find(
          (participant) =>
            participant.type === 'group' && participant.setupId === setupId,
        )?.id ??
        sessionParticipants.find(
          (participant) =>
            participant.type === 'group' && participant.setupId === setupId,
        )?.id ??
        setupId
      );
    }

    function addSetupParticipant(setup: ParticipantSetup) {
      if (setup.type === 'group') {
        if (
          form
            .getFieldValue('participants')
            .some(
              (participant) =>
                participant.type === 'group' &&
                participant.setupId === setup.id,
            )
        )
          return;
        const sessionGroup = sessionParticipants.find(
          (participant) =>
            participant.type === 'group' && participant.setupId === setup.id,
        );
        form.pushFieldValue(
          'participants',
          createGroupParticipantFormEntry(
            setup,
            sessionGroup?.id,
            sessionGroup?.motivations,
          ),
        );
        return;
      }

      form.pushFieldValue(
        'participants',
        createCreatureParticipantFormEntry({
          groupIds: setup.meta.groupIds
            .map((setupId) => ensureGroup(setupId))
            .filter((id): id is string => Boolean(id)),
          id: generateId(),
          motivations: [],
          name: setup.name,
          setup,
          statblocks,
        }),
      );
    }

    function addSessionParticipant(participant: Participant) {
      const setup = setupsById[participant.setupId];
      if (participant.type === 'group') {
        if (setup?.type !== 'group') return;
        form.pushFieldValue(
          'participants',
          createGroupParticipantFormEntry(
            setup,
            participant.id,
            participant.motivations,
          ),
        );
        return;
      }

      if (setup?.type !== 'creature') return;
      form.pushFieldValue(
        'participants',
        createCreatureParticipantFormEntry({
          groupIds: participant.groupIds.map((groupId) => {
            const sessionGroup = sessionParticipants.find(
              (sessionParticipant) =>
                sessionParticipant.type === 'group' &&
                sessionParticipant.id === groupId,
            );
            return sessionGroup
              ? (ensureGroup(sessionGroup.setupId) ?? groupId)
              : groupId;
          }),
          id: participant.id,
          motivations: participant.motivations,
          name: participant.name,
          setup,
          state: participant.state,
          statblocks,
          variationId: participant.variationId,
        }),
      );
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
              if (setup) addSetupParticipant(setup);
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
                  availableSessionParticipants.map((participant) => (
                    <option key={participant.id} value={participant.id}>
                      {participant.name}
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
                  (participant) =>
                    participant.id === selectedSessionParticipantId,
                );
                if (!participant) return;
                addSessionParticipant(participant);
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
                            className="flex-1 text-sm font-bold bg-transparent border border-transparent hover:border-(--lair-border) focus:border-(--lair-border) px-1 py-0.5 outline-none"
                            value={nameField.state.value}
                            onChange={(event) =>
                              nameField.handleChange(event.target.value)
                            }
                          />
                        )}
                      </form.Field>
                      <form.Subscribe
                        selector={(state) => {
                          const participant = state.values.participants[index];
                          return (
                            participant.type === 'group' &&
                            isGroupLinked(participant.id)
                          );
                        }}
                      >
                        {(removeDisabled) => (
                          <button
                            type="button"
                            disabled={removeDisabled}
                            title={
                              removeDisabled
                                ? 'Remove group links from creatures first'
                                : undefined
                            }
                            className="text-xs border border-(--lair-border) px-2 py-0.5 disabled:opacity-50"
                            onClick={() => {
                              if (removeDisabled) return;
                              cleanupReasonsForParticipantRemoval(index);
                              participantsField.removeValue(index);
                            }}
                          >
                            Remove participant
                          </button>
                        )}
                      </form.Subscribe>
                    </div>

                    <form.Subscribe
                      selector={(state) => {
                        const participant = state.values.participants[index];
                        return {
                          participant,
                          setup: setupsById[participant.setupId],
                        };
                      }}
                    >
                      {({participant, setup}) =>
                        participant.type === 'creature' &&
                        setup.type === 'creature' && (
                          <>
                            {Boolean(setup.meta.variations.length) && (
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
                                        const oldId =
                                          variationField.state.value;
                                        if (oldId) {
                                          const oldVar =
                                            setup.meta.variations.find(
                                              (variation) =>
                                                variation.id === oldId,
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
                                      {setup.meta.variations.map(
                                        (variation) => (
                                          <option
                                            key={variation.id}
                                            value={variation.id}
                                          >
                                            {variation.name}
                                          </option>
                                        ),
                                      )}
                                    </select>
                                  </label>
                                )}
                              </form.Field>
                            )}
                            {Boolean(groupSetups.length) && (
                              <form.Field
                                name={`participants[${index}].groupIds`}
                              >
                                {(groupIdsField) => (
                                  <div className="flex flex-col gap-1">
                                    <span className="text-xs">Groups</span>
                                    <div className="flex flex-col gap-1">
                                      {groupSetups.map((groupSetup) => {
                                        const groupId = groupIdForSetup(
                                          groupSetup.id,
                                        );
                                        return (
                                          <label
                                            key={groupSetup.id}
                                            className="flex items-center gap-2 text-xs"
                                          >
                                            <input
                                              type="checkbox"
                                              checked={groupIdsField.state.value.includes(
                                                groupId,
                                              )}
                                              onChange={(event) => {
                                                if (event.target.checked) {
                                                  const ensuredId = ensureGroup(
                                                    groupSetup.id,
                                                  );
                                                  if (
                                                    ensuredId &&
                                                    !groupIdsField.state.value.includes(
                                                      ensuredId,
                                                    )
                                                  ) {
                                                    groupIdsField.handleChange([
                                                      ...groupIdsField.state
                                                        .value,
                                                      ensuredId,
                                                    ]);
                                                  }
                                                  return;
                                                }

                                                groupIdsField.handleChange(
                                                  groupIdsField.state.value.filter(
                                                    (id) => id !== groupId,
                                                  ),
                                                );
                                                cleanupReasonsForGroupUnlink(
                                                  groupId,
                                                  index,
                                                );
                                              }}
                                            />
                                            <span>{groupSetup.name}</span>
                                          </label>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </form.Field>
                            )}
                          </>
                        )
                      }
                    </form.Subscribe>

                    <form.Field
                      name={`participants[${index}].motivations`}
                      mode="array"
                    >
                      {(motivationsField) => (
                        <div className="flex flex-col gap-2">
                          <ul className="flex flex-col gap-1">
                            {motivationsField.state.value.map(
                              (motivation, motivationIndex) => (
                                <li
                                  key={motivation.id}
                                  className="flex items-center gap-2"
                                >
                                  <form.Field
                                    name={`participants[${index}].motivations[${motivationIndex}].value`}
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
                                      motivationsField.removeValue(
                                        motivationIndex,
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
                              motivationsField.pushValue({
                                id: generateId(),
                                value: '',
                              })
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

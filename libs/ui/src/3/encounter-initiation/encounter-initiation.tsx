import {useForm} from '@tanstack/react-form';
import {useMemo, useState} from 'react';
import type {CreatureStatblock} from '@lair/domain/manual/pf2e';
import type {ParticipantSetup} from '@lair/domain/manual/prep';
import {
  createDefaultValues,
  makeEncounterDraftSchema,
  type ResolvedEncounterDraft,
} from './helpers.ts';

export type EncounterInitiationProps = {
  availableSetups: ParticipantSetup<'creature'>[];
  statblocks: Record<string, CreatureStatblock>;
  onSubmit: (result: ResolvedEncounterDraft) => void;
  onCancel: () => void;
};

const generateId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `id-${Math.random().toString(36).slice(2)}`;

export default function EncounterInitiation({
  availableSetups,
  statblocks,
  onSubmit,
  onCancel,
}: EncounterInitiationProps) {
  const setupsById = useMemo(
    () => Object.fromEntries(availableSetups.map((setup) => [setup.id, setup])),
    [availableSetups],
  );

  const schema = useMemo(
    () => makeEncounterDraftSchema({setupsById, statblocksById: statblocks}),
    [setupsById, statblocks],
  );

  const form = useForm({
    defaultValues: createDefaultValues(),
    validators: {onSubmit: schema},
    onSubmit: ({value}) => {
      onSubmit(schema.parse(value));
    },
  });

  const [selectedSetupId, setSelectedSetupId] = useState(
    availableSetups[0]?.id ?? '',
  );

  return (
    <form
      className="flex flex-col gap-4 p-6 bg-(--lair-bg) text-(--lair-text) font-(--lair-font)"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
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
        <legend className="text-sm font-bold px-1">Participants</legend>

        <div className="flex items-end gap-2">
          <label
            htmlFor="participant-setup-picker"
            className="flex flex-col gap-1 flex-1"
          >
            <span className="text-sm">Participant setup</span>
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
                motivations: [],
              });
            }}
          >
            Add participant
          </button>
        </div>

        <form.Field name="participants" mode="array">
          {(participantsField) => (
            <ul className="flex flex-col gap-3">
              {participantsField.state.value.map((participant, index) => (
                <li
                  key={participant.id}
                  className="flex flex-col gap-2 border border-(--lair-border) p-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <form.Field name={`participants[${index}].name`}>
                      {(nameField) => (
                        <span className="text-sm font-bold">
                          {nameField.state.value}
                        </span>
                      )}
                    </form.Field>
                    <button
                      type="button"
                      className="text-xs border border-(--lair-border) px-2 py-0.5"
                      onClick={() =>
                        void form.removeFieldValue('participants', index)
                      }
                    >
                      Remove participant
                    </button>
                  </div>

                  <form.Field
                    name={`participants[${index}].motivations`}
                    mode="array"
                  >
                    {(motivationsField) => (
                      <div className="flex flex-col gap-2">
                        <ul className="flex flex-col gap-1">
                          {motivationsField.state.value.map(
                            (_motivation, mIndex) => (
                              <li
                                key={_motivation.id}
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
                                  onClick={() =>
                                    void form.removeFieldValue(
                                      `participants[${index}].motivations`,
                                      mIndex,
                                    )
                                  }
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
              ))}
            </ul>
          )}
        </form.Field>
      </fieldset>

      <fieldset className="flex flex-col gap-2 border border-(--lair-border) p-3">
        <legend className="text-sm font-bold px-1">Conflict sources</legend>
        <form.Field name="conflictSources" mode="array">
          {(field) => (
            <>
              <ul className="flex flex-col gap-2">
                {field.state.value.map((_source, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <form.Field name={`conflictSources[${index}].opposition`}>
                      {(oppositionField) => (
                        <label className="flex flex-col gap-1 flex-1">
                          <span className="text-xs">Opposition</span>
                          <input
                            type="text"
                            className="border border-(--lair-border) bg-transparent px-2 py-1 text-sm"
                            value={oppositionField.state.value}
                            onChange={(event) =>
                              oppositionField.handleChange(event.target.value)
                            }
                          />
                        </label>
                      )}
                    </form.Field>
                    <button
                      type="button"
                      className="text-xs border border-(--lair-border) px-2 py-0.5"
                      onClick={() =>
                        void form.removeFieldValue('conflictSources', index)
                      }
                    >
                      Remove conflict source
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="self-start text-xs border border-(--lair-border) px-2 py-0.5"
                onClick={() =>
                  form.pushFieldValue('conflictSources', {opposition: ''})
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
    </form>
  );
}

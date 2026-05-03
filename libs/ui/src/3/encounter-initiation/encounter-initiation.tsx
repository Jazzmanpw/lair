import {useMemo} from 'react';
import type {CreatureStatblock} from '@lair/domain/manual/pf2e';
import type {ParticipantSetup} from '@lair/domain/manual/prep';
import type {Participant} from '@lair/domain/manual/running';
import {ConflictSourcesSection} from './conflict-sources-section.tsx';
import {
  createEncounterFormOptions,
  EncounterDraftSchema,
  type ResolvedEncounterDraft,
  useEncounterForm,
} from './encounter-form.ts';
import {ParticipantsSection} from './participants-section.tsx';

export type EncounterInitiationProps = {
  availableSetups: ParticipantSetup<'creature'>[];
  statblocks: Record<string, CreatureStatblock>;
  sessionParticipants: Participant<'creature'>[];
  onSubmit: (result: ResolvedEncounterDraft) => void;
  onCancel: () => void;
};

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

  const form = useEncounterForm({
    ...createEncounterFormOptions(),
    onSubmit: ({value}) => {
      onSubmit(EncounterDraftSchema.parse(value));
    },
  });

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
        <ParticipantsSection
          form={form}
          availableSetups={availableSetups}
          statblocks={statblocks}
          sessionParticipants={sessionParticipants}
          setupsById={setupsById}
        />

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

          <ConflictSourcesSection form={form} setupsById={setupsById} />

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

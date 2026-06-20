import {useState} from 'react';
import type {ParticipantSetup} from '@lair/domain/prep';
import {
  createEncounterFormOptions,
  withEncounterForm,
} from './encounter-form.ts';
import {selectAvailableReasonGroups, selectReasonLabel} from './reason-pool.ts';
import type {ReasonGroup, ReasonOption} from './reason-pool.ts';

type ConflictSourcesSectionProps = {
  setupsById: Record<string, ParticipantSetup>;
};

export const ConflictSourcesSection = withEncounterForm({
  ...createEncounterFormOptions(),
  props: {
    setupsById: {},
  } as ConflictSourcesSectionProps,
  render: function Render({form, setupsById}) {
    return (
      <fieldset className="flex flex-col gap-2 border border-(--lair-border) p-3">
        <legend className="text-sm font-bold px-1">Conflict sources</legend>
        <form.Field name="conflictSources" mode="array">
          {(conflictSourcesField) => (
            <>
              <ul className="flex flex-col gap-3">
                {conflictSourcesField.state.value.map((_source, index) => (
                  <li
                    key={index}
                    className="flex flex-col gap-2 border border-(--lair-border) p-2"
                  >
                    <div className="flex items-center gap-2">
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
                        onClick={() => conflictSourcesField.removeValue(index)}
                      >
                        Remove conflict source
                      </button>
                    </div>

                    <form.Field
                      name={`conflictSources[${index}].reasons`}
                      mode="array"
                    >
                      {(reasonField) => (
                        <>
                          {reasonField.state.value.length > 0 && (
                            <ul className="flex flex-col gap-1">
                              {reasonField.state.value.map(
                                (reason, reasonIndex) => (
                                  <li
                                    key={reason.id}
                                    className="flex items-center gap-2 text-xs"
                                  >
                                    <span className="flex-1">
                                      <form.Subscribe
                                        selector={selectReasonLabel(
                                          setupsById,
                                          reason,
                                        )}
                                      >
                                        {(label) => label}
                                      </form.Subscribe>
                                    </span>
                                    <button
                                      type="button"
                                      className="border border-(--lair-border) px-1 py-0.5"
                                      onClick={() => {
                                        reasonField.removeValue(reasonIndex);
                                      }}
                                    >
                                      Unlink
                                    </button>
                                  </li>
                                ),
                              )}
                            </ul>
                          )}
                          <form.Subscribe
                            selector={selectAvailableReasonGroups(
                              setupsById,
                              index,
                            )}
                          >
                            {(availableReasonGroups) =>
                              availableReasonGroups.length > 0 && (
                                <LinkReasonControl
                                  groups={availableReasonGroups}
                                  onLink={(reason) => {
                                    form.pushFieldValue(
                                      `conflictSources[${index}].reasons`,
                                      {type: reason.type, id: reason.id},
                                    );
                                  }}
                                />
                              )
                            }
                          </form.Subscribe>
                        </>
                      )}
                    </form.Field>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="self-start text-xs border border-(--lair-border) px-2 py-0.5"
                onClick={() =>
                  conflictSourcesField.pushValue({
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
    );
  },
});

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

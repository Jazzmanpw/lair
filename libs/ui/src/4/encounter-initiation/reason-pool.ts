import type {ParticipantSetup} from '@lair/domain/manual/prep';
import type {
  ConflictSourceReasonInput,
  EncounterDraftInput,
  ParticipantFormEntryInput,
} from './encounter-form.ts';

export type ReasonOption = {
  type: 'aspect' | 'motivation';
  id: string;
  value: string;
};

export type ReasonGroup = {
  label: string;
  options: ReasonOption[];
};

type EncounterDraftSelectorState = {
  values: EncounterDraftInput;
};

export function computeReasonPool(
  participants: ParticipantFormEntryInput[],
  setupsById: Record<string, ParticipantSetup>,
): {groups: ReasonGroup[]; byId: Map<string, ReasonOption>} {
  const reasonGroups: ReasonGroup[] = [];
  const seen = new Set<string>();
  const creatureParticipants = participants.filter(
    (participant) => participant.type === 'creature',
  );

  const setupIdsInOrder: string[] = [];
  for (const participant of creatureParticipants) {
    if (!setupIdsInOrder.includes(participant.setupId))
      setupIdsInOrder.push(participant.setupId);
  }

  for (const setupId of setupIdsInOrder) {
    const setup = setupsById[setupId];
    if (setup?.type !== 'creature') continue;
    const options: ReasonOption[] = [];
    for (const aspect of setup.concept.theme.aspects) {
      if (seen.has(aspect.id)) continue;
      seen.add(aspect.id);
      options.push({type: 'aspect', id: aspect.id, value: aspect.value});
    }
    if (options.length > 0)
      reasonGroups.push({label: `Aspects: ${setup.name}`, options});
  }

  for (const participant of creatureParticipants) {
    if (!participant.variationId) continue;
    const setup = setupsById[participant.setupId];
    if (setup?.type !== 'creature') continue;
    const variation = setup.meta.variations.find(
      (variation) => variation.id === participant.variationId,
    );
    if (!variation || seen.has(variation.aspect.id)) continue;
    seen.add(variation.aspect.id);
    reasonGroups.push({
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

  for (const participant of creatureParticipants) {
    const options: ReasonOption[] = [];
    for (const motivation of participant.motivations) {
      if (!motivation.value || seen.has(motivation.id)) continue;
      seen.add(motivation.id);
      options.push({
        type: 'motivation',
        id: motivation.id,
        value: motivation.value,
      });
    }
    if (options.length > 0)
      reasonGroups.push({label: `Motivations: ${participant.name}`, options});
  }

  for (const group of participants) {
    if (group.type !== 'group') continue;
    const setup = setupsById[group.setupId];
    if (setup?.type !== 'group') continue;
    const options: ReasonOption[] = [];
    for (const aspect of setup.concept.theme.aspects) {
      if (seen.has(aspect.id)) continue;
      seen.add(aspect.id);
      options.push({type: 'aspect', id: aspect.id, value: aspect.value});
    }
    for (const motivation of group.motivations) {
      if (!motivation.value || seen.has(motivation.id)) continue;
      seen.add(motivation.id);
      options.push({
        type: 'motivation',
        id: motivation.id,
        value: motivation.value,
      });
    }
    if (options.length > 0)
      reasonGroups.push({label: `Group: ${group.name}`, options});
  }

  const byId = new Map<string, ReasonOption>();
  for (const group of reasonGroups)
    for (const option of group.options) byId.set(option.id, option);
  return {groups: reasonGroups, byId};
}

export function selectAvailableReasonGroups(
  setupsById: Record<string, ParticipantSetup>,
  sourceIndex: number,
): (state: EncounterDraftSelectorState) => ReasonGroup[] {
  return (state) => {
    const linkedIds = new Set(
      state.values.conflictSources[sourceIndex].reasons.map(
        (reason) => reason.id,
      ),
    );
    return computeReasonPool(state.values.participants, setupsById)
      .groups.map((group) => ({
        ...group,
        options: group.options.filter((option) => !linkedIds.has(option.id)),
      }))
      .filter((group) => group.options.length > 0);
  };
}

export function selectReasonLabel(
  setupsById: Record<string, ParticipantSetup>,
  reason: ConflictSourceReasonInput,
): (state: EncounterDraftSelectorState) => string {
  return (state) =>
    computeReasonPool(state.values.participants, setupsById).byId.get(reason.id)
      ?.value ?? `${reason.type}:${reason.id}`;
}

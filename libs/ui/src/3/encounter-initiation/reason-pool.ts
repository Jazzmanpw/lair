import type {ParticipantSetup} from '@lair/domain/manual/prep';
import type {EncounterDraftInput} from './encounter-form.ts';

export type ReasonOption = {
  type: 'aspect' | 'motivation';
  id: string;
  value: string;
};

export type ReasonGroup = {
  label: string;
  options: ReasonOption[];
};

type ConflictSourceReason =
  EncounterDraftInput['conflictSources'][number]['reasons'][number];

type EncounterDraftSelectorState = {
  values: EncounterDraftInput;
};

export function computeReasonPool(
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

export function selectAvailableReasonGroups(
  setupsById: Record<string, ParticipantSetup<'creature'>>,
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
  setupsById: Record<string, ParticipantSetup<'creature'>>,
  reason: ConflictSourceReason,
): (state: EncounterDraftSelectorState) => string {
  return (state) =>
    computeReasonPool(state.values.participants, setupsById).byId.get(reason.id)
      ?.value ?? `${reason.type}:${reason.id}`;
}

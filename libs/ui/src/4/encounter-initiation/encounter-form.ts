import {
  createFormHook,
  createFormHookContexts,
  formOptions,
} from '@tanstack/react-form';
import {z} from 'zod';
import type {CreatureStatblock, CreatureState} from '@lair/domain/manual/pf2e';
import type {
  EncounterSetup,
  ParticipantMotivation,
  ParticipantSetup,
} from '@lair/domain/manual/prep';
import type {ConflictSource, Participant} from '@lair/domain/manual/running';

const {fieldContext, formContext} = createFormHookContexts();

export type ResolvedEncounterDraft = {
  encounter: {
    dramaticQuestion: string;
    conflictSources: ConflictSource[];
  };
  participants: Participant[];
};

export type CreateDefaultValuesOption = {
  availableSetups?: ParticipantSetup[];
  encounterSetup?: EncounterSetup;
  sessionParticipants?: Participant[];
  statblocks?: Record<string, CreatureStatblock>;
};

export function createEncounterFormOptions(
  options: CreateDefaultValuesOption = {},
) {
  return formOptions({
    defaultValues: createDefaultValues(options),
    validators: {onSubmit: EncounterDraftSchema},
  });
}

export const {useAppForm: useEncounterForm, withForm: withEncounterForm} =
  createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {},
    formComponents: {},
  });

const MotivationSchema = z.object({
  id: z.string(),
  value: z.string().min(1),
});

const ConflictSourceReasonSchema = z.object({
  type: z.enum(['aspect', 'motivation']),
  id: z.string(),
});

const ConflictSourceDraftSchema = z.object({
  opposition: z.string().min(1),
  reasons: z.array(ConflictSourceReasonSchema),
});

const ParticipantFormEntrySchema = z
  .discriminatedUnion('type', [
    z.object({
      id: z.string(),
      setupId: z.string().min(1),
      name: z.string().min(1),
      type: z.literal('creature'),
      variationId: z.string().optional(),
      groupIds: z.array(z.string()),
      motivations: z.array(MotivationSchema),
      state: z.custom<CreatureState>(),
    }),
    z.object({
      id: z.string(),
      setupId: z.string().min(1),
      name: z.string().min(1),
      type: z.literal('group'),
      motivations: z.array(MotivationSchema),
      state: z.null(),
    }),
  ])
  .transform((entry): Participant => {
    if (entry.type === 'group') {
      return {
        id: entry.id,
        setupId: entry.setupId,
        name: entry.name,
        motivations: entry.motivations,
        type: 'group',
        state: null,
      };
    }

    return {
      id: entry.id,
      setupId: entry.setupId,
      name: entry.name,
      variationId: entry.variationId || null,
      groupIds: entry.groupIds,
      motivations: entry.motivations,
      type: 'creature',
      state: entry.state,
    };
  });

export type ParticipantFormEntryInput = z.input<
  typeof ParticipantFormEntrySchema
>;

export type ConflictSourceReasonInput = z.input<
  typeof ConflictSourceReasonSchema
>;

export const EncounterDraftSchema = z
  .object({
    dramaticQuestion: z.string().min(1),
    participants: z.array(ParticipantFormEntrySchema).min(1),
    conflictSources: z.array(ConflictSourceDraftSchema).min(1),
  })
  .transform(
    (value): ResolvedEncounterDraft => ({
      encounter: {
        dramaticQuestion: value.dramaticQuestion,
        conflictSources: value.conflictSources,
      },
      participants: value.participants,
    }),
  );

export type EncounterDraftInput = z.input<typeof EncounterDraftSchema>;

export function createDefaultValues({
  availableSetups = [],
  encounterSetup,
  sessionParticipants = [],
  statblocks = {},
}: CreateDefaultValuesOption = {}): EncounterDraftInput {
  if (!encounterSetup) {
    return {
      dramaticQuestion: '',
      participants: [],
      conflictSources: [],
    };
  }

  return encounterSetup.participants.reduce<EncounterDraftInput>(
    (values, participantSeed) => {
      const setup = availableSetups.find(
        (setup): setup is ParticipantSetup<'creature'> =>
          setup.id === participantSeed.setupId && setup.type === 'creature',
      );
      if (!setup) return values;

      const valuesWithGroups = setup.meta.groupIds.reduce(
        (result, setupId) =>
          ensureGroupParticipant(
            result,
            availableSetups,
            sessionParticipants,
            setupId,
          ),
        values,
      );

      return {
        ...valuesWithGroups,
        participants: [
          ...valuesWithGroups.participants,
          createCreatureParticipantFormEntry({
            groupIds: setup.meta.groupIds
              .map((setupId) =>
                valuesWithGroups.participants.find(
                  (participant) =>
                    participant.type === 'group' &&
                    participant.setupId === setupId,
                ),
              )
              .filter((participant): participant is ParticipantFormEntryInput =>
                Boolean(participant),
              )
              .map((participant) => participant.id),
            id: participantSeed.id,
            motivations: participantSeed.motivations,
            name: participantSeed.name ?? setup.name,
            setup,
            statblocks,
            variationId: participantSeed.variationId ?? undefined,
          }),
        ],
      };
    },
    {
      dramaticQuestion: encounterSetup.potentialDramaticQuestion,
      participants: [],
      conflictSources: [],
    },
  );
}

export function createCreatureParticipantFormEntry({
  groupIds,
  id,
  motivations,
  name,
  setup,
  state,
  statblocks,
  variationId,
}: {
  groupIds: string[];
  id: string;
  motivations: ParticipantMotivation[];
  name: string;
  setup: ParticipantSetup<'creature'>;
  state?: CreatureState;
  statblocks: Record<string, CreatureStatblock>;
  variationId?: string | null;
}): ParticipantFormEntryInput {
  const initialState = state ?? {
    maxHp: statblocks[setup.meta.statblockId].hitPoints.value,
    currentHp: statblocks[setup.meta.statblockId].hitPoints.value,
    reactionAvailable: true,
    resources: [],
    items: [],
    conditions:
      statblocks[setup.meta.statblockId].perception.permanentConditions,
  };

  return {
    id,
    setupId: setup.id,
    name,
    type: 'creature',
    variationId:
      setup.meta.variations.length || variationId
        ? (variationId ?? '')
        : undefined,
    groupIds,
    motivations,
    state: initialState,
  };
}

export function createGroupParticipantFormEntry(
  setup: ParticipantSetup<'group'>,
  existingId?: string,
  motivations: ParticipantMotivation[] = [],
): ParticipantFormEntryInput {
  return {
    id: existingId ?? setup.id,
    setupId: setup.id,
    name: setup.name,
    type: 'group',
    motivations,
    state: null,
  };
}

export function ensureGroupParticipant(
  values: EncounterDraftInput,
  availableSetups: ParticipantSetup[],
  sessionParticipants: Participant[],
  setupId: string,
): EncounterDraftInput {
  if (
    values.participants.some(
      (participant) =>
        participant.type === 'group' && participant.setupId === setupId,
    )
  )
    return values;

  const setup = availableSetups.find(
    (setup): setup is ParticipantSetup<'group'> =>
      setup.id === setupId && setup.type === 'group',
  );
  if (!setup) return values;

  const sessionGroup = sessionParticipants.find(
    (participant) =>
      participant.type === 'group' && participant.setupId === setupId,
  );

  return {
    ...values,
    participants: [
      ...values.participants,
      createGroupParticipantFormEntry(
        setup,
        sessionGroup?.id,
        sessionGroup?.motivations,
      ),
    ],
  };
}

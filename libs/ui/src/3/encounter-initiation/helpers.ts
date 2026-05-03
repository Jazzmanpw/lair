import {z} from 'zod';
import type {CreatureStatblock, CreatureState} from '@lair/domain/manual/pf2e';
import type {ParticipantMotivation} from '@lair/domain/manual/prep';
import type {ConflictSource} from '@lair/domain/manual/running';

export type ResolvedParticipant = {
  id: string;
  setupId: string;
  name: string;
  variationId: string | null;
  motivations: ParticipantMotivation[];
  type: 'creature';
  state: CreatureState;
};

export type ResolvedEncounterDraft = {
  encounter: {
    dramaticQuestion: string;
    conflictSources: ConflictSource[];
  };
  participants: ResolvedParticipant[];
};

export function deriveInitialCreatureState(
  statblock: CreatureStatblock,
): CreatureState {
  return {
    maxHp: statblock.hitPoints.value,
    currentHp: statblock.hitPoints.value,
    reactionAvailable: true,
    resources: [],
    items: [],
    conditions: statblock.perception.permanentConditions,
  };
}

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
  .object({
    id: z.string(),
    setupId: z.string().min(1),
    name: z.string().min(1),
    variationId: z.string().optional(),
    motivations: z.array(MotivationSchema),
    state: z.custom<CreatureState>(),
  })
  .transform(
    (entry): ResolvedParticipant => ({
      id: entry.id,
      setupId: entry.setupId,
      name: entry.name,
      variationId: entry.variationId || null,
      motivations: entry.motivations,
      type: 'creature',
      state: entry.state,
    }),
  );

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

export function createDefaultValues(): EncounterDraftInput {
  return {
    dramaticQuestion: '',
    participants: [],
    conflictSources: [],
  };
}

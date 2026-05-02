import {z} from 'zod';
import type {CreatureStatblock, CreatureState} from '@lair/domain/manual/pf2e';
import type {
  ParticipantMotivation,
  ParticipantSetup,
} from '@lair/domain/manual/prep';
import type {ConflictSource} from '@lair/domain/manual/running';

export type EncounterDraftContext = {
  setupsById: Record<string, ParticipantSetup<'creature'>>;
  statblocksById: Record<string, CreatureStatblock>;
};

export type ResolvedParticipant = {
  id: string;
  setupId: string;
  name: string;
  motivations: ParticipantMotivation[];
  type: 'creature';
  state: CreatureState;
};

export type ResolvedEncounterDraft = {
  encounter: {
    dramaticQuestion: string;
    conflictSources: ConflictSource[];
  };
  newParticipants: ResolvedParticipant[];
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

const ConflictSourceDraftSchema = z
  .object({opposition: z.string().min(1)})
  .transform(({opposition}): ConflictSource => ({opposition, reasons: []}));

const makeParticipantFormEntrySchema = (ctx: EncounterDraftContext) =>
  z
    .object({
      id: z.string(),
      setupId: z.string().min(1),
      name: z.string().min(1),
      motivations: z.array(MotivationSchema),
    })
    .transform((entry): ResolvedParticipant => {
      const setup = ctx.setupsById[entry.setupId];
      const statblock = ctx.statblocksById[setup.meta.statblockId];
      return {
        id: entry.id,
        setupId: entry.setupId,
        name: entry.name,
        motivations: entry.motivations,
        type: 'creature',
        state: deriveInitialCreatureState(statblock),
      };
    });

export const makeEncounterDraftSchema = (ctx: EncounterDraftContext) => {
  const entrySchema = makeParticipantFormEntrySchema(ctx);

  return z
    .object({
      dramaticQuestion: z.string().min(1),
      participants: z.array(entrySchema).min(1),
      conflictSources: z.array(ConflictSourceDraftSchema).min(1),
    })
    .transform(
      (value): ResolvedEncounterDraft => ({
        encounter: {
          dramaticQuestion: value.dramaticQuestion,
          conflictSources: value.conflictSources,
        },
        newParticipants: value.participants,
      }),
    );
};

export type EncounterDraftInput = z.input<
  ReturnType<typeof makeEncounterDraftSchema>
>;

export function createDefaultValues(): EncounterDraftInput {
  return {
    dramaticQuestion: '',
    participants: [],
    conflictSources: [],
  };
}

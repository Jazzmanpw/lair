import type {CreatureStatblock, CreatureState} from '@lair/domain/manual/pf2e';

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

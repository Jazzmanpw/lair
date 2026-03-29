import type {CreatureStatblock} from './creature';
import type {Encounter} from './scene';

export type EncounterParticipant = {
  id: string;
  label: string;
  statblockId?: string;
};

export type ParticipantRunState = {
  currentHp: number;
  maxHp: number;
  conditions: string[];
  reactionAvailable: boolean;
  counters: Record<string, number>;
};

export type EncounterFlowState = {
  initiativeOrder: string[];
  activeParticipantId: string;
  round: number;
};

export type EncounterFocusState = {
  actorParticipantId: string;
  targetParticipantIds: string[];
};

export type EncounterRunState = {
  participants: EncounterParticipant[];
  flow: EncounterFlowState;
  creatureStates: Record<string, ParticipantRunState>;
  focus: EncounterFocusState;
};

export type RunStateAction =
  | {type: 'ADJUST_HP'; participantId: string; delta: number}
  | {type: 'SET_HP'; participantId: string; value: number}
  | {type: 'ADD_CONDITION'; participantId: string; condition: string}
  | {type: 'REMOVE_CONDITION'; participantId: string; condition: string}
  | {type: 'TOGGLE_REACTION'; participantId: string}
  | {type: 'SET_ACTIVE'; participantId: string};

export function initializeRunState(
  encounter: Encounter,
  statblocks: Record<string, CreatureStatblock>,
): EncounterRunState {
  const participants: EncounterParticipant[] = [];
  const creatureStates: Record<string, ParticipantRunState> = {};

  for (const {creature, count} of encounter.creatures) {
    for (let i = 0; i < count; i++) {
      const id = `${creature.id}-${i}`;
      const label = count > 1 ? `${creature.label} ${i + 1}` : creature.label;
      participants.push({id, label, statblockId: creature.id});

      const sb = statblocks[creature.id];
      creatureStates[id] = {
        currentHp: sb?.defense.hp ?? 0,
        maxHp: sb?.defense.hp ?? 0,
        conditions: [],
        reactionAvailable: true,
        counters: {},
      };
    }
  }

  return {
    participants,
    flow: {
      initiativeOrder: participants.map((p) => p.id),
      activeParticipantId: participants[0].id,
      round: 1,
    },
    creatureStates,
    focus: {
      actorParticipantId: participants[0].id,
      targetParticipantIds: [],
    },
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function updateCreature(
  state: EncounterRunState,
  participantId: string,
  updater: (prev: ParticipantRunState) => ParticipantRunState | null,
): EncounterRunState {
  const prev = state.creatureStates[participantId];
  if (!prev) return state;
  const next = updater(prev);
  if (!next) return state;
  return {
    ...state,
    creatureStates: {...state.creatureStates, [participantId]: next},
  };
}

export function runStateReducer(
  state: EncounterRunState,
  action: RunStateAction,
): EncounterRunState {
  switch (action.type) {
    case 'ADJUST_HP':
      return updateCreature(state, action.participantId, (prev) => ({
        ...prev,
        currentHp: clamp(prev.currentHp + action.delta, 0, prev.maxHp),
      }));

    case 'SET_HP':
      return updateCreature(state, action.participantId, (prev) => ({
        ...prev,
        currentHp: clamp(action.value, 0, prev.maxHp),
      }));

    case 'ADD_CONDITION':
      return updateCreature(state, action.participantId, (prev) =>
        prev.conditions.includes(action.condition)
          ? null
          : {...prev, conditions: [...prev.conditions, action.condition]},
      );

    case 'REMOVE_CONDITION':
      return updateCreature(state, action.participantId, (prev) => ({
        ...prev,
        conditions: prev.conditions.filter((c) => c !== action.condition),
      }));

    case 'TOGGLE_REACTION':
      return updateCreature(state, action.participantId, (prev) => ({
        ...prev,
        reactionAvailable: !prev.reactionAvailable,
      }));

    case 'SET_ACTIVE':
      return {
        ...state,
        flow: {...state.flow, activeParticipantId: action.participantId},
      };
  }
}

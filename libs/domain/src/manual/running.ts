import type {CreatureState} from './pf2e.ts';
import type {ParticipantMotivation, ParticipantType} from './prep.ts';

export type Session = {
  participantIds: string[];
  openEncounterIds: string[];
  entities: {
    participants: Record<string, Participant>;
    encounters: Record<string, Encounter>;
  };
};

type Participant<Type extends ParticipantType = ParticipantType> = {
  id: string;
  setupId: string;
  motivations: ParticipantMotivation[];
} & Participant.TypeState<Type>;
namespace Participant {
  export type TypeState<Type extends ParticipantType = ParticipantType> = {
    [T in ParticipantType]: {
      type: T;
      state: State<T>;
    };
  }[Type];

  export type State<Type extends ParticipantType> = {
    creature: CreatureState;
    group: null;
  }[Type];
}

type Encounter = {
  dramaticQuestion: string;
  conflictSources: ConflictSource[];
};

type ConflictSource = {
  opposition: string;
  reasons: ConflictSourceReason[];
};

type ConflictSourceReason = {
  type: 'aspect' | 'motivation';
  id: string;
};

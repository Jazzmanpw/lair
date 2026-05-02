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

export type Participant<Type extends ParticipantType = ParticipantType> = {
  id: string;
  name: string;
  setupId: string;
  motivations: ParticipantMotivation[];
} & Participant.TypeState<Type>;
export namespace Participant {
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

export type Encounter = {
  dramaticQuestion: string;
  conflictSources: ConflictSource[];
};

export type ConflictSource = {
  opposition: string;
  reasons: ConflictSourceReason[];
};

export type ConflictSourceReason = {
  type: 'aspect' | 'motivation';
  id: string;
};

import type {CreatureState} from './pf2e.ts';
import type {ParticipantMotivation, ParticipantType} from './prep.ts';

export type Session = {
  participantIds: Participant['id'][];
  playerCharacterIds: PlayerCharacter['id'][];
  openEncounterIds: string[];
  focusedEncounterId: string | null;
  initiative: InitiativeFlow | null;
  groupColors: Record<Participant['id'], string>;
  entities: {
    participants: {
      [Type in ParticipantType as Participant<Type>['id']]: Participant<Type>;
    };
    playerCharacters: Record<PlayerCharacter['id'], PlayerCharacter>;
    encounters: Record<string, Encounter>;
  };
};

export type InitiativeFlow = {
  order: InitiativeFlow.Entry['id'][];
  activeId: InitiativeFlow.Entry['id'];
  round: number;
};
export namespace InitiativeFlow {
  export type Entry = Participant<'creature'> | PlayerCharacter;

  export function isPlayerCharacterEntryId(
    session: Session,
    entryId: Entry['id'],
  ): entryId is PlayerCharacter['id'] {
    return entryId in session.entities.playerCharacters;
  }
}

export type Participant<Type extends ParticipantType = ParticipantType> = {
  id: string & {__brand?: 'participant-id'};
  name: string;
  setupId: string;
  motivations: ParticipantMotivation[];
} & Participant.OfType<Type>;
export namespace Participant {
  export type OfType<Type extends ParticipantType = ParticipantType> = ({
    [T in ParticipantType]: {
      id: {type?: T};
      type: T;
      state: State<T>;
    };
  } & {
    creature: {
      status: 'inGame' | 'outOfGame';
      variationId: string | null;
      groupIds: Participant<'group'>['id'][];
    };
  })[Type];

  export type State<Type extends ParticipantType> = {
    creature: CreatureState;
    group: null;
  }[Type];
}

export type PlayerCharacter = {
  id: string & {__brand?: 'pc-id'};
  name: string;
  type: 'playerCharacter';
};

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

import type {CreatureStatblockDelta} from './pf2e';

export type ParticipantSetup<Type extends ParticipantType = ParticipantType> = {
  id: string;
  name: string;
  concept: ParticipantConcept;
} & ParticipantSetup.TypeMeta<Type>;
export namespace ParticipantSetup {
  export type TypeMeta<Type extends ParticipantType = ParticipantType> = {
    [T in ParticipantType]: {
      type: T;
      meta: Meta<T>;
    };
  }[Type];

  export type Meta<Type extends ParticipantType> = {
    creature: {
      statblockId: string;
      variations: ParticipantVariation<'creature'>[];
      groupIds: string[];
    };
    group: null;
  }[Type];
}

export type ParticipantType = 'creature' | 'group';

type ParticipantConcept = {
  references: string;
  theme: ParticipantTheme;
  abilities: string[];
  motivations: ParticipantMotivation[];
};

type ParticipantTheme = {
  aspects: ParticipantAspect[];
  role: string;
  feeling: string;
};

type ParticipantAspect = {
  id: string;
  value: string;
};

export type ParticipantMotivation = {
  id: string;
  value: string;
};

type ParticipantVariation<Type extends ParticipantType = ParticipantType> = {
  id: string;
  name: string;
  aspect: ParticipantAspect;
  statblockDelta: StatblockDelta<Type>;
};

// A deeply partial type that can add or override things in
// an actual statblock, including modifiers, situational modifiers
// (like +2, +4 to recruit) items and abilities
type StatblockDelta<Type extends ParticipantType = ParticipantType> = {
  creature: CreatureStatblockDelta;
  group: never;
}[Type];

export type ParticipantGroupSetup = {
  id: string;
  name: string;
  concept: ParticipantConcept;
};

export type EncounterSetup = {
  potentialDramaticQuestion: string;
  participants: {
    id: string;
    name?: string;
    setupId: string;
    variationId: string | null;
  }[];
};

// TODO: These are simplified UI-facing display types for layout prototyping.
// The real domain model will replace or wrap them with proper constraints.

export type CreatureHeader = {
  name: string;
  level: number;
  traits: string[];
};

export type PerceptionBlock = {
  perception: string;
  languages: string[];
  skills: string[];
  abilityModifiers: {
    str: string;
    dex: string;
    con: string;
    int: string;
    wis: string;
    cha: string;
  };
  items?: string[];
  interactionAbilities?: string[];
};

export type DefenseBlock = {
  ac: string;
  saves: {fort: string; ref: string; will: string};
  hp: number;
  immunities?: string[];
  resistances?: string[];
  weaknesses?: string[];
  automaticAbilities?: string[];
  reactiveAbilities?: string[];
};

export type OffenseBlock = {
  speed: string;
  melee?: string[];
  ranged?: string[];
  spells?: string;
  innateSpells?: string;
  focusSpells?: string;
  offensiveAbilities?: string[];
};

export type CreatureConcept = {
  theme: string[];
  role: string;
  feeling: string;
};

export type CreatureStatblock = {
  id: string;
  header: CreatureHeader;
  description: string;
  perception: PerceptionBlock;
  defense: DefenseBlock;
  offense: OffenseBlock;
  concept?: CreatureConcept;
};

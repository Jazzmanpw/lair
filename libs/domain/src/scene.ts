// TODO: These are simplified UI-facing display types for layout prototyping.
// The real domain model will replace or wrap them with proper constraints.

/** Wikilink reference to another entity */
export type LinkRef = {
  id: string;
  label: string;
};

export type SceneMeta = {
  id: string;
  title: string;
  location: LinkRef;
  adventure: LinkRef;
  setting: LinkRef;
};

export type SkillCheck = {
  title: string;
  skill: string;
  dc: number;
  difficulty: string;
  outcomes: {
    criticalSuccess?: string;
    success?: string;
    failure?: string;
    criticalFailure?: string;
  };
};

export type EncounterCreatureRef = {
  creature: LinkRef;
  count: number;
};

export type Encounter = {
  threatLevel: string;
  dramaticQuestion: string;
  conflictSources: string[];
  creatures: EncounterCreatureRef[];
};

export type TrapStatblock = {
  name: string;
  levelOrType: string;
  traits: string[];
  stealth?: string;
  disable?: string;
  trigger?: string;
  effect?: string;
  description?: string;
};

export type TreasureItem = {
  name: string;
  note?: string;
};

export type Scene = {
  meta: SceneMeta;
  flavorText: string;
  roomDescription: string[];
  skillChecks: SkillCheck[];
  encounter: Encounter | null;
  traps: TrapStatblock[];
  treasures: TreasureItem[];
  linkedSceneIds: string[];
};

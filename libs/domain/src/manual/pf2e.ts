export type CreatureStatblock = {
  id: string;
  name: string;
  level: number;
  traits: Trait[];
  perception: {
    modifier: ScaledModifier;
    permanentConditions: Condition[];
    senses: Sense[];
  };
  languages: string[];
  // Keys are skill IDs
  skills: Partial<Record<string, ScaledModifier>>;
  // Keys are attribute IDs
  attributes: Record<string, ScaledModifier>;
  items: Item[];
  armorClass: ScaledModifier;
  savingThrows: Record<'fortitude' | 'reflex' | 'will', ScaledModifier> &
    Pick<ScaledModifier, 'special'>;
  hitPoints: ScaledModifier;
  immunities: string;
  resistances: string;
  weaknesses: string;
  speeds: Speed[];
  attacks: Attack[];
  spells?: {
    // "Occult spontaneous", "Divine innate", "Bard composition", etc.
    name?: string;
    difficultyClass: ScaledModifier;
    attackModifier: ScaledModifier;
    focusPoints?: number;
    spellsByRank: Record<
      SpellRank,
      {
        slots?: number;
        spells: {
          spellId: string;
          count?: number;
          atWill?: true;
          constant?: true;
        };
      }
    >;
    cantripRank?: SpellRank;
  }[];
  abilities: Ability[];
};

export type Trait = string;

type ScaledModifier = {
  scale: ModifierScale;
  value: number;
  special?: {adjustment: number; description: string};
};

type ModifierScale = 'E' | 'H' | 'M' | 'L' | 'T';

type Condition = {
  ruleId: string;
  // And additional data like counters,
  // persistent damage type/amount and maybe more
};

type Sense = {
  id: string;
  name: string;
  precision: 'precise' | 'imprecise';
  distance: number | null;
};

type Item = {
  itemId: string;
};

type Speed = {
  type: 'burrow' | 'climb' | 'fly' | 'land' | 'swim';
  value: number;
};

type Attack = {
  id: string;
  type: 'melee' | 'ranged';
  name: string;
  modifier: ScaledModifier;
  traits: Trait[];
  damage: ScaledDamage;
};

type ScaledDamage = {
  scale: ModifierScale;
  value: (
    | {roll: string; type: DamageType; persistent?: true}
    | {abilityId: string}
  )[];
};

type DamageType = 'bludgeoning' | 'piercing' | 'slashing';

type SpellRank = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

// "Reading rule" reference https://2e.aonprd.com/Rules.aspx?ID=2026
type Ability = {
  id: string;
  name: string;
  type: Ability.Type;
  actionCost: ActionCost | {from: ActionCost; to: ActionCost};
  traits: Trait[];
  frequency?: string;
  trigger?: string;
  requirements?: string;
  effect: {description: string} & Partial<
    Record<
      'criticalSuccess' | 'success' | 'failure' | 'criticalFailure',
      string
    >
  >;
};
namespace Ability {
  export type Type =
    | 'interaction'
    | 'automatic'
    | 'reactive'
    | 'movement'
    | 'active';
}

type ActionCost = '0' | '1' | '2' | '3' | 'r';

export type CreatureState = {
  maxHp: number;
  currentHp: number;
  reactionAvailable: boolean;
  resources: ParticipantResource[];
  // a creature might gain and lose items;
  // probably I'd like to monitor it _sometimes_;
  // how does it intersect with consumables?
  items: Item[];
  conditions: Condition[];
};

// Focus points, charges, consumables and other things
// that make sense to count during sessions
type ParticipantResource = unknown;

export type CreatureStatblockDelta = {
  [Key in Exclude<keyof CreatureStatblock, 'id' | 'name' | 'level'>]?: (
    prev: CreatureStatblock[Key],
  ) => CreatureStatblock[Key];
};

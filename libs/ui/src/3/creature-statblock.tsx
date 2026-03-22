import type {CreatureStatblock as Statblock} from '@lair/domain/creature';

export type CreatureStatblockProps = {
  statblock: Statblock;
};

const sizeTraits = new Set([
  'tiny',
  'small',
  'medium',
  'large',
  'huge',
  'gargantuan',
]);

function traitClass(trait: string) {
  const lower = trait.toLowerCase();
  if (lower === 'unique') return 'bg-[#4a2050] border border-[#8b6c3e]';
  if (lower === 'rare') return 'bg-[#1a2040] border border-[#8b6c3e]';
  if (lower === 'uncommon') return 'bg-[#3d2a10] border border-[#8b6c3e]';
  if (sizeTraits.has(lower)) return 'bg-[#1a3018] border border-[#8b6c3e]';
  return 'bg-[#2d2218] border border-[#8b6c3e]';
}

function StatLine({label, value}: {label: string; value: string}) {
  return (
    <p className="pl-[1em] -indent-[1em]">
      <span className="font-bold">{label}</span> {value}
    </p>
  );
}

function StatList({label, items}: {label: string; items: string[]}) {
  return (
    <div>
      <span className="font-bold">{label}</span>
      {items.map((item) => (
        <p key={item} className="pl-[1em] -indent-[1em]">
          {item}
        </p>
      ))}
    </div>
  );
}

export default function CreatureStatblock({statblock}: CreatureStatblockProps) {
  const {header, description, perception, defense, offense} = statblock;

  return (
    <div className="bg-[#1d231a] border border-[#2c3428] rounded font-(--lair-font) text-[0.85rem] leading-snug">
      <div className="flex justify-between items-center px-2.5 py-1 text-[1.2rem] font-bold bg-[#172015] text-[#e8e4d8] border-b border-[#8b6c3e]">
        <span>{header.name}</span>
        <span>Creature {header.level}</span>
      </div>

      <div className="flex flex-wrap gap-1 px-2.5 py-1.5">
        {header.traits.map((trait) => (
          <span
            key={trait}
            className={`inline-block px-1.5 py-0 text-[0.85rem] font-bold capitalize text-white ${traitClass(trait)}`}
          >
            {trait}
          </span>
        ))}
      </div>

      <div className="px-2.5 pb-2 text-(--lair-text)">
        <p className="italic text-(--lair-text-dim)">{description}</p>

        <hr className="border-[#2c3428] my-1" />

        <StatLine label="Perception" value={perception.perception} />
        <StatLine label="Languages" value={perception.languages.join(', ')} />
        <StatLine label="Skills" value={perception.skills.join('; ')} />
        <StatLine
          label="Str"
          value={`${perception.abilityModifiers.str}, Dex ${perception.abilityModifiers.dex}, Con ${perception.abilityModifiers.con}, Int ${perception.abilityModifiers.int}, Wis ${perception.abilityModifiers.wis}, Cha ${perception.abilityModifiers.cha}`}
        />
        {perception.items && (
          <StatLine label="Items" value={perception.items.join(', ')} />
        )}
        {perception.interactionAbilities && (
          <StatList
            label="Interaction Abilities"
            items={perception.interactionAbilities}
          />
        )}

        <hr className="border-[#2c3428] my-1" />

        <StatLine label="AC" value={defense.ac} />
        <StatLine
          label="Fort"
          value={`${defense.saves.fort}, Ref ${defense.saves.ref}, Will ${defense.saves.will}`}
        />
        <StatLine label="HP" value={defense.hp} />
        {defense.immunities && (
          <StatLine label="Immunities" value={defense.immunities.join(', ')} />
        )}
        {defense.resistances && (
          <StatLine
            label="Resistances"
            value={defense.resistances.join(', ')}
          />
        )}
        {defense.weaknesses && (
          <StatLine label="Weaknesses" value={defense.weaknesses.join(', ')} />
        )}
        {defense.automaticAbilities && (
          <StatList
            label="Automatic Abilities"
            items={defense.automaticAbilities}
          />
        )}
        {defense.reactiveAbilities && (
          <StatList
            label="Reactive Abilities"
            items={defense.reactiveAbilities}
          />
        )}

        <hr className="border-[#2c3428] my-1" />

        <StatLine label="Speed" value={offense.speed} />
        {offense.melee && <StatList label="Melee" items={offense.melee} />}
        {offense.ranged && <StatList label="Ranged" items={offense.ranged} />}
        {offense.spells && <StatLine label="Spells" value={offense.spells} />}
        {offense.innateSpells && (
          <StatLine label="Innate Spells" value={offense.innateSpells} />
        )}
        {offense.focusSpells && (
          <StatLine label="Focus Spells" value={offense.focusSpells} />
        )}
        {offense.offensiveAbilities && (
          <StatList
            label="Offensive Abilities"
            items={offense.offensiveAbilities}
          />
        )}
      </div>
    </div>
  );
}

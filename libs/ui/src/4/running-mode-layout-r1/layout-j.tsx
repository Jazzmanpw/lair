import {useState} from 'react';
import Fpo from '../fpo.tsx';

type LayoutMode = 'exploration' | 'encounter' | 'tactics';

export type LayoutJProps = {
  mode: LayoutMode;
};

export default function LayoutJ({mode: initialMode}: LayoutJProps) {
  const [mode, setMode] = useState<LayoutMode>(initialMode);
  const hasEncounter = mode === 'encounter' || mode === 'tactics';
  const hasTactics = mode === 'tactics';

  return (
    <div className="h-screen bg-[#12170f] text-(--lair-text) font-(--lair-font) overflow-hidden flex flex-col">
      <div className="border-b border-[#2c3428] bg-[#172015] px-5 py-2 flex items-center gap-3 shrink-0">
        <Fpo className="min-h-[32px] w-[260px]">
          Scene Header — title + breadcrumb
        </Fpo>
        {hasEncounter && (
          <Fpo className="min-h-[28px] flex-1">
            Dramatic Question — 1 line, ~28px
          </Fpo>
        )}
        {hasEncounter && (
          <Fpo className="min-h-[24px] w-[110px]">Threat Level</Fpo>
        )}
        <Fpo className="min-h-[28px] w-[110px]">Reminders</Fpo>
        {hasTactics && (
          <Fpo className="min-h-[28px] w-[300px]">
            Flow — turn order, active, round
          </Fpo>
        )}
      </div>

      <div className="shrink-0 border-b border-[#2c3428] bg-[#151c12] px-3 py-2">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] uppercase tracking-[0.14em] text-[#b8944a]">
            {hasTactics ? 'Roster — initiative order' : 'Participants'}
          </span>
          {hasEncounter && (
            <span className="text-[10px] text-(--lair-text-dim)">
              · grouped: In conflict / Non-conflicting / Out
            </span>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {Array.from({length: 7}).map((_, i) => (
            <Fpo key={i} className="min-h-[120px] w-[180px] shrink-0">
              {i < 6
                ? `Creature card ${i + 1} — HP + conditions + reaction`
                : 'Group card — motivation'}
            </Fpo>
          ))}
        </div>
      </div>

      <div className="shrink-0 border-b border-[#2c3428] px-3 py-2 grid grid-cols-[1fr_1fr_1fr] gap-3">
        <Fpo className="min-h-[140px]">Room Prompts — 4-5 bullets, ~160px</Fpo>
        <Fpo className="min-h-[140px]">
          {hasEncounter
            ? 'Conflict Sources — 2-3 + A/M highlights, ~140px'
            : 'Flavor Text + Linked Scenes, ~140px'}
        </Fpo>
        <Fpo className="min-h-[140px]">
          Triggers — skill checks + traps + setups, ~150px
        </Fpo>
      </div>

      {hasTactics ? (
        <div className="flex-1 border-t-2 border-[#8b6c3e] px-3 py-2 grid grid-cols-[1fr_300px_300px] gap-3 overflow-hidden">
          <Fpo className="min-h-[200px]">
            Actor — A/Ms + actions + attacks + spells + speed, ~500px
          </Fpo>
          <Fpo className="min-h-[200px]">
            Targets — AC + saves + conditions, ~80px
          </Fpo>
          <Fpo className="min-h-[200px]">
            Interrupts — passives + reactions + reminders, ~120px
          </Fpo>
        </div>
      ) : (
        <div className="flex-1 px-3 py-2 grid grid-cols-[1fr_1fr] gap-3 overflow-hidden">
          <Fpo className="min-h-[140px]">Map / Atmosphere Image — ~200px</Fpo>
          <Fpo className="min-h-[140px]">
            {hasEncounter
              ? 'Linked Scenes + prepared setups, ~200px'
              : 'Linked Scenes — 3-4 cards, ~260px'}
          </Fpo>
        </div>
      )}

      <div className="border-t border-[#2c3428] bg-[#172015] px-4 py-1.5 flex gap-2 items-center shrink-0">
        <span className="text-[10px] uppercase tracking-[0.1em] text-(--lair-text-dim) mr-2">
          Mode
        </span>
        {(['exploration', 'encounter', 'tactics'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`text-[11px] px-2 py-0.5 rounded cursor-pointer font-(--lair-font) border ${
              mode === m
                ? 'bg-[#262e23] border-[#8b6c3e] text-[#b8944a]'
                : 'bg-transparent border-[#2c3428] text-(--lair-text-dim) hover:border-[#384236]'
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}

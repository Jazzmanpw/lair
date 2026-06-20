import {useState} from 'react';
import Fpo from '../fpo.tsx';

type LayoutMode = 'exploration' | 'encounter' | 'tactics';

export type LayoutGProps = {
  mode: LayoutMode;
};

export default function LayoutG({mode: initialMode}: LayoutGProps) {
  const [mode, setMode] = useState<LayoutMode>(initialMode);
  const hasEncounter = mode === 'encounter' || mode === 'tactics';
  const hasTactics = mode === 'tactics';

  return (
    <div className="h-screen bg-[#12170f] text-(--lair-text) font-(--lair-font) overflow-hidden grid grid-rows-[auto_1fr_auto] grid-cols-[220px_1fr_260px]">
      <div className="col-span-3 border-b border-[#2c3428] bg-[#172015] px-5 py-2 flex items-center gap-4">
        <Fpo className="min-h-[36px] w-[300px]">
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
      </div>

      <div className="border-r border-[#2c3428] bg-[#151c12] p-3 overflow-y-auto flex flex-col gap-2">
        <Fpo className="min-h-[140px]">Room Prompts — 4-5 bullets, ~160px</Fpo>
        <Fpo className="min-h-[60px]">Flavor Text — ~70px</Fpo>
        <Fpo className="min-h-[28px]">Room-Start Reminders</Fpo>
        <Fpo className="min-h-[120px] flex-1">
          Triggers — skill checks + traps + nearby + setups, ~150px
        </Fpo>
      </div>

      <div className="overflow-y-auto p-3 flex flex-col gap-2">
        {hasTactics && (
          <Fpo className="min-h-[40px]">
            Flow — turn order, active, round, ~40px
          </Fpo>
        )}
        {hasEncounter && (
          <div className="flex items-center gap-2 px-1 pt-1">
            <span className="text-[10px] uppercase tracking-[0.14em] text-[#b8944a]">
              In conflict
            </span>
            <span className="flex-1 h-px bg-[#2c3428]" />
          </div>
        )}
        <Fpo className="min-h-[140px]">
          {hasTactics
            ? 'Roster — in-conflict rows, HP + conditions + reaction, ~160px'
            : 'Participants — in-conflict creatures, ~160px'}
        </Fpo>
        {hasTactics && (
          <Fpo className="min-h-[360px] flex-1">
            Actor — selected row expanded inline: A/Ms + actions + attacks +
            spells, ~500px
          </Fpo>
        )}
        {hasEncounter && (
          <div className="flex items-center gap-2 px-1 pt-1">
            <span className="text-[10px] uppercase tracking-[0.14em] text-(--lair-text-dim)">
              Non-conflicting
            </span>
            <span className="flex-1 h-px bg-[#2c3428]" />
          </div>
        )}
        <Fpo className={hasTactics ? 'min-h-[80px]' : 'min-h-[160px] flex-1'}>
          {hasEncounter
            ? 'Participants — non-conflicting + out of game, ~120px'
            : 'Participants — all session creatures + group, ~340px'}
        </Fpo>
      </div>

      <div className="border-l border-[#2c3428] bg-[#151c12] p-3 overflow-y-auto flex flex-col gap-2">
        {hasTactics ? (
          <>
            <Fpo className="min-h-[80px]">
              Targets — AC + saves + conditions, ~80px
            </Fpo>
            <Fpo className="min-h-[120px]">
              Interrupts — passives + reactions, ~120px
            </Fpo>
            <Fpo className="min-h-[84px]">
              Conflict Sources — compact, ~84px
            </Fpo>
            <Fpo className="min-h-[100px] flex-1">
              Reference — pinned statblock preview
            </Fpo>
          </>
        ) : (
          <>
            {hasEncounter && (
              <Fpo className="min-h-[84px]">
                Conflict Sources — 2-3, status + opposition, ~84px
              </Fpo>
            )}
            {hasEncounter && (
              <Fpo className="min-h-[60px]">
                Encounter A/M Highlights — ~60px
              </Fpo>
            )}
            <Fpo className="min-h-[180px]">
              Linked Scenes — 3-4 cards, ~260px
            </Fpo>
            <Fpo className="min-h-[120px] flex-1">
              Map / Atmosphere Image — ~200px
            </Fpo>
          </>
        )}
      </div>

      <div className="col-span-3 border-t border-[#2c3428] bg-[#172015] px-4 py-1.5 flex gap-2 items-center">
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

import {useState} from 'react';
import Fpo from '../fpo.tsx';

type LayoutMode = 'exploration' | 'encounter' | 'tactics';

export type LayoutHProps = {
  mode: LayoutMode;
};

export default function LayoutH({mode: initialMode}: LayoutHProps) {
  const [mode, setMode] = useState<LayoutMode>(initialMode);
  const hasEncounter = mode === 'encounter' || mode === 'tactics';
  const hasTactics = mode === 'tactics';

  return (
    <div className="h-screen bg-[#12170f] text-(--lair-text) font-(--lair-font) overflow-hidden grid grid-rows-[auto_1fr_auto]">
      <div className="border-b border-[#2c3428] bg-[#172015] px-5 py-2 flex items-center gap-4">
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
        <Fpo className="min-h-[28px] w-[120px]">Room-Start Reminders</Fpo>
      </div>

      <div className="grid grid-cols-[180px_1fr_280px] overflow-hidden">
        <div className="border-r border-[#2c3428] bg-[#151c12] p-3 overflow-y-auto flex flex-col gap-2">
          <Fpo className="min-h-[120px]">Triggers — compact set, ~150px</Fpo>
          <Fpo className="min-h-[150px]">Linked Scenes — 3-4 cards, ~260px</Fpo>
          <Fpo className="min-h-[100px] flex-1">
            Map / Atmosphere Image — ~150px
          </Fpo>
        </div>

        <div className="overflow-y-auto flex justify-center px-6 py-5">
          <div className="w-full max-w-[660px] flex flex-col gap-4">
            <Fpo className="min-h-[180px]">
              Room Prompts — 4-5 bullets at reading width, ~200px
            </Fpo>
            <Fpo className="min-h-[80px]">
              Flavor Text — read-aloud blockquote, ~80px
            </Fpo>
            {hasEncounter && (
              <Fpo className="min-h-[100px]">
                Conflict Sources — 2-3, status + opposition + reasons, ~100px
              </Fpo>
            )}
            {hasEncounter && (
              <Fpo className="min-h-[60px]">
                Encounter A/M Highlights — ~60px
              </Fpo>
            )}
            <Fpo className="min-h-[140px]">
              Triggers — expanded skill checks + trap detail, ~200px
            </Fpo>
          </div>
        </div>

        <div className="border-l border-[#2c3428] bg-[#151c12] p-3 overflow-y-auto flex flex-col gap-2">
          {hasEncounter && (
            <Fpo className="min-h-[48px]">
              Grouping — In conflict / Non-conflicting / Out
            </Fpo>
          )}
          <Fpo className="min-h-[280px] flex-1">
            Participants — 6 creatures + 1 group, ~340px
          </Fpo>
        </div>
      </div>

      {hasTactics && (
        <div className="border-t-2 border-[#8b6c3e] bg-[#151c12] px-3 py-2.5 h-[280px] flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#b8944a] font-semibold">
              Tactical Tray
            </span>
            <Fpo className="min-h-[28px] flex-1">
              Flow — turn order, active, round, ~28px horizontal
            </Fpo>
          </div>
          <div className="grid grid-cols-[280px_1fr_220px_220px] gap-3 flex-1 overflow-hidden">
            <Fpo className="min-h-[160px]">
              Roster — initiative-sorted, HP + conditions, ~200px
            </Fpo>
            <Fpo className="min-h-[160px]">
              Actor — A/Ms + actions + attacks + spells, ~500px (scroll)
            </Fpo>
            <Fpo className="min-h-[160px]">
              Targets — AC + saves + conditions, ~80px
            </Fpo>
            <Fpo className="min-h-[160px]">
              Interrupts — passives + reactions, ~120px
            </Fpo>
          </div>
        </div>
      )}

      <div className="border-t border-[#2c3428] bg-[#172015] px-4 py-1.5 flex gap-2 items-center">
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

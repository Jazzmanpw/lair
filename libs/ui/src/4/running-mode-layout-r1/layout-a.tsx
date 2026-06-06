import {useState} from 'react';
import Fpo from '../fpo.tsx';

type LayoutMode = 'exploration' | 'encounter' | 'tactics';

export type LayoutAProps = {
  mode: LayoutMode;
};

export default function LayoutA({mode: initialMode}: LayoutAProps) {
  const [mode, setMode] = useState<LayoutMode>(initialMode);
  const hasEncounter = mode === 'encounter' || mode === 'tactics';
  const hasTactics = mode === 'tactics';

  return (
    <div className="h-screen bg-[#12170f] text-(--lair-text) font-(--lair-font) overflow-hidden grid grid-rows-[auto_1fr] grid-cols-[240px_1fr_200px]">
      {/* ── Top strip: scene header + room prompts (spans all columns) ── */}
      <div className="col-span-3 border-b border-[#2c3428] bg-[#172015] px-5 py-3 grid grid-cols-[240px_1fr_200px] gap-4">
        <Fpo className="min-h-[60px]">
          Scene Header — title + breadcrumb, ~60px
        </Fpo>
        <div className="flex flex-col gap-2">
          <Fpo className="min-h-[120px] flex-1">
            Room Prompts — 4-5 bullets, ~160px
          </Fpo>
          <Fpo className="min-h-[60px]">Flavor Text — 2-4 sentences, ~70px</Fpo>
        </div>
        <Fpo className="min-h-[28px] self-start">
          Room-Start Reminders — 0-1 items, ~28px
        </Fpo>
      </div>

      {/* ── Left column: participants ── */}
      <div className="border-r border-[#2c3428] bg-[#151c12] p-3 overflow-y-auto flex flex-col gap-2">
        {hasEncounter && (
          <Fpo className="min-h-[60px]">
            Participant Grouping — In conflict / Non-conflicting / Out, ~60px
            headers
          </Fpo>
        )}
        <Fpo className="min-h-[280px] flex-1">
          Participants — 6 creatures + 1 group, ~340px
        </Fpo>
        {hasTactics && (
          <Fpo className="min-h-[40px]">
            Flow — turn order, active, round, ~40px horizontal
          </Fpo>
        )}
      </div>

      {/* ── Center: main content area ── */}
      <div className="overflow-y-auto p-4 flex flex-col gap-3">
        {hasEncounter && (
          <div className="flex gap-3">
            <Fpo className="min-h-[30px] flex-1">
              Dramatic Question — 1 line, ~30px
            </Fpo>
            <Fpo className="min-h-[30px] w-[120px]">Threat Level — badge</Fpo>
          </div>
        )}
        {hasEncounter && (
          <Fpo className="min-h-[84px]">
            Conflict Sources — 2-3 sources, status + opposition, ~84px
          </Fpo>
        )}
        <Fpo className="min-h-[120px]">
          Triggers — skill checks + traps + nearby + prepared setups, ~150px
          compact
        </Fpo>
        {hasEncounter && (
          <Fpo className="min-h-[60px]">
            Encounter A/M Highlights — relevance markers per conflict source,
            ~60px
          </Fpo>
        )}
        {hasTactics && (
          <>
            <Fpo className="min-h-[400px] flex-1">
              Actor — A/Ms + actions + attacks + spells, ~500px
            </Fpo>
            <div className="flex gap-3">
              <Fpo className="min-h-[80px] flex-1">
                Targets — AC + saves + conditions, ~80px
              </Fpo>
              <Fpo className="min-h-[100px] flex-1">
                Interrupts — passives + reactions + reminders, ~120px
              </Fpo>
            </div>
          </>
        )}
      </div>

      {/* ── Right column: sidebar ── */}
      <div className="border-l border-[#2c3428] bg-[#151c12] p-3 overflow-y-auto flex flex-col gap-2">
        <Fpo className="min-h-[200px]">Linked Scenes — 3-4 cards, ~260px</Fpo>
        <Fpo className="min-h-[150px] flex-1">
          Map / Atmosphere Image — ~200px
        </Fpo>
      </div>

      {/* ── Mode switcher (prototype only) ── */}
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

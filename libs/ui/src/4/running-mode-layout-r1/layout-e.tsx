import {useState} from 'react';
import Fpo from '../fpo.tsx';

type LayoutMode = 'exploration' | 'encounter' | 'tactics';

export type LayoutEProps = {
  mode: LayoutMode;
};

export default function LayoutE({mode: initialMode}: LayoutEProps) {
  const [mode, setMode] = useState<LayoutMode>(initialMode);
  const hasEncounter = mode === 'encounter' || mode === 'tactics';
  const hasTactics = mode === 'tactics';

  return (
    <div className="h-screen bg-[#12170f] text-(--lair-text) font-(--lair-font) overflow-hidden flex flex-col">
      {/* ── Band 1: Scene header — always present ── */}
      <div className="shrink-0 border-b border-[#2c3428] bg-[#172015] px-5 py-2 flex items-center gap-4">
        <Fpo className="min-h-[36px] w-[300px]">
          Scene Header — title + breadcrumb
        </Fpo>
        <Fpo className="min-h-[28px] w-[120px]">Room-Start Reminders</Fpo>
        <div className="flex-1" />
        <Fpo className="min-h-[28px] w-[180px]">
          Linked Scenes — compact nav, 3-4 tabs
        </Fpo>
      </div>

      {/* ── Band 2: Encounter context — appears when encounter active ── */}
      {hasEncounter && (
        <div className="shrink-0 border-b border-[#2c3428] bg-[#1d231a] px-5 py-2 flex items-center gap-4">
          <Fpo className="min-h-[28px] flex-1">Dramatic Question — 1 line</Fpo>
          <Fpo className="min-h-[24px] w-[100px]">Threat Level</Fpo>
          <Fpo className="min-h-[60px] w-[300px]">
            Conflict Sources — compact row, 2-3 badges with status
          </Fpo>
        </div>
      )}

      {/* ── Band 3: Tactical bar — appears when tactics active ── */}
      {hasTactics && (
        <div className="shrink-0 border-b border-[#2c3428] bg-[#262e23] px-5 py-2 flex items-center gap-4">
          <Fpo className="min-h-[36px] flex-1">
            Flow — turn order horizontal, active highlighted, round counter
          </Fpo>
          <Fpo className="min-h-[36px] w-[200px]">
            Interrupts — compact reaction/passive badges
          </Fpo>
        </div>
      )}

      {/* ── Band 4: Main body — fills remaining space ── */}
      <div
        className={`flex-1 min-h-0 grid overflow-hidden ${
          hasTactics ? 'grid-cols-[1fr_1fr]' : 'grid-cols-[1fr_280px]'
        }`}
      >
        {/* Left: room content (exploration/encounter) or actor (tactics) */}
        <div className="overflow-y-auto p-4 flex flex-col gap-3">
          {hasTactics ? (
            <>
              <Fpo className="min-h-[400px] flex-1">
                Actor — A/Ms + actions + attacks + spells + speed, ~500px
              </Fpo>
              <Fpo className="min-h-[80px]">
                Targets — AC + saves + conditions, ~80px
              </Fpo>
            </>
          ) : (
            <>
              <Fpo className="min-h-[140px]">
                Room Prompts — 4-5 bullets, ~160px
              </Fpo>
              <Fpo className="min-h-[60px]">
                Flavor Text — 2-4 sentences, ~70px
              </Fpo>
              <Fpo className="min-h-[120px]">
                Triggers — skill checks + traps + nearby + setups, ~150px
              </Fpo>
              {hasEncounter && (
                <Fpo className="min-h-[60px]">
                  Encounter A/M Highlights — relevance markers, ~60px
                </Fpo>
              )}
              <Fpo className="min-h-[150px] flex-1">
                Map / Atmosphere Image — ~200px
              </Fpo>
            </>
          )}
        </div>

        {/* Right: participants (always) — narrows in exploration, widens in tactics */}
        <div className="border-l border-[#2c3428] bg-[#151c12] p-3 overflow-y-auto flex flex-col gap-2">
          {hasEncounter && <Fpo className="min-h-[20px]">In conflict</Fpo>}
          <Fpo className="min-h-[280px] flex-1">
            Participants — 6 creatures + 1 group, ~340px (roster in tactics)
          </Fpo>
          {hasEncounter && (
            <>
              <Fpo className="min-h-[20px]">Non-conflicting</Fpo>
              <Fpo className="min-h-[40px]">Bystanders</Fpo>
            </>
          )}
          {hasTactics && (
            <>
              <div className="border-t border-[#2c3428] my-1" />
              <Fpo className="min-h-[120px]">
                Room Prompts — condensed reference, ~120px
              </Fpo>
              <Fpo className="min-h-[80px]">Triggers — compact, ~100px</Fpo>
            </>
          )}
        </div>
      </div>

      {/* ── Mode switcher ── */}
      <div className="shrink-0 border-t border-[#2c3428] bg-[#172015] px-4 py-1.5 flex gap-2 items-center">
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

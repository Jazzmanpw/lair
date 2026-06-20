import {useState} from 'react';
import Fpo from '../fpo.tsx';

type LayoutMode = 'exploration' | 'encounter' | 'tactics';

export type LayoutDProps = {
  mode: LayoutMode;
};

export default function LayoutD({mode: initialMode}: LayoutDProps) {
  const [mode, setMode] = useState<LayoutMode>(initialMode);
  const hasEncounter = mode === 'encounter' || mode === 'tactics';
  const hasTactics = mode === 'tactics';

  return (
    <div className="h-screen bg-[#12170f] text-(--lair-text) font-(--lair-font) overflow-hidden grid grid-rows-[auto_1fr_auto]">
      {/* ── Header: scene identity ── */}
      <div className="border-b border-[#2c3428] bg-[#172015] px-5 py-2">
        <Fpo className="min-h-[36px]">
          Scene Header — title + breadcrumb, ~50px
        </Fpo>
      </div>

      {/* ── Dashboard grid ── */}
      <div
        className={`grid gap-2 p-2 overflow-hidden ${
          hasTactics
            ? 'grid-cols-3 grid-rows-[1fr_1fr]'
            : hasEncounter
              ? 'grid-cols-[1fr_1fr_240px] grid-rows-[auto_1fr]'
              : 'grid-cols-[1fr_1fr_240px] grid-rows-[1fr_1fr]'
        }`}
      >
        {/* Tile: Room Prompts + Flavor */}
        <div
          className={`bg-[#151c12] rounded border border-[#2c3428] p-3 overflow-y-auto flex flex-col gap-2 ${
            hasTactics ? '' : 'row-span-1'
          }`}
        >
          <Fpo className="min-h-[140px] flex-1">
            Room Prompts — 4-5 bullets, ~160px
          </Fpo>
          <Fpo className="min-h-[60px]">Flavor Text — ~70px</Fpo>
          <Fpo className="min-h-[28px]">Room-Start Reminders</Fpo>
        </div>

        {/* Tile: Participants */}
        <div
          className={`bg-[#151c12] rounded border border-[#2c3428] p-3 overflow-y-auto flex flex-col gap-2 ${
            hasTactics ? '' : hasEncounter ? 'row-span-2' : ''
          }`}
        >
          {hasEncounter && (
            <Fpo className="min-h-[48px]">
              Grouping — In conflict / Non-conflicting
            </Fpo>
          )}
          <Fpo className="min-h-[280px] flex-1">
            Participants — 6 creatures + 1 group, ~340px
          </Fpo>
        </div>

        {/* Tile: Sidebar / Linked Scenes (non-tactics) or Flow (tactics) */}
        <div
          className={`bg-[#151c12] rounded border border-[#2c3428] p-3 overflow-y-auto flex flex-col gap-2 ${
            hasTactics ? '' : 'row-span-2'
          }`}
        >
          {hasTactics ? (
            <>
              <Fpo className="min-h-[36px]">
                Flow — turn order, active, round
              </Fpo>
              <Fpo className="min-h-[100px] flex-1">
                Interrupts — passives + reactions, ~120px
              </Fpo>
            </>
          ) : (
            <>
              <Fpo className="min-h-[200px]">
                Linked Scenes — 3-4 cards, ~260px
              </Fpo>
              <Fpo className="min-h-[150px] flex-1">
                Map / Atmosphere Image — ~200px
              </Fpo>
            </>
          )}
        </div>

        {/* Tile: Triggers (exploration) or Encounter Context (encounter) or Actor (tactics) */}
        <div className="bg-[#151c12] rounded border border-[#2c3428] p-3 overflow-y-auto flex flex-col gap-2">
          {hasTactics ? (
            <Fpo className="min-h-[400px] flex-1">
              Actor — A/Ms + actions + attacks + spells, ~500px
            </Fpo>
          ) : (
            <>
              <Fpo className="min-h-[120px] flex-1">
                Triggers — skill checks + traps + nearby + setups, ~150px
              </Fpo>
              {hasEncounter && (
                <Fpo className="min-h-[60px]">
                  Encounter A/M Highlights — ~60px
                </Fpo>
              )}
            </>
          )}
        </div>

        {/* Tile: Encounter context (row 2 center) or Targets (tactics) */}
        {hasEncounter && (
          <div className="bg-[#151c12] rounded border border-[#2c3428] p-3 overflow-y-auto flex flex-col gap-2">
            {hasTactics ? (
              <Fpo className="min-h-[80px] flex-1">
                Targets — AC + saves + conditions, ~80px
              </Fpo>
            ) : (
              <>
                <Fpo className="min-h-[28px]">Dramatic Question — 1 line</Fpo>
                <Fpo className="min-h-[84px] flex-1">
                  Conflict Sources — 2-3, ~84px
                </Fpo>
                <Fpo className="min-h-[24px]">Threat Level</Fpo>
              </>
            )}
          </div>
        )}

        {/* Extra tile for non-encounter exploration: map fills bottom-right */}
        {!hasEncounter && (
          <div className="bg-[#151c12] rounded border border-[#2c3428] p-3 overflow-y-auto">
            <Fpo className="min-h-[150px] h-full">
              Map / Atmosphere Image — ~200px (alt placement)
            </Fpo>
          </div>
        )}

        {/* Tactics: linked scenes + triggers compressed */}
        {hasTactics && (
          <div className="bg-[#151c12] rounded border border-[#2c3428] p-3 overflow-y-auto flex flex-col gap-2">
            <Fpo className="min-h-[84px]">
              Conflict Sources — compact, ~84px
            </Fpo>
            <Fpo className="min-h-[80px] flex-1">
              Triggers — compact, ~100px
            </Fpo>
          </div>
        )}
      </div>

      {/* ── Mode switcher ── */}
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

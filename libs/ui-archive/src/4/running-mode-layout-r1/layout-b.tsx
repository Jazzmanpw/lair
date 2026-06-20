import {useState} from 'react';
import Fpo from '../fpo.tsx';

type LayoutMode = 'exploration' | 'encounter' | 'tactics';

export type LayoutBProps = {
  mode: LayoutMode;
};

export default function LayoutB({mode: initialMode}: LayoutBProps) {
  const [mode, setMode] = useState<LayoutMode>(initialMode);
  const hasEncounter = mode === 'encounter' || mode === 'tactics';
  const hasTactics = mode === 'tactics';

  return (
    <div className="h-screen bg-[#12170f] text-(--lair-text) font-(--lair-font) overflow-hidden grid grid-rows-[auto_1fr_auto]">
      {/* ── Compact header bar ── */}
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
          <Fpo className="min-h-[24px] w-[120px]">Threat Level</Fpo>
        )}
        {hasTactics && (
          <Fpo className="min-h-[36px] w-[280px]">
            Flow — turn order horizontal, active + round
          </Fpo>
        )}
      </div>

      {/* ── Three-column body ── */}
      <div
        className={`grid overflow-hidden ${
          hasTactics ? 'grid-cols-[1fr_280px_1fr]' : 'grid-cols-[1fr_1fr_240px]'
        }`}
      >
        {/* Left column: scene context */}
        <div className="border-r border-[#2c3428] p-4 overflow-y-auto flex flex-col gap-3">
          <Fpo className="min-h-[140px]">
            Room Prompts — 4-5 bullets, ~160px
          </Fpo>
          <Fpo className="min-h-[60px]">Flavor Text — 2-4 sentences, ~70px</Fpo>
          <Fpo className="min-h-[28px]">Room-Start Reminders — 0-1 items</Fpo>
          <Fpo className="min-h-[120px]">
            Triggers — skill checks + traps + nearby + setups, ~150px
          </Fpo>
          {!hasTactics && (
            <Fpo className="min-h-[150px] flex-1">
              Map / Atmosphere Image — ~200px
            </Fpo>
          )}
        </div>

        {/* Center column: participants + encounter */}
        <div className="border-r border-[#2c3428] p-4 overflow-y-auto flex flex-col gap-3">
          {hasEncounter && (
            <Fpo className="min-h-[84px]">
              Conflict Sources — 2-3, status + opposition + reasons, ~84px
            </Fpo>
          )}
          {hasEncounter && (
            <Fpo className="min-h-[48px]">
              Participant Grouping Headers — In conflict / Non-conflicting
            </Fpo>
          )}
          <Fpo
            className={`${hasTactics ? 'min-h-[200px]' : 'min-h-[300px]'} flex-1`}
          >
            Participants — 6 creatures + 1 group, ~340px (roster in tactics)
          </Fpo>
        </div>

        {/* Right column: contextual */}
        <div className="p-4 overflow-y-auto flex flex-col gap-3">
          {hasTactics ? (
            <>
              <Fpo className="min-h-[400px] flex-1">
                Actor — A/Ms + actions + attacks + spells, ~500px
              </Fpo>
              <Fpo className="min-h-[80px]">
                Targets — AC + saves + conditions, ~80px
              </Fpo>
              <Fpo className="min-h-[100px]">
                Interrupts — passives + reactions + reminders, ~120px
              </Fpo>
            </>
          ) : (
            <>
              <Fpo className="min-h-[200px]">
                Linked Scenes — 3-4 cards, ~260px
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

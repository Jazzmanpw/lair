import {useState} from 'react';
import Fpo from '../fpo.tsx';

type LayoutMode = 'exploration' | 'encounter' | 'tactics';

export type LayoutCProps = {
  mode: LayoutMode;
};

export default function LayoutC({mode: initialMode}: LayoutCProps) {
  const [mode, setMode] = useState<LayoutMode>(initialMode);
  const hasEncounter = mode === 'encounter' || mode === 'tactics';
  const hasTactics = mode === 'tactics';

  return (
    <div className="h-screen bg-[#12170f] text-(--lair-text) font-(--lair-font) overflow-hidden grid grid-rows-[auto_auto_1fr_auto] grid-cols-[180px_1fr_200px]">
      {/* ── Row 1: Scene header (spans all) ── */}
      <div className="col-span-3 border-b border-[#2c3428] bg-[#172015] px-5 py-2 flex items-center gap-4">
        <Fpo className="min-h-[36px] flex-1">
          Scene Header — title + breadcrumb
        </Fpo>
        <Fpo className="min-h-[28px] w-[100px]">Room-Start Reminders</Fpo>
      </div>

      {/* ── Row 2: Encounter context bar (conditional, spans all) ── */}
      {hasEncounter && (
        <div className="col-span-3 border-b border-[#2c3428] bg-[#1d231a] px-5 py-2 flex items-center gap-4">
          <Fpo className="min-h-[28px] flex-1">Dramatic Question — 1 line</Fpo>
          <Fpo className="min-h-[28px] w-[100px]">Threat Level</Fpo>
          {hasTactics && (
            <Fpo className="min-h-[36px] w-[260px]">
              Flow — turn order, active, round
            </Fpo>
          )}
        </div>
      )}

      {/* Row 2 placeholder when no encounter — keep grid consistent */}
      {!hasEncounter && <div className="col-span-3" />}

      {/* ── Left rail: participants ── */}
      <div className="border-r border-[#2c3428] bg-[#151c12] p-2 overflow-y-auto flex flex-col gap-1.5">
        {hasEncounter && <Fpo className="min-h-[20px]">In conflict</Fpo>}
        <Fpo
          className={`${hasTactics ? 'min-h-[160px]' : 'min-h-[240px]'} flex-1`}
        >
          Participants — compact roster, 6+1, ~280px
        </Fpo>
        {hasEncounter && (
          <>
            <Fpo className="min-h-[20px]">Non-conflicting</Fpo>
            <Fpo className="min-h-[40px]">Bystanders — 0-2</Fpo>
          </>
        )}
      </div>

      {/* ── Center: focus panel ── */}
      <div className="overflow-y-auto p-4 flex flex-col gap-3">
        {hasTactics ? (
          <>
            <Fpo className="min-h-[400px] flex-1">
              Actor — A/Ms + actions + attacks + spells + speed, ~500px
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
        ) : (
          <>
            <Fpo className="min-h-[140px]">
              Room Prompts — 4-5 bullets, ~160px
            </Fpo>
            <Fpo className="min-h-[60px]">
              Flavor Text — 2-4 sentences, ~70px
            </Fpo>
            {hasEncounter && (
              <Fpo className="min-h-[84px]">
                Conflict Sources — 2-3, status + opposition, ~84px
              </Fpo>
            )}
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

      {/* ── Right rail: reference ── */}
      <div className="border-l border-[#2c3428] bg-[#151c12] p-2 overflow-y-auto flex flex-col gap-2">
        {hasTactics && (
          <Fpo className="min-h-[84px]">Conflict Sources — compact, ~84px</Fpo>
        )}
        <Fpo className="min-h-[200px]">Linked Scenes — 3-4 cards, ~260px</Fpo>
        {hasTactics && (
          <Fpo className="min-h-[120px]">Room Prompts — condensed, ~120px</Fpo>
        )}
        <Fpo className="min-h-[120px] flex-1">
          Map / Atmosphere Image — ~150px
        </Fpo>
      </div>

      {/* ── Mode switcher ── */}
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

import {useState} from 'react';
import Fpo from '../fpo.tsx';

type LayoutMode = 'exploration' | 'encounter' | 'tactics';

export type LayoutFProps = {
  mode: LayoutMode;
};

export default function LayoutF({mode: initialMode}: LayoutFProps) {
  const [mode, setMode] = useState<LayoutMode>(initialMode);
  const [overlayMinimized, setOverlayMinimized] = useState(false);
  const hasEncounter = mode === 'encounter' || mode === 'tactics';
  const hasTactics = mode === 'tactics';

  return (
    <div className="h-screen bg-[#12170f] text-(--lair-text) font-(--lair-font) overflow-hidden grid grid-rows-[auto_1fr_auto] relative">
      <div className="border-b border-[#2c3428] bg-[#172015] px-5 py-2 flex items-center gap-4">
        <Fpo className="min-h-[36px] w-[280px]">
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
        <Fpo className="min-h-[28px] w-[120px]">Room-Start Reminders</Fpo>
      </div>

      <div className="grid grid-cols-[1fr_300px] overflow-hidden">
        <div className="border-r border-[#2c3428] p-4 overflow-y-auto flex flex-col gap-3">
          <Fpo className="min-h-[160px]">
            Room Prompts — 4-5 bullets, ~160px
          </Fpo>
          <Fpo className="min-h-[70px]">Flavor Text — 2-4 sentences, ~70px</Fpo>
          {hasEncounter && (
            <Fpo className="min-h-[84px]">
              Conflict Sources — 2-3, status + opposition + reasons, ~84px
            </Fpo>
          )}
          <Fpo className="min-h-[140px] flex-1">
            Triggers — skill checks + traps + nearby + setups, ~150px
          </Fpo>
        </div>

        <div className="bg-[#151c12] p-3 overflow-y-auto flex flex-col gap-3">
          {hasEncounter && (
            <Fpo className="min-h-[48px]">
              Grouping — In conflict / Non-conflicting / Out
            </Fpo>
          )}
          <Fpo className="min-h-[280px]">
            Participants — 6 creatures + 1 group, ~340px
          </Fpo>
          {hasEncounter && (
            <Fpo className="min-h-[60px]">Encounter A/M Highlights — ~60px</Fpo>
          )}
          <Fpo className="min-h-[120px] flex-1">
            Linked Scenes — 3-4 cards, ~260px
          </Fpo>
        </div>
      </div>

      {hasTactics && !overlayMinimized && (
        <div className="absolute inset-0 top-[53px] bottom-[37px] z-20 flex">
          <button
            type="button"
            aria-label="Minimize tactical overlay"
            onClick={() => setOverlayMinimized(true)}
            className="flex-1 bg-black/55 cursor-pointer border-0"
          />
          <div className="w-[64%] min-w-[640px] bg-[#151c12] border-l-2 border-[#8b6c3e] shadow-2xl flex flex-col">
            <div className="flex items-center justify-between border-b border-[#2c3428] bg-[#172015] px-4 py-2">
              <span className="text-[11px] uppercase tracking-[0.14em] text-[#b8944a] font-semibold">
                Tactical Overlay
              </span>
              <button
                type="button"
                onClick={() => setOverlayMinimized(true)}
                className="text-[11px] px-2 py-0.5 rounded cursor-pointer font-(--lair-font) border border-[#384236] text-(--lair-text-dim) hover:border-[#8b6c3e]"
              >
                Minimize
              </button>
            </div>
            <div className="p-3 overflow-y-auto flex flex-col gap-3 flex-1">
              <Fpo className="min-h-[40px]">
                Flow — turn order, active, round, ~40px
              </Fpo>
              <div className="grid grid-cols-[260px_1fr] gap-3 flex-1">
                <Fpo className="min-h-[280px]">
                  Roster — initiative-sorted, HP + conditions, ~320px
                </Fpo>
                <Fpo className="min-h-[400px]">
                  Actor — A/Ms + actions + attacks + spells + speed, ~500px
                </Fpo>
              </div>
              <div className="flex gap-3">
                <Fpo className="min-h-[80px] flex-1">
                  Targets — AC + saves + conditions, ~80px
                </Fpo>
                <Fpo className="min-h-[100px] flex-1">
                  Interrupts — passives + reactions + reminders, ~120px
                </Fpo>
              </div>
            </div>
          </div>
        </div>
      )}

      {hasTactics && overlayMinimized && (
        <div className="absolute right-4 bottom-[45px] z-20 flex items-center gap-3 bg-[#172015] border border-[#8b6c3e] rounded px-3 py-1.5 shadow-xl">
          <Fpo className="min-h-[28px] w-[320px]">
            Flow — turn order strip (collapsed), ~28px
          </Fpo>
          <button
            type="button"
            onClick={() => setOverlayMinimized(false)}
            className="text-[11px] px-2 py-0.5 rounded cursor-pointer font-(--lair-font) border border-[#8b6c3e] text-[#b8944a]"
          >
            Restore
          </button>
        </div>
      )}

      <div className="border-t border-[#2c3428] bg-[#172015] px-4 py-1.5 flex gap-2 items-center z-30">
        <span className="text-[10px] uppercase tracking-[0.1em] text-(--lair-text-dim) mr-2">
          Mode
        </span>
        {(['exploration', 'encounter', 'tactics'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setOverlayMinimized(false);
            }}
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

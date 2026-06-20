import {useState} from 'react';
import Fpo from '../fpo.tsx';

type LayoutMode = 'exploration' | 'encounter' | 'tactics';

export type LayoutIProps = {
  mode: LayoutMode;
};

export default function LayoutI({mode: initialMode}: LayoutIProps) {
  const [mode, setMode] = useState<LayoutMode>(initialMode);
  const hasEncounter = mode === 'encounter' || mode === 'tactics';
  const hasTactics = mode === 'tactics';

  return (
    <div className="h-screen bg-[#12170f] text-(--lair-text) font-(--lair-font) overflow-hidden grid grid-rows-[auto_1fr_auto]">
      <div className="border-b border-[#2c3428] bg-[#172015] px-5 py-2 flex items-center gap-4">
        <Fpo className="min-h-[36px] flex-1">
          Scene Header — title + breadcrumb
        </Fpo>
        <Fpo className="min-h-[28px] w-[120px]">Room-Start Reminders</Fpo>
      </div>

      <div
        className={`grid overflow-hidden ${
          hasTactics ? 'grid-cols-[36%_1fr]' : 'grid-cols-[1fr_1fr]'
        }`}
      >
        <div className="overflow-hidden flex flex-col">
          <div className="px-4 pt-2 pb-1 text-[10px] uppercase tracking-[0.16em] text-(--lair-text-dim) border-b border-[#2c3428] bg-[#151c12]">
            Prep / Location Plane
          </div>
          <div className="border-r border-[#2c3428] bg-[#151c12] p-4 overflow-y-auto flex flex-col gap-3 flex-1">
            <Fpo className="min-h-[160px]">
              Room Prompts — 4-5 bullets, ~160px
            </Fpo>
            <Fpo className="min-h-[70px]">Flavor Text — ~70px</Fpo>
            <Fpo className="min-h-[120px]">
              Triggers — skill checks + traps + nearby + setups, ~150px
            </Fpo>
            {!hasTactics && (
              <Fpo className="min-h-[140px]">
                Linked Scenes — 3-4 cards, ~260px
              </Fpo>
            )}
            <Fpo className="min-h-[100px] flex-1">
              Map / Atmosphere Image — ~200px
            </Fpo>
          </div>
        </div>

        <div className="overflow-hidden flex flex-col">
          <div className="px-4 pt-2 pb-1 text-[10px] uppercase tracking-[0.16em] text-[#b8944a] border-b border-[#2c3428] bg-[#172015]">
            Session / Encounter Plane
          </div>
          <div className="p-4 overflow-y-auto flex flex-col gap-3 flex-1">
            {hasEncounter && (
              <div className="flex gap-3">
                <Fpo className="min-h-[28px] flex-1">
                  Dramatic Question — 1 line, ~28px
                </Fpo>
                <Fpo className="min-h-[28px] w-[110px]">Threat Level</Fpo>
              </div>
            )}
            {hasEncounter && (
              <Fpo className="min-h-[84px]">
                Conflict Sources — 2-3, status + opposition + reasons, ~84px
              </Fpo>
            )}
            {hasTactics && (
              <Fpo className="min-h-[40px]">
                Flow — turn order, active, round, ~40px
              </Fpo>
            )}
            <div
              className={
                hasTactics
                  ? 'grid grid-cols-[280px_1fr] gap-3 flex-1'
                  : 'flex flex-col gap-3 flex-1'
              }
            >
              <Fpo
                className={
                  hasTactics ? 'min-h-[280px]' : 'min-h-[300px] flex-1'
                }
              >
                {hasTactics
                  ? 'Roster — initiative-sorted, HP + conditions, ~320px'
                  : 'Participants — 6 creatures + 1 group, grouped by relevance, ~340px'}
              </Fpo>
              {hasTactics && (
                <div className="flex flex-col gap-3">
                  <Fpo className="min-h-[360px] flex-1">
                    Actor — A/Ms + actions + attacks + spells + speed, ~500px
                  </Fpo>
                  <div className="flex gap-3">
                    <Fpo className="min-h-[80px] flex-1">
                      Targets — AC + saves, ~80px
                    </Fpo>
                    <Fpo className="min-h-[80px] flex-1">
                      Interrupts — reactions, ~120px
                    </Fpo>
                  </div>
                </div>
              )}
            </div>
            {hasEncounter && !hasTactics && (
              <Fpo className="min-h-[60px]">
                Encounter A/M Highlights — ~60px
              </Fpo>
            )}
          </div>
        </div>
      </div>

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

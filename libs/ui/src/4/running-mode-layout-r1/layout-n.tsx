import {useState} from 'react';
import Fpo from '../fpo.tsx';

type LayoutMode = 'exploration' | 'encounter' | 'tactics';

export type LayoutNProps = {
  mode: LayoutMode;
};

export default function LayoutN({mode: initialMode}: LayoutNProps) {
  const [mode, setMode] = useState<LayoutMode>(initialMode);
  const hasEncounter = mode === 'encounter' || mode === 'tactics';
  const hasTactics = mode === 'tactics';

  return (
    <div className="h-screen bg-[#12170f] text-(--lair-text) font-(--lair-font) overflow-hidden grid grid-rows-[auto_auto_1fr_auto]">
      <div className="border-b border-[#2c3428] bg-[#172015] px-5 py-2 flex items-center gap-4">
        <Fpo className="min-h-[42px] w-[320px]">
          Scene Header - title + breadcrumb, ~60px
        </Fpo>
        <Fpo className="min-h-[42px] flex-1">
          Room Prompts - always immediate summary, 4-5 bullets, ~160px
        </Fpo>
        <Fpo className="min-h-[42px] w-[180px]">Room-Start Reminders</Fpo>
      </div>

      <div className="border-b border-[#2c3428] bg-[#151c12] px-5 py-2 flex gap-2">
        <Fpo className="min-h-[28px] flex-1">
          Tab: Run - room prompts + triggers
        </Fpo>
        <Fpo className="min-h-[28px] flex-1">
          Tab: People - participants + A/M
        </Fpo>
        <Fpo className="min-h-[28px] flex-1">
          Tab: Threats - conflict + prepared setups
        </Fpo>
        <Fpo className="min-h-[28px] flex-1">
          Tab: Reference - map + linked scenes
        </Fpo>
      </div>

      <div
        className={`min-h-0 grid overflow-hidden ${hasTactics ? 'grid-cols-[280px_1fr_360px]' : 'grid-cols-[280px_1fr_280px]'}`}
      >
        <div className="border-r border-[#2c3428] bg-[#151c12] p-3 overflow-y-auto flex flex-col gap-3">
          <Fpo className="min-h-[150px]">
            Triggers - compact index, skill/trap/nearby/setup, ~150px
          </Fpo>
          <Fpo className="min-h-[260px] flex-1">
            Linked Scenes - 3-4 cards, ~260px
          </Fpo>
          <Fpo className="min-h-[120px]">
            Map / Atmosphere Image - thumbnail reference
          </Fpo>
        </div>

        <div className="p-4 overflow-y-auto flex flex-col gap-3">
          {hasTactics ? (
            <>
              <Fpo className="min-h-[48px]">
                Flow - turn order + active + round, horizontal
              </Fpo>
              <Fpo className="min-h-[430px] flex-1">
                Actor Workbench - A/Ms + actions + attacks + spells, ~500px
              </Fpo>
              <div className="grid grid-cols-[1fr_1fr] gap-3">
                <Fpo className="min-h-[90px]">
                  Targets - resolver-facing defenses, ~80px
                </Fpo>
                <Fpo className="min-h-[130px]">
                  Interrupts - cross-turn reminders, ~120px
                </Fpo>
              </div>
            </>
          ) : (
            <>
              <Fpo className="min-h-[80px]">
                Flavor Text - read-aloud block, ~70px
              </Fpo>
              <Fpo className="min-h-[220px] flex-1">
                Active Tab Workbench - selected detail without changing shell
              </Fpo>
              {hasEncounter && (
                <div className="grid grid-cols-[1fr_1fr] gap-3">
                  <Fpo className="min-h-[32px]">Dramatic Question - 1 line</Fpo>
                  <Fpo className="min-h-[90px]">
                    Conflict Sources - 2-3, ~84px
                  </Fpo>
                </div>
              )}
            </>
          )}
        </div>

        <div className="border-l border-[#2c3428] bg-[#151c12] p-3 overflow-y-auto flex flex-col gap-3">
          {hasEncounter && (
            <Fpo className="min-h-[60px]">
              Grouping - In conflict / Non-conflicting / Out
            </Fpo>
          )}
          <Fpo className="min-h-[320px] flex-1">
            Participants - 6 creatures + 1 group, ~340px
          </Fpo>
          {hasEncounter && (
            <Fpo className="min-h-[90px]">
              Encounter A/M Highlights - markers + reason links
            </Fpo>
          )}
          {hasTactics && (
            <Fpo className="min-h-[160px]">
              Roster - initiative order ledger, ~240px
            </Fpo>
          )}
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
            className={`text-[11px] px-2 py-0.5 rounded cursor-pointer font-(--lair-font) border ${mode === m ? 'bg-[#262e23] border-[#8b6c3e] text-[#b8944a]' : 'bg-transparent border-[#2c3428] text-(--lair-text-dim) hover:border-[#384236]'}`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}

import {useState} from 'react';
import Fpo from '../fpo.tsx';

type LayoutMode = 'exploration' | 'encounter' | 'tactics';

export type LayoutMProps = {
  mode: LayoutMode;
};

export default function LayoutM({mode: initialMode}: LayoutMProps) {
  const [mode, setMode] = useState<LayoutMode>(initialMode);
  const hasEncounter = mode === 'encounter' || mode === 'tactics';
  const hasTactics = mode === 'tactics';

  return (
    <div className="h-screen bg-[#12170f] text-(--lair-text) font-(--lair-font) overflow-hidden flex flex-col">
      <div className="shrink-0 border-b border-[#2c3428] bg-[#172015] px-5 py-2 grid grid-cols-[300px_1fr_220px] gap-4">
        <Fpo className="min-h-[44px]">Scene Header - title + breadcrumb</Fpo>
        {hasEncounter ? (
          <Fpo className="min-h-[44px]">
            Dramatic Question + Threat Level - 1 line + badge
          </Fpo>
        ) : (
          <Fpo className="min-h-[44px]">
            Room-Start Reminders - 0-1 items, ~28px
          </Fpo>
        )}
        <Fpo className="min-h-[44px]">
          Linked Scenes - 3-4 cards, ~260px in drawer
        </Fpo>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-[320px_1fr_360px] grid-rows-[1fr_210px] overflow-hidden">
        <div className="row-span-2 border-r border-[#2c3428] bg-[#151c12] p-3 overflow-y-auto flex flex-col gap-3">
          {hasEncounter && (
            <Fpo className="min-h-[56px]">
              Grouping Headers - conflict relevance, ~60px
            </Fpo>
          )}
          <Fpo className="min-h-[320px] flex-1">
            Participants - 6 creatures + 1 group, ~340px
          </Fpo>
          {hasTactics && (
            <Fpo className="min-h-[160px]">
              Interrupts - reactions + passives, ~120px
            </Fpo>
          )}
        </div>

        <div className="relative overflow-hidden bg-[#11160f]">
          <Fpo className="absolute inset-4">
            Map / Atmosphere Table - primary spatial anchor, fills center
          </Fpo>
          <div className="absolute left-6 top-6 w-[330px] flex flex-col gap-2">
            <Fpo className="min-h-[140px]">
              Room Prompts - overlay card, 4-5 bullets, ~160px
            </Fpo>
            <Fpo className="min-h-[70px]">Flavor Text - read-aloud, ~70px</Fpo>
          </div>
          <div className="absolute bottom-6 left-6 right-6 grid grid-cols-[1fr_1fr] gap-3">
            <Fpo className="min-h-[120px]">
              Triggers - compact map-side cues, ~150px
            </Fpo>
            {hasEncounter ? (
              <Fpo className="min-h-[120px]">
                Conflict Sources - status + opposition, ~84px
              </Fpo>
            ) : (
              <Fpo className="min-h-[120px]">
                Nearby Areas - 2-4 linked scenes, ~260px detail elsewhere
              </Fpo>
            )}
          </div>
        </div>

        <div className="row-span-2 border-l border-[#2c3428] bg-[#151c12] p-3 overflow-y-auto flex flex-col gap-3">
          {hasTactics ? (
            <>
              <Fpo className="min-h-[48px]">
                Flow - active + round + turn strip
              </Fpo>
              <Fpo className="min-h-[420px] flex-1">
                Actor - A/Ms + actions + attacks + spells, ~500px
              </Fpo>
              <Fpo className="min-h-[90px]">
                Targets - AC + saves + conditions, ~80px
              </Fpo>
            </>
          ) : (
            <>
              {hasEncounter && (
                <Fpo className="min-h-[80px]">
                  Encounter A/M Highlights - relevance markers, ~60px
                </Fpo>
              )}
              <Fpo className="min-h-[260px]">
                A/M Surface Preview - grouped participant behavior, one-click
                lens, ~840px full
              </Fpo>
              <Fpo className="min-h-[180px] flex-1">
                Prepared Setups - 0-4 creature/group cues, compact rows
              </Fpo>
            </>
          )}
        </div>

        <div className="border-t border-[#2c3428] bg-[#1d231a] p-3 overflow-y-auto flex gap-3">
          <Fpo className="min-h-[150px] flex-[1.2]">
            Trigger Detail Tray - selected check/trap outcomes, 200-500px when
            expanded
          </Fpo>
          <Fpo className="min-h-[150px] flex-1">
            Room Reference Tray - reminders + linked scene previews
          </Fpo>
        </div>
      </div>

      <div className="shrink-0 border-t border-[#2c3428] bg-[#172015] px-4 py-1.5 flex gap-2 items-center">
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

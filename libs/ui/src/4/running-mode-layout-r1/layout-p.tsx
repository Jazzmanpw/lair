import {useState} from 'react';
import Fpo from '../fpo.tsx';

type LayoutMode = 'exploration' | 'encounter' | 'tactics';

export type LayoutPProps = {
  mode: LayoutMode;
};

export default function LayoutP({mode: initialMode}: LayoutPProps) {
  const [mode, setMode] = useState<LayoutMode>(initialMode);
  const hasEncounter = mode === 'encounter' || mode === 'tactics';
  const hasTactics = mode === 'tactics';

  return (
    <div className="h-screen bg-[#12170f] text-(--lair-text) font-(--lair-font) overflow-hidden grid grid-rows-[auto_1fr_auto]">
      <div className="border-b border-[#2c3428] bg-[#172015] px-5 py-2 grid grid-cols-[300px_1fr_260px] gap-4">
        <Fpo className="min-h-[44px]">Scene Header - title + breadcrumb</Fpo>
        {hasEncounter ? (
          <Fpo className="min-h-[44px]">
            Dramatic Question - 1 sentence, immediate
          </Fpo>
        ) : (
          <Fpo className="min-h-[44px]">
            Room Prompts Summary - 4-5 bullets, ~160px
          </Fpo>
        )}
        <Fpo className="min-h-[44px]">
          Mode / Lens Shortcuts - A/M, tactics, reference
        </Fpo>
      </div>

      <div
        className={`min-h-0 grid overflow-hidden ${hasTactics ? 'grid-cols-[1fr_1.25fr]' : 'grid-cols-[1.15fr_1fr]'}`}
      >
        <div className="min-h-0 grid grid-rows-[auto_1fr] border-r border-[#2c3428] overflow-hidden">
          <div className="border-b border-[#2c3428] bg-[#151c12] p-3 grid grid-cols-[1fr_180px] gap-3">
            <Fpo className="min-h-[70px]">
              Prep Plane Header - room reminders + flavor, ~100px
            </Fpo>
            <Fpo className="min-h-[70px]">Linked Scene Count - 2-4 exits</Fpo>
          </div>
          <div className="min-h-0 grid grid-cols-[1fr_260px] overflow-hidden">
            <div className="p-4 overflow-y-auto flex flex-col gap-3">
              <Fpo className="min-h-[150px]">
                Room Prompts - full bullet set, ~160px
              </Fpo>
              <Fpo className="min-h-[150px]">
                Triggers - skill/trap/nearby/setup compact list, ~150px
              </Fpo>
              <Fpo className="min-h-[220px] flex-1">
                Map / Atmosphere Image - prep navigation anchor
              </Fpo>
            </div>
            <div className="border-l border-[#2c3428] bg-[#151c12] p-3 overflow-y-auto flex flex-col gap-3">
              <Fpo className="min-h-[260px]">
                Linked Scenes - 3-4 cards, ~260px
              </Fpo>
              <Fpo className="min-h-[180px] flex-1">
                Prepared Setups - 0-4 groups that could enter play
              </Fpo>
            </div>
          </div>
        </div>

        <div className="min-h-0 grid grid-rows-[auto_1fr] overflow-hidden">
          <div className="border-b border-[#2c3428] bg-[#1d231a] p-3 grid grid-cols-[1fr_180px] gap-3">
            {hasEncounter ? (
              <>
                <Fpo className="min-h-[70px]">
                  Conflict Sources - 2-3 sources + opposition, ~84px
                </Fpo>
                <Fpo className="min-h-[70px]">Threat Level + Status</Fpo>
              </>
            ) : (
              <>
                <Fpo className="min-h-[70px]">
                  Session Plane Header - current participants
                </Fpo>
                <Fpo className="min-h-[70px]">A/M Lens Entry</Fpo>
              </>
            )}
          </div>
          <div
            className={`min-h-0 grid overflow-hidden ${hasTactics ? 'grid-cols-[300px_1fr]' : 'grid-cols-[1fr_280px]'}`}
          >
            <div className="p-4 overflow-y-auto flex flex-col gap-3">
              {hasEncounter && (
                <Fpo className="min-h-[60px]">
                  Grouping - In conflict / Non-conflicting / Out, ~60px
                </Fpo>
              )}
              <Fpo className="min-h-[330px] flex-1">
                Participants - 6 creatures + 1 group, ~340px
              </Fpo>
              {hasEncounter && (
                <Fpo className="min-h-[90px]">
                  Encounter A/M Highlights - relevance by reason link
                </Fpo>
              )}
            </div>
            <div className="border-l border-[#2c3428] bg-[#151c12] p-3 overflow-y-auto flex flex-col gap-3">
              {hasTactics ? (
                <>
                  <Fpo className="min-h-[48px]">
                    Flow - order + round + active
                  </Fpo>
                  <Fpo className="min-h-[420px] flex-1">
                    Actor - decision surface, ~500px
                  </Fpo>
                  <Fpo className="min-h-[90px]">
                    Targets - AC + saves + conditions
                  </Fpo>
                  <Fpo className="min-h-[120px]">
                    Interrupts - reactions + reminders
                  </Fpo>
                </>
              ) : (
                <>
                  <Fpo className="min-h-[260px]">
                    Shared A/M Surface Preview - grouped behavior, full ~840px
                  </Fpo>
                  <Fpo className="min-h-[220px] flex-1">
                    Reference Preview - statblock or trap detail, full ~700px
                  </Fpo>
                </>
              )}
            </div>
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
            className={`text-[11px] px-2 py-0.5 rounded cursor-pointer font-(--lair-font) border ${mode === m ? 'bg-[#262e23] border-[#8b6c3e] text-[#b8944a]' : 'bg-transparent border-[#2c3428] text-(--lair-text-dim) hover:border-[#384236]'}`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}

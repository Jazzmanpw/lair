import {useState} from 'react';
import Fpo from '../fpo.tsx';

type LayoutMode = 'exploration' | 'encounter' | 'tactics';

export type LayoutOProps = {
  mode: LayoutMode;
};

export default function LayoutO({mode: initialMode}: LayoutOProps) {
  const [mode, setMode] = useState<LayoutMode>(initialMode);
  const hasEncounter = mode === 'encounter' || mode === 'tactics';
  const hasTactics = mode === 'tactics';

  return (
    <div className="h-screen bg-[#12170f] text-(--lair-text) font-(--lair-font) overflow-hidden flex flex-col">
      <div className="shrink-0 border-b border-[#2c3428] bg-[#172015] px-5 py-2 grid grid-cols-[300px_1fr_240px] gap-4">
        <Fpo className="min-h-[44px]">Scene Header - title + breadcrumb</Fpo>
        <Fpo className="min-h-[44px]">
          Room Prompts - immediate, 4-5 bullets, ~160px
        </Fpo>
        <Fpo className="min-h-[44px]">Room-Start Reminders + alert badges</Fpo>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-[340px_1fr_300px] overflow-hidden relative">
        <div className="border-r border-[#2c3428] bg-[#151c12] p-3 overflow-y-auto flex flex-col gap-3">
          <Fpo className="min-h-[70px]">Flavor Text - 2-4 sentences, ~70px</Fpo>
          <Fpo className="min-h-[150px]">Triggers - compact, ~150px</Fpo>
          {hasEncounter && (
            <Fpo className="min-h-[120px]">
              Conflict Sources - 2-3 + statuses, ~84px
            </Fpo>
          )}
          <Fpo className="min-h-[220px] flex-1">
            A/M Lens Button Surface - opens grouped ~840px modal
          </Fpo>
        </div>

        <div className="p-4 overflow-y-auto flex flex-col gap-3">
          {hasEncounter && (
            <div className="grid grid-cols-[1fr_140px] gap-3">
              <Fpo className="min-h-[32px]">Dramatic Question - 1 line</Fpo>
              <Fpo className="min-h-[32px]">Threat Level</Fpo>
            </div>
          )}
          <Fpo className="min-h-[260px] flex-1">
            Map / Atmosphere Image - main exploration canvas, ~200px minimum
          </Fpo>
          <Fpo className="min-h-[260px]">Linked Scenes - 3-4 cards, ~260px</Fpo>
        </div>

        <div className="border-l border-[#2c3428] bg-[#151c12] p-3 overflow-y-auto flex flex-col gap-3">
          {hasEncounter && (
            <Fpo className="min-h-[60px]">
              Grouping Headers - encounter relevance, ~60px
            </Fpo>
          )}
          <Fpo className="min-h-[340px] flex-1">
            Participants - 6 creatures + 1 group, ~340px
          </Fpo>
          {hasEncounter && (
            <Fpo className="min-h-[90px]">
              Encounter A/M Highlights - reason markers, ~60px
            </Fpo>
          )}
        </div>

        {hasTactics && (
          <div className="absolute inset-x-10 inset-y-8 bg-[#12170f]/95 border border-[#8b6c3e] shadow-2xl grid grid-rows-[auto_1fr]">
            <div className="border-b border-[#2c3428] bg-[#262e23] p-3 grid grid-cols-[1fr_220px] gap-3">
              <Fpo className="min-h-[48px]">
                Flow - turn order, active participant, round counter
              </Fpo>
              <Fpo className="min-h-[48px]">
                Overlay Controls - minimize / pin / reference
              </Fpo>
            </div>
            <div className="min-h-0 grid grid-cols-[280px_1fr_280px] overflow-hidden">
              <div className="border-r border-[#2c3428] p-3 overflow-y-auto flex flex-col gap-3">
                <Fpo className="min-h-[300px] flex-1">
                  Roster - initiative sorted participants, ~340px
                </Fpo>
                <Fpo className="min-h-[120px]">
                  Room Prompts - condensed beneath overlay
                </Fpo>
              </div>
              <div className="p-3 overflow-y-auto flex flex-col gap-3">
                <Fpo className="min-h-[430px] flex-1">
                  Actor - A/Ms + actions + attacks + spells, ~500px
                </Fpo>
                <Fpo className="min-h-[90px]">
                  Targets - defenses + response hints, ~80px
                </Fpo>
              </div>
              <div className="border-l border-[#2c3428] p-3 overflow-y-auto flex flex-col gap-3">
                <Fpo className="min-h-[140px]">
                  Interrupts - reactions + passives, ~120px
                </Fpo>
                <Fpo className="min-h-[180px]">
                  Conflict Source Progress - active/resolved status
                </Fpo>
                <Fpo className="min-h-[220px] flex-1">
                  Reference Preview - pinned statblock slice, full ~700px
                </Fpo>
              </div>
            </div>
          </div>
        )}
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

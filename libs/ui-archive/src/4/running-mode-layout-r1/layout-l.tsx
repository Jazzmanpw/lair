import {useState} from 'react';
import Fpo from '../fpo.tsx';

type LayoutMode = 'exploration' | 'encounter' | 'tactics';

export type LayoutLProps = {
  mode: LayoutMode;
};

function ModeSwitch({
  mode,
  setMode,
}: {
  mode: LayoutMode;
  setMode: (mode: LayoutMode) => void;
}) {
  return (
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
  );
}

export default function LayoutL({mode: initialMode}: LayoutLProps) {
  const [mode, setMode] = useState<LayoutMode>(initialMode);
  const hasEncounter = mode === 'encounter' || mode === 'tactics';
  const hasTactics = mode === 'tactics';

  return (
    <div className="h-screen bg-[#12170f] text-(--lair-text) font-(--lair-font) overflow-hidden grid grid-rows-[auto_1fr_auto_auto]">
      <div className="border-b border-[#2c3428] bg-[#172015] px-5 py-2 grid grid-cols-[320px_1fr_260px] gap-4">
        <Fpo className="min-h-[44px]">
          Scene Header - title + breadcrumb, ~60px
        </Fpo>
        <Fpo className="min-h-[44px]">
          Room-Start Reminders + Triggers - compact running alerts, ~150px
        </Fpo>
        <Fpo className="min-h-[44px]">
          Linked Scenes - 3-4 nearby cards as nav shelf
        </Fpo>
      </div>

      <div className="min-h-0 grid grid-cols-[minmax(360px,0.9fr)_minmax(520px,1.4fr)_320px] overflow-hidden">
        <div className="border-r border-[#2c3428] bg-[#151c12] p-4 overflow-y-auto flex flex-col gap-3">
          <Fpo className="min-h-[140px]">
            Room Prompts - 4-5 bullets, ~160px
          </Fpo>
          <Fpo className="min-h-[70px]">Flavor Text - 2-4 sentences, ~70px</Fpo>
          <Fpo className="min-h-[150px] flex-1">
            Map / Atmosphere Image - stable room anchor, ~200px
          </Fpo>
        </div>

        <div className="p-4 overflow-y-auto flex flex-col gap-3">
          {hasEncounter && (
            <div className="grid grid-cols-[1fr_150px] gap-3">
              <Fpo className="min-h-[32px]">
                Dramatic Question - 1 line, prominent
              </Fpo>
              <Fpo className="min-h-[32px]">Threat Level - badge</Fpo>
            </div>
          )}
          {hasTactics ? (
            <>
              <Fpo className="min-h-[420px] flex-1">
                Actor - A/Ms + actions + attacks + spells, ~500px
              </Fpo>
              <div className="grid grid-cols-[1fr_1fr] gap-3">
                <Fpo className="min-h-[90px]">
                  Targets - AC + saves + conditions, ~80px
                </Fpo>
                <Fpo className="min-h-[120px]">
                  Interrupts - passives + reactions + reminders, ~120px
                </Fpo>
              </div>
            </>
          ) : (
            <>
              {hasEncounter && (
                <Fpo className="min-h-[90px]">
                  Conflict Sources - 2-3 sources, status + opposition, ~84px
                </Fpo>
              )}
              <Fpo className="min-h-[150px]">
                Triggers Detail Lane - checks, trap compact rows, nearby cues,
                ~150px
              </Fpo>
              {hasEncounter && (
                <Fpo className="min-h-[80px]">
                  Encounter A/M Highlights - grouped relevance markers, ~60px
                </Fpo>
              )}
              <Fpo className="min-h-[220px] flex-1">
                Low-Overhead Lens Preview - pinned A/M or hazard detail, one
                interaction away
              </Fpo>
            </>
          )}
        </div>

        <div className="border-l border-[#2c3428] bg-[#151c12] p-3 overflow-y-auto flex flex-col gap-2">
          {hasEncounter && (
            <Fpo className="min-h-[60px]">
              Grouping - In conflict / Non-conflicting / Out, ~60px
            </Fpo>
          )}
          <Fpo className="min-h-[320px] flex-1">
            Participants - 6 creatures + 1 group, ~340px
          </Fpo>
          {hasTactics && (
            <Fpo className="min-h-[220px]">
              Roster - initiative sorted ledger, ~240px
            </Fpo>
          )}
        </div>
      </div>

      {hasTactics && (
        <div className="border-t border-[#2c3428] bg-[#1d231a] px-5 py-2">
          <Fpo className="min-h-[48px]">
            Flow Timeline - turn order, active participant, round counter,
            horizontal shelf
          </Fpo>
        </div>
      )}

      <ModeSwitch mode={mode} setMode={setMode} />
    </div>
  );
}

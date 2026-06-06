import {useState} from 'react';
import Fpo from '../fpo.tsx';

type LayoutMode = 'exploration' | 'encounter' | 'tactics';
type Lens = 'triggers' | 'conflict' | 'am' | 'linked' | 'tactics' | null;

export type LayoutKProps = {
  mode: LayoutMode;
};

const lensLabels: Record<Exclude<Lens, null>, string> = {
  triggers:
    'Triggers — skill checks + traps + nearby + prepared setups, ~150px',
  conflict: 'Conflict Sources — 2-3, status + opposition + reasons, ~84px',
  am: 'A/M Surface — grouped aspects + motivations for all participants, ~840px scroll',
  linked: 'Linked Scenes — 3-4 cards + Map / Atmosphere, ~400px',
  tactics: '',
};

export default function LayoutK({mode: initialMode}: LayoutKProps) {
  const [mode, setMode] = useState<LayoutMode>(initialMode);
  const hasEncounter = mode === 'encounter' || mode === 'tactics';
  const hasTactics = mode === 'tactics';
  const [lens, setLens] = useState<Lens>(
    hasTactics ? 'tactics' : hasEncounter ? 'conflict' : null,
  );

  const availableLenses: Exclude<Lens, null>[] = [
    'triggers',
    ...(hasEncounter ? (['conflict', 'am'] as const) : []),
    'linked',
    ...(hasTactics ? (['tactics'] as const) : []),
  ];

  return (
    <div className="h-screen bg-[#12170f] text-(--lair-text) font-(--lair-font) overflow-hidden grid grid-rows-[auto_1fr_auto] relative">
      <div className="border-b border-[#2c3428] bg-[#172015] px-5 py-2 flex items-center gap-4">
        <Fpo className="min-h-[36px] w-[300px]">
          Scene Header — title + breadcrumb
        </Fpo>
        {hasEncounter && (
          <Fpo className="min-h-[28px] flex-1">
            Dramatic Question — 1 line, ~28px
          </Fpo>
        )}
        <Fpo className="min-h-[28px] w-[120px]">Room-Start Reminders</Fpo>
      </div>

      <div className="grid grid-cols-[52px_1fr_320px] overflow-hidden">
        <div className="border-r border-[#2c3428] bg-[#172015] py-2 flex flex-col items-center gap-1.5">
          {availableLenses.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLens((cur) => (cur === l ? null : l))}
              className={`w-9 h-9 rounded text-[9px] uppercase cursor-pointer font-(--lair-font) border flex items-center justify-center ${
                lens === l
                  ? 'bg-[#262e23] border-[#8b6c3e] text-[#b8944a]'
                  : 'bg-transparent border-[#2c3428] text-(--lair-text-dim) hover:border-[#384236]'
              }`}
            >
              {l.slice(0, 4)}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto flex justify-center px-6 py-5">
          <div className="w-full max-w-[640px] flex flex-col gap-4">
            <Fpo className="min-h-[200px]">
              Room Prompts — 4-5 bullets at reading width, ~200px
            </Fpo>
            <Fpo className="min-h-[90px]">
              Flavor Text — read-aloud blockquote, ~90px
            </Fpo>
          </div>
        </div>

        <div className="border-l border-[#2c3428] bg-[#151c12] p-3 overflow-y-auto flex flex-col gap-2">
          {hasEncounter && (
            <Fpo className="min-h-[48px]">
              Grouping — In conflict / Non-conflicting / Out
            </Fpo>
          )}
          <Fpo className="min-h-[280px] flex-1">
            Participants — 6 creatures + 1 group, ~340px
          </Fpo>
        </div>
      </div>

      {lens && (
        <div className="absolute right-0 top-[53px] bottom-[37px] w-[420px] z-20 bg-[#151c12] border-l-2 border-[#8b6c3e] shadow-2xl flex flex-col">
          <div className="flex items-center justify-between border-b border-[#2c3428] bg-[#172015] px-4 py-2">
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#b8944a] font-semibold">
              {lens} Lens
            </span>
            <button
              type="button"
              onClick={() => setLens(null)}
              className="text-[11px] px-2 py-0.5 rounded cursor-pointer font-(--lair-font) border border-[#384236] text-(--lair-text-dim) hover:border-[#8b6c3e]"
            >
              Close
            </button>
          </div>
          <div className="p-3 overflow-y-auto flex flex-col gap-3 flex-1">
            {lens === 'tactics' ? (
              <>
                <Fpo className="min-h-[40px]">
                  Flow — turn order, active, round, ~40px
                </Fpo>
                <Fpo className="min-h-[200px]">
                  Roster — initiative-sorted, HP + conditions, ~280px
                </Fpo>
                <Fpo className="min-h-[300px]">
                  Actor — A/Ms + actions + attacks + spells + speed, ~500px
                </Fpo>
                <Fpo className="min-h-[80px]">
                  Targets — AC + saves + conditions, ~80px
                </Fpo>
                <Fpo className="min-h-[100px] flex-1">
                  Interrupts — passives + reactions, ~120px
                </Fpo>
              </>
            ) : (
              <Fpo className="min-h-[200px] flex-1">{lensLabels[lens]}</Fpo>
            )}
          </div>
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
              setLens(
                m === 'tactics'
                  ? 'tactics'
                  : m === 'encounter'
                    ? 'conflict'
                    : null,
              );
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

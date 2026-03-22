import {useEffect, useRef, useState} from 'react';
import type {Encounter} from '@lair/domain/scene';
import Fpo from './fpo.tsx';

export type EncounterRunnerProps = {
  encounter: Encounter;
  onEnd?: () => void;
};

export default function EncounterRunner({
  encounter,
  onEnd,
}: EncounterRunnerProps) {
  const creatureTabs = encounter.creatures.flatMap(({creature, count}) =>
    Array.from({length: count}, (_, i) => ({
      id: `${creature.id}-${i}`,
      label: count > 1 ? `${creature.label} ${i + 1}` : creature.label,
    })),
  );

  const [activeCreature, setActiveCreature] = useState(
    creatureTabs[0]?.id ?? '',
  );
  const [showConflicts, setShowConflicts] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showConflicts) return;
    function handleClick(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setShowConflicts(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setShowConflicts(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [showConflicts]);

  return (
    <div className="flex flex-col h-full bg-[#12170f] text-(--lair-text) font-(--lair-font) overflow-hidden">
      <div className="flex items-center gap-4 px-5 py-2.5 bg-[#172015] border-b border-[#2c3428] shrink-0">
        <span className="px-2.5 py-[3px] rounded-[3px] text-[10px] font-bold tracking-[0.08em] uppercase bg-[#2d2218] text-[#b8944a] border border-[#8b6c3e]">
          {encounter.threatLevel}
        </span>
        <div className="flex-1 min-w-0 relative">
          <button
            type="button"
            onClick={() => setShowConflicts(!showConflicts)}
            className="bg-transparent border-none p-0 cursor-pointer text-left w-full font-(--lair-font)"
          >
            <span className="text-sm font-bold text-[#e8e4d8] tracking-[0.02em]">
              {encounter.dramaticQuestion}
            </span>
          </button>
          {showConflicts && (
            <div
              ref={popoverRef}
              className="absolute top-full left-0 mt-2 z-50 w-[360px] bg-[#1d231a] border border-[#384236] rounded p-4 shadow-lg shadow-black/40"
            >
              <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[#8b6c3e] mb-2">
                Источники конфликта
              </div>
              <ul className="m-0 pl-4 text-[13px] leading-relaxed text-(--lair-text-dim) list-disc">
                {encounter.conflictSources.map((src) => (
                  <li key={src} className="mb-1">
                    {src}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onEnd}
          className="px-3 py-1 rounded-[3px] text-[10px] font-bold tracking-[0.06em] uppercase bg-transparent border border-[#8b6c3e] text-(--lair-text-dim) cursor-pointer font-(--lair-font) hover:border-[#b8944a] hover:text-[#b8944a] transition-colors duration-150 shrink-0"
        >
          End
        </button>
      </div>

      <div className="flex gap-0.5 px-5 bg-[#151c12] border-b border-[#2c3428] overflow-auto shrink-0">
        {creatureTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveCreature(tab.id)}
            className={`border-none cursor-pointer text-xs font-semibold px-3.5 py-2.5 font-(--lair-font) whitespace-nowrap transition-all duration-150 ${
              activeCreature === tab.id
                ? 'bg-[#1d231a] text-[#e8e4d8] border-b-2 border-b-[#5ca64c]'
                : 'bg-transparent text-(--lair-text-dim) border-b-2 border-b-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-[1fr_240px] overflow-hidden">
        <div className="overflow-auto p-4 px-5">
          <div className="grid grid-cols-[3fr_1fr] gap-3 mb-3">
            <Fpo style={{height: '200px'}}>
              Creature Statblock —{' '}
              {creatureTabs.find((t) => t.id === activeCreature)?.label}
            </Fpo>
            <Fpo style={{height: '200px'}}>Actions & Abilities</Fpo>
          </div>
        </div>

        <div className="border-l border-[#2c3428] overflow-auto p-4 px-3.5 flex flex-col gap-3">
          <Fpo style={{height: '160px'}}>Condition Tracker</Fpo>
          <Fpo className="flex-1 min-h-[120px]">Passive Event Reminders</Fpo>
        </div>
      </div>
    </div>
  );
}

import type {Encounter} from '@lair/domain/scene';
import Fpo from './fpo.tsx';

export type EncounterTabProps = {
  encounter: Encounter;
  onRun?: () => void;
};

export default function EncounterTab({encounter, onRun}: EncounterTabProps) {
  return (
    <div className="font-(--lair-font) text-(--lair-text) p-5">
      {/* Row 1: threat badge + Run button */}

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="row-span-2">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 rounded-[3px] text-[11px] font-bold tracking-[0.08em] uppercase bg-[#2d2218] text-[#b8944a] border border-[#8b6c3e]">
              {encounter.threatLevel}
            </span>
            <button
              type="button"
              onClick={onRun}
              className="px-3 py-1 rounded-[3px] text-[11px] font-bold tracking-[0.08em] uppercase bg-[#2a4a2c] border border-[#5ca64c] text-[#7dd868] cursor-pointer font-(--lair-font) hover:bg-[#325a34] transition-colors duration-150"
            >
              Run!
            </button>
          </div>
          <Fpo className="min-h-[300px]">Tactical notes / battlemap</Fpo>
        </div>
        {/* Row 2: dramatic question */}
        <blockquote className="grid-cols-2 m-0 mb-4 py-2.5 px-4 border-l-[3px] border-l-[#8b6c3e] italic text-sm text-(--lair-text-dim) bg-[#1d231a] rounded-r-[3px]">
          <p>
            <strong>Потенциальный драматический вопрос:</strong>
            <br />
            {encounter.dramaticQuestion}
          </p>
          <p className="mt-6">
            <strong>Источники конфликта:</strong>
            {encounter.conflictSources.length > 0 && (
              <ul className="m-0 pl-5 text-[13px] leading-relaxed text-(--lair-text-dim) list-disc">
                {encounter.conflictSources.map((src) => (
                  <li key={src} className="mb-0.5">
                    {src}
                  </li>
                ))}
              </ul>
            )}
          </p>
        </blockquote>

        {/* Row 3: two-column — creatures + tactical notes */}
        <div className="flex flex-col gap-1.5">
          {encounter.creatures.map(({creature, count}) => (
            <div
              key={creature.id}
              className="flex items-center gap-2 px-3 py-2 bg-[#1e2e20] rounded-[3px] border border-[#2d3d2e] text-[13px]"
            >
              <span className="font-bold text-(--lair-text) cursor-pointer border-b border-dashed border-[#5ca64c]">
                {creature.label}
              </span>
              <span className="text-[#5ca64c] text-[11px] font-semibold">
                ×{count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

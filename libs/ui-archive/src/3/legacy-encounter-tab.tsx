import {useLayoutEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import type {CreatureStatblock as StatblockType} from '@lair/domain-archive/legacy-creature';
import type {Encounter} from '@lair/domain-archive/legacy-scene';
import CreatureStatblock from './creature-statblock.tsx';
import Fpo from './fpo.tsx';

export type EncounterTabProps = {
  encounter: Encounter;
  statblocks?: Record<string, StatblockType>;
  onRun?: () => void;
};

const POPUP_WIDTH = 420;
const POPUP_GAP = 8;

function CreatureRow({
  id,
  label,
  count,
  statblock,
}: {
  id: string;
  label: string;
  count: number;
  statblock?: StatblockType;
}) {
  const [hovered, setHovered] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({top: 0, left: 0});

  function showPopup() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHovered(true);
  }

  function hidePopup() {
    timeoutRef.current = setTimeout(() => setHovered(false), 150);
  }

  useLayoutEffect(() => {
    if (!hovered || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const fitsRight = rect.right + POPUP_GAP + POPUP_WIDTH <= window.innerWidth;
    const left = fitsRight
      ? rect.right + POPUP_GAP
      : rect.left - POPUP_GAP - POPUP_WIDTH;
    const popupHeight = popupRef.current?.offsetHeight ?? 0;
    const top = Math.min(
      rect.top,
      Math.max(0, window.innerHeight - popupHeight),
    );
    setPos({top, left});

    if (popupRef.current && triggerRef.current) {
      const computed = getComputedStyle(triggerRef.current);
      for (const v of ['--lair-text', '--lair-text-dim', '--lair-font']) {
        popupRef.current.style.setProperty(v, computed.getPropertyValue(v));
      }
    }
  }, [hovered]);

  return (
    <div
      ref={triggerRef}
      key={id}
      className="flex items-center gap-2 px-3 py-2 bg-[#1e2e20] rounded-[3px] border border-[#2d3d2e] text-[13px]"
    >
      <span
        className="font-bold text-(--lair-text) cursor-pointer border-b border-dashed border-[#5ca64c]"
        onMouseEnter={showPopup}
        onMouseLeave={hidePopup}
      >
        {label}
      </span>
      <span className="text-[#5ca64c] text-[11px] font-semibold">×{count}</span>
      {hovered &&
        statblock &&
        createPortal(
          <div
            ref={popupRef}
            className="fixed z-50 shadow-lg shadow-black/50"
            style={{top: pos.top, left: pos.left, width: POPUP_WIDTH}}
            onMouseEnter={showPopup}
            onMouseLeave={hidePopup}
          >
            <CreatureStatblock statblock={statblock} />
          </div>,
          document.body,
        )}
    </div>
  );
}

export default function LegacyEncounterTab({
  encounter,
  statblocks = {},
  onRun,
}: EncounterTabProps) {
  return (
    <div className="font-(--lair-font) text-(--lair-text) p-5">
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

        <div className="bg-[#1d231a] border border-[#2c3428] rounded">
          <div className="px-3 py-2 bg-[#172015] border-b border-[#8b6c3e] rounded-t">
            <div className="text-[10px] font-semibold tracking-[0.06em] uppercase text-[#8b6c3e] mb-1">
              Потенциальный драматический вопрос
            </div>
            <p className="text-sm italic text-[#e8e4d8]">
              {encounter.dramaticQuestion}
            </p>
          </div>
          {encounter.conflictSources.length > 0 && (
            <div className="px-3 py-2.5">
              <div className="text-[10px] font-semibold tracking-[0.06em] uppercase text-(--lair-text-dim) mb-1.5">
                Источники конфликта
              </div>
              <ul className="m-0 pl-4 text-[13px] leading-relaxed text-(--lair-text-dim) list-disc">
                {encounter.conflictSources.map((src) => (
                  <li key={src} className="mb-0.5">
                    {src}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          {encounter.creatures.map(({creature, count}) => (
            <CreatureRow
              key={creature.id}
              id={creature.id}
              label={creature.label}
              count={count}
              statblock={statblocks[creature.id]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

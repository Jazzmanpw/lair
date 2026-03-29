import {type KeyboardEvent, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import type {CreatureStatblock as StatblockType} from '@lair/domain/creature';
import type {
  EncounterParticipant,
  ParticipantRunState,
  RunStateAction,
} from '@lair/domain/run-state';
import CreatureStatblock from './creature-statblock.tsx';

export type CreatureCombatCardProps = {
  participant: EncounterParticipant;
  state: ParticipantRunState;
  statblock?: StatblockType;
  isActive?: boolean;
  onAction: (action: RunStateAction) => void;
};

const POPUP_WIDTH = 420;
const POPUP_GAP = 8;

function hpColor(ratio: number) {
  if (ratio > 0.5) return 'text-[#5ca64c]';
  if (ratio > 0.25) return 'text-[#b8944a]';
  return 'text-[#a64c4c]';
}

function SquareButton({
  label,
  onClick,
  active,
  className = '',
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  className?: string;
}) {
  const base =
    'w-6 h-6 flex items-center justify-center rounded text-[11px] font-bold border cursor-pointer font-(--lair-font) transition-colors duration-150 shrink-0';
  const variant =
    active != null
      ? active
        ? 'bg-[#2a4a2c] border-[#5ca64c] text-[#7dd868]'
        : 'bg-[#2d2218] border-[#4a3a28] text-[#6b5a3e]'
      : 'bg-[#1d231a] border-[#384236] text-(--lair-text-dim) hover:border-[#8b6c3e] hover:text-[#b8944a]';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${variant} ${className}`}
    >
      {label}
    </button>
  );
}

export default function CreatureCombatCard({
  participant,
  state,
  statblock,
  isActive = false,
  onAction,
}: CreatureCombatCardProps) {
  const [showStatblock, setShowStatblock] = useState(false);
  const [popupPos, setPopupPos] = useState({top: 0, left: 0});
  const [hpDraft, setHpDraft] = useState('');
  const [addingCondition, setAddingCondition] = useState(false);
  const [conditionDraft, setConditionDraft] = useState('');

  const cardRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const hpInputRef = useRef<HTMLInputElement>(null);
  const conditionInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!showStatblock) return;
    function handleClick(e: MouseEvent) {
      if (
        cardRef.current?.contains(e.target as Node) ||
        popupRef.current?.contains(e.target as Node)
      )
        return;
      setShowStatblock(false);
    }
    function handleKey(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') setShowStatblock(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [showStatblock]);

  useEffect(() => {
    if (!showStatblock || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const fitsRight = rect.right + POPUP_GAP + POPUP_WIDTH <= window.innerWidth;
    setPopupPos({
      top: Math.max(0, rect.top),
      left: fitsRight
        ? rect.right + POPUP_GAP
        : rect.left - POPUP_GAP - POPUP_WIDTH,
    });
  }, [showStatblock]);

  useEffect(() => {
    if (addingCondition) conditionInputRef.current?.focus();
  }, [addingCondition]);

  const hpRatio = state.maxHp > 0 ? state.currentHp / state.maxHp : 0;

  function commitHpAdjust() {
    const delta = parseInt(hpDraft, 10);
    if (!isNaN(delta) && delta !== 0) {
      onAction({type: 'ADJUST_HP', participantId: participant.id, delta});
    }
    setHpDraft('');
    hpInputRef.current?.blur();
  }

  function handleHpKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') commitHpAdjust();
    if (e.key === 'Escape') {
      setHpDraft('');
      hpInputRef.current?.blur();
    }
  }

  function commitCondition() {
    if (conditionDraft.trim()) {
      onAction({
        type: 'ADD_CONDITION',
        participantId: participant.id,
        condition: conditionDraft.trim(),
      });
    }
    setAddingCondition(false);
  }

  function handleConditionKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') commitCondition();
    if (e.key === 'Escape') setAddingCondition(false);
  }

  return (
    <div
      ref={cardRef}
      className={`bg-[#1d231a] rounded px-2.5 py-1.5 font-(--lair-font) text-(--lair-text) border ${
        isActive
          ? 'border-[#5ca64c] shadow-[0_0_6px_rgba(92,166,76,0.3)]'
          : 'border-[#2c3428]'
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-bold text-[#e8e4d8] flex-1 min-w-0">
          {participant.label}
        </span>
        {statblock && (
          <SquareButton
            label="S"
            onClick={() => setShowStatblock(!showStatblock)}
          />
        )}
        <SquareButton
          label="T"
          onClick={() =>
            onAction({type: 'SET_ACTIVE', participantId: participant.id})
          }
          active={isActive}
        />
      </div>

      {statblock && (
        <div className="flex items-center gap-2 mt-1">
          <span
            className={`text-[13px] font-bold ${hpColor(hpRatio)} shrink-0`}
          >
            {state.currentHp}/{state.maxHp}
          </span>
          <input
            ref={hpInputRef}
            type="text"
            inputMode="numeric"
            value={hpDraft}
            onChange={(e) => setHpDraft(e.target.value)}
            onKeyDown={handleHpKey}
            placeholder="+/−"
            className="w-12 bg-[#12170f] border border-[#384236] rounded px-1 py-0 text-[12px] font-bold text-[#e8e4d8] text-center font-(--lair-font) outline-none focus:border-[#5ca64c] placeholder:text-[#384236] transition-colors duration-150"
          />
          <div className="flex-1" />
          <SquareButton
            label="C"
            onClick={() => {
              setConditionDraft('');
              setAddingCondition(true);
            }}
          />
          <SquareButton
            label="R"
            onClick={() =>
              onAction({
                type: 'TOGGLE_REACTION',
                participantId: participant.id,
              })
            }
            active={state.reactionAvailable}
          />
        </div>
      )}

      {(state.conditions.length > 0 || addingCondition) && (
        <div className="flex flex-wrap gap-1 mt-1">
          {state.conditions.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() =>
                onAction({
                  type: 'REMOVE_CONDITION',
                  participantId: participant.id,
                  condition: c,
                })
              }
              className="px-1.5 py-0 rounded text-[10px] font-semibold bg-[#2d2218] border border-[#4a3a28] text-[#b8944a] cursor-pointer font-(--lair-font) hover:border-[#8b6c3e] transition-colors duration-150"
            >
              {c} ×
            </button>
          ))}
          {addingCondition && (
            <input
              ref={conditionInputRef}
              type="text"
              value={conditionDraft}
              onChange={(e) => setConditionDraft(e.target.value)}
              onKeyDown={handleConditionKey}
              onBlur={commitCondition}
              className="w-20 bg-[#12170f] border border-[#8b6c3e] rounded px-1 py-0 text-[10px] text-(--lair-text) font-(--lair-font) outline-none"
            />
          )}
        </div>
      )}

      {showStatblock &&
        statblock &&
        createPortal(
          <div
            ref={popupRef}
            className="fixed z-50 shadow-lg shadow-black/50"
            style={{...popupPos, width: POPUP_WIDTH}}
          >
            <CreatureStatblock statblock={statblock} />
          </div>,
          document.body,
        )}
    </div>
  );
}

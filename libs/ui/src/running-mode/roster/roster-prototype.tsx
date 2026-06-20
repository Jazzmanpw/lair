import {
  BookOpenText,
  ChevronDown,
  ChevronRight,
  Flag,
  RotateCcw,
  Users,
  X,
} from 'lucide-react';
import {type KeyboardEvent, type ReactNode, useMemo, useState} from 'react';
import type {InitiativeFlow, Participant} from '@lair/domain/running';
import {RosterViewModel} from './roster-model.ts';

export type RosterMode = 'exploration' | 'tactics';

export type RosterPrototypeProps = {
  roster: RosterViewModel;
  mode: RosterMode;
  groupPopupOpen?: boolean;
};

function IconButton({
  label,
  active = false,
  children,
  onClick,
}: {
  label: string;
  active?: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`grid size-6 shrink-0 place-items-center rounded border text-[10px] font-bold transition-colors ${
        active
          ? 'border-[#78b482] bg-[#263d2a] text-[#91d49b]'
          : 'border-[#384236] bg-[#171d16] text-[#929d8c] hover:border-[#7c8a76] hover:text-[#e7e5dc]'
      }`}
    >
      {children}
    </button>
  );
}

function MotivationList({motivations}: {motivations: string[]}) {
  if (!motivations.length) return null;
  return (
    <div className="mt-1 flex flex-col gap-0.5">
      {motivations.map((motivation) => (
        <div
          key={motivation}
          className="flex gap-1 text-[10px] leading-[1.3] text-[#d7c89e]"
        >
          <ChevronRight className="mt-px size-3 shrink-0 text-[#bd9450]" />
          <span>{motivation}</span>
        </div>
      ))}
    </div>
  );
}

function GroupMarks({
  roster,
  groupIds,
  groupsById,
}: {
  roster: RosterViewModel;
  groupIds: string[];
  groupsById: Map<string, Participant<'group'>>;
}) {
  return (
    <span className="flex shrink-0 items-center gap-[3px]">
      {groupIds.map((groupId) => {
        const group = groupsById.get(groupId);
        if (!group) return null;
        return (
          <span
            key={group.id}
            title={group.name}
            aria-label={group.name}
            className="size-2.5 rounded-full border border-black/25"
            style={{
              backgroundColor: RosterViewModel.selectGroupColor(
                roster,
                group.id,
              ),
            }}
          />
        );
      })}
    </span>
  );
}

function GroupPopup({
  roster,
  groups,
  onClose,
}: {
  roster: RosterViewModel;
  groups: Participant<'group'>[];
  onClose: () => void;
}) {
  return (
    <section
      aria-label="Group popup"
      className="rounded-md border border-[#59503b] bg-[#1c2119] p-2 shadow-[0_10px_35px_rgba(0,0,0,0.4)] absolute top-0 w-70 -right-72"
    >
      <div className="mb-2 flex items-center gap-2">
        <Users className="size-3.5 text-[#b99a61]" />
        <h2 className="flex-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#c9b687]">
          Groups
        </h2>
        <button
          type="button"
          aria-label="Close group popup"
          onClick={onClose}
          className="text-[#7f897a] hover:text-[#e9e6dc]"
        >
          <X className="size-4" />
        </button>
      </div>
      <div className="flex flex-col gap-1.5">
        {groups.map((group) => (
          <article
            key={group.id}
            className="rounded border border-[#353c30] bg-[#171c15] p-2"
          >
            <header className="flex items-center gap-1.5">
              <span
                className="size-2.5 shrink-0 rounded-full border border-black/25"
                style={{
                  backgroundColor: RosterViewModel.selectGroupColor(
                    roster,
                    group.id,
                  ),
                }}
              />
              <h3 className="text-[11px] font-bold leading-4 text-[#e7e3d6]">
                {group.name}
              </h3>
            </header>
            {(RosterViewModel.selectSetupAspects(roster, group).length > 0 ||
              group.motivations.length > 0) && (
              <div className="mt-1.5 flex flex-col gap-1 pl-4">
                {RosterViewModel.selectSetupAspects(roster, group).map(
                  (aspect) => (
                    <div
                      key={aspect}
                      className="text-[10px] leading-[1.35] text-[#aeb7a7]"
                    >
                      {aspect}
                    </div>
                  ),
                )}
                <MotivationList
                  motivations={group.motivations.map(({value}) => value)}
                />
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function TurnButton({
  name,
  active,
  onClick,
}: {
  name: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <IconButton
      label={`Make ${name} the actor`}
      active={active}
      onClick={onClick}
    >
      <Flag className="size-3.5" fill={active ? 'currentColor' : 'none'} />
    </IconButton>
  );
}

function RosterItem({
  roster,
  entry,
  groupsById,
  mode,
  active,
  deactivated = false,
  onSetActor,
  onOpenStatblock,
  onUpdate,
}: {
  roster: RosterViewModel;
  entry: InitiativeFlow.Entry;
  groupsById: Map<string, Participant<'group'>>;
  mode: RosterMode;
  active: boolean;
  deactivated?: boolean;
  onSetActor: () => void;
  onOpenStatblock: () => void;
  onUpdate: (creature: Participant<'creature'>) => void;
}) {
  const [hpDraft, setHpDraft] = useState('');
  const [addingCondition, setAddingCondition] = useState(false);
  const [conditionDraft, setConditionDraft] = useState('');
  const hpRatio =
    entry.type === 'creature' ? entry.state.currentHp / entry.state.maxHp : 1;

  function commitHp() {
    if (entry.type !== 'creature') return;
    const delta = Number.parseInt(hpDraft, 10);
    if (Number.isFinite(delta) && delta !== 0) {
      onUpdate({
        ...entry,
        state: {
          ...entry.state,
          currentHp: Math.max(
            0,
            Math.min(entry.state.maxHp, entry.state.currentHp + delta),
          ),
        },
      });
    }
    setHpDraft('');
  }

  function commitCondition() {
    if (entry.type !== 'creature') return;
    if (conditionDraft.trim()) {
      onUpdate({
        ...entry,
        state: {
          ...entry.state,
          conditions: [
            ...entry.state.conditions,
            {ruleId: conditionDraft.trim()},
          ],
        },
      });
    }
    setConditionDraft('');
    setAddingCondition(false);
  }

  if (entry.type === 'playerCharacter') {
    return (
      <div
        className={`flex min-h-8 items-center gap-2 rounded border px-2 ${
          active
            ? 'border-[#587e5e] bg-[#1d2b20]'
            : 'border-[#2e372c] bg-[#191f18]'
        }`}
      >
        <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-[#dbded5]">
          {entry.name}
        </span>
        <TurnButton name={entry.name} active={active} onClick={onSetActor} />
      </div>
    );
  }

  return (
    <article
      className={`rounded border bg-[#1b2119] px-2 py-1.5 ${
        active && mode === 'tactics' ? 'border-[#5f8d66]' : 'border-[#30392e]'
      } ${deactivated ? 'bg-[#161a15] opacity-55' : ''}`}
    >
      <div className="flex items-center gap-1.5">
        <h3
          className={`min-w-0 flex-1 text-[12px] font-bold leading-4 ${
            deactivated ? 'text-[#858d81]' : 'text-[#edede5]'
          }`}
        >
          {entry.name}
        </h3>
        <GroupMarks
          roster={roster}
          groupIds={entry.groupIds}
          groupsById={groupsById}
        />
        <IconButton
          label={`Open ${entry.name} statblock`}
          onClick={onOpenStatblock}
        >
          <BookOpenText className="size-3.5" />
        </IconButton>
        {mode === 'tactics' && (
          <TurnButton name={entry.name} active={active} onClick={onSetActor} />
        )}
      </div>

      {mode === 'tactics' && (
        <>
          <div className="mt-1 flex items-center gap-1.5">
            <span
              className={`text-[12px] font-bold tabular-nums ${
                hpRatio > 0.5
                  ? 'text-[#78b87d]'
                  : hpRatio > 0.25
                    ? 'text-[#d0a457]'
                    : 'text-[#c86b68]'
              }`}
            >
              {entry.state.currentHp}/{entry.state.maxHp}
            </span>
            <input
              value={hpDraft}
              inputMode="numeric"
              aria-label={`Adjust ${entry.name} HP`}
              placeholder="+/-"
              onChange={(event) => setHpDraft(event.target.value)}
              onBlur={commitHp}
              onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'Enter') commitHp();
                if (event.key === 'Escape') setHpDraft('');
              }}
              className="h-6 w-11 rounded border border-[#384236] bg-[#12170f] px-1 text-center text-[11px] font-bold text-[#e8e4d8] outline-none placeholder:text-[#4d584a] focus:border-[#6e9873]"
            />
            <span className="flex-1" />
            <IconButton
              label={`Add condition to ${entry.name}`}
              active={addingCondition}
              onClick={() => setAddingCondition((current) => !current)}
            >
              C
            </IconButton>
            <IconButton
              label={`${entry.state.reactionAvailable ? 'Spend' : 'Restore'} ${entry.name} reaction`}
              active={entry.state.reactionAvailable}
              onClick={() =>
                onUpdate({
                  ...entry,
                  state: {
                    ...entry.state,
                    reactionAvailable: !entry.state.reactionAvailable,
                  },
                })
              }
            >
              <RotateCcw className="size-3.5" />
            </IconButton>
          </div>
          {(entry.state.conditions.length > 0 || addingCondition) && (
            <div className="mt-1 flex flex-wrap gap-1">
              {entry.state.conditions.map((condition, index) => (
                <button
                  type="button"
                  key={`${condition.ruleId}-${index}`}
                  title="Remove condition"
                  onClick={() =>
                    onUpdate({
                      ...entry,
                      state: {
                        ...entry.state,
                        conditions: entry.state.conditions.filter(
                          (_, conditionIndex) => conditionIndex !== index,
                        ),
                      },
                    })
                  }
                  className="rounded border border-[#68483c] bg-[#34251f] px-1.5 py-0.5 text-[9px] text-[#d9a080]"
                >
                  {RosterViewModel.selectConditionLabel(roster, condition)} x
                </button>
              ))}
              {addingCondition && (
                <input
                  autoFocus
                  value={conditionDraft}
                  aria-label={`New condition for ${entry.name}`}
                  onChange={(event) => setConditionDraft(event.target.value)}
                  onBlur={commitCondition}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') commitCondition();
                    if (event.key === 'Escape') setAddingCondition(false);
                  }}
                  className="h-5 min-w-20 flex-1 rounded border border-[#735b39] bg-[#12170f] px-1 text-[9px] text-[#d8ddd3] outline-none"
                />
              )}
            </div>
          )}
        </>
      )}

      <MotivationList motivations={entry.motivations.map(({value}) => value)} />
    </article>
  );
}

function RoundControl({
  round,
  onChange,
}: {
  round: number;
  onChange: (round: number) => void;
}) {
  return (
    <div className="mb-2 flex items-center justify-end gap-1 text-[10px] text-[#8d9788]">
      <span className="mr-1 uppercase tracking-[0.12em]">Round</span>
      <button
        type="button"
        aria-label="Previous round"
        onClick={() => onChange(Math.max(1, round - 1))}
        className="grid size-5 place-items-center rounded border border-[#384236]"
      >
        -
      </button>
      <span className="min-w-5 text-center font-bold tabular-nums text-[#d8ddd4]">
        {round}
      </span>
      <button
        type="button"
        aria-label="Next round"
        onClick={() => onChange(round + 1)}
        className="grid size-5 place-items-center rounded border border-[#384236]"
      >
        +
      </button>
    </div>
  );
}

export default function RosterPrototype({
  roster: initialRoster,
  mode,
  groupPopupOpen: initialGroupPopupOpen = false,
}: RosterPrototypeProps) {
  const [creatures, setCreatures] = useState(
    RosterViewModel.selectCreatures(initialRoster),
  );
  const [actorId, setActorId] = useState(
    initialRoster.session.initiative?.activeId ??
      RosterViewModel.selectCreatures(initialRoster)[0]?.id,
  );
  const [round, setRound] = useState(
    initialRoster.session.initiative?.round ?? 1,
  );
  const [groupPopupOpen, setGroupPopupOpen] = useState(initialGroupPopupOpen);
  const [outOfGameOpen, setOutOfGameOpen] = useState(false);
  const [statblockId, setStatblockId] = useState<string | null>(null);
  const groups = RosterViewModel.selectGroups(initialRoster);
  const groupsById = useMemo(
    () => new Map(groups.map((group) => [group.id, group])),
    [groups],
  );
  const initiative = RosterViewModel.selectTacticalEntries(
    initialRoster,
    creatures,
  );

  function updateCreature(nextCreature: Participant<'creature'>) {
    setCreatures((current) =>
      current.map((creature) =>
        creature.id === nextCreature.id ? nextCreature : creature,
      ),
    );
  }

  function setStatblockNotice(entry: InitiativeFlow.Entry) {
    setStatblockId(
      entry.type === 'creature'
        ? RosterViewModel.selectStatblockId(initialRoster, entry)
        : null,
    );
  }

  function ExplorationRosterItem({
    creature,
    deactivated = false,
  }: {
    creature: Participant<'creature'>;
    deactivated?: boolean;
  }) {
    return (
      <RosterItem
        roster={initialRoster}
        entry={creature}
        groupsById={groupsById}
        mode={mode}
        active={creature.id === actorId}
        deactivated={deactivated}
        onSetActor={() => setActorId(creature.id)}
        onOpenStatblock={() => setStatblockNotice(creature)}
        onUpdate={updateCreature}
      />
    );
  }

  function explorationRows() {
    const sections = RosterViewModel.selectExplorationSections(
      initialRoster,
      creatures,
    );
    const primary =
      sections.inConflict.length > 0
        ? sections.inConflict
        : sections.nonConflicting;
    const secondary =
      sections.inConflict.length > 0 ? sections.nonConflicting : [];

    return (
      <>
        <div className="flex flex-col gap-1">
          {primary.map((creature) => (
            <ExplorationRosterItem key={creature.id} creature={creature} />
          ))}
        </div>
        {secondary.length > 0 && (
          <section className="mt-2">
            <div className="mb-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#747e70]">
              Non-conflicting
            </div>
            <div className="flex flex-col gap-1">
              {secondary.map((creature) => (
                <ExplorationRosterItem key={creature.id} creature={creature} />
              ))}
            </div>
          </section>
        )}
        {sections.outOfGame.length > 0 && (
          <section className="mt-2">
            <button
              type="button"
              aria-expanded={outOfGameOpen}
              onClick={() => setOutOfGameOpen((current) => !current)}
              className="flex w-full items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#697267]"
            >
              {outOfGameOpen ? (
                <ChevronDown className="size-3" />
              ) : (
                <ChevronRight className="size-3" />
              )}
              Out of game
            </button>
            {outOfGameOpen && (
              <div className="mt-1 flex flex-col gap-1">
                {sections.outOfGame.map((creature) => (
                  <ExplorationRosterItem
                    key={creature.id}
                    creature={creature}
                    deactivated
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </>
    );
  }

  return (
    <div className="font-(--lair-font) text-[#d8dbd2]">
      <div className="mb-2 flex items-center justify-end gap-1">
        <IconButton
          label="Toggle group popup"
          active={groupPopupOpen}
          onClick={() => setGroupPopupOpen((current) => !current)}
        >
          <Users className="size-3.5" />
        </IconButton>
      </div>
      <div className="rounded-lg border border-[#323b2f] bg-[#11160f] p-2 shadow-[0_16px_50px_rgba(0,0,0,0.45)] relative">
        <div className="min-w-0">
          {mode === 'tactics' ? (
            <>
              <RoundControl round={round} onChange={setRound} />
              <div className="flex flex-col gap-1">
                {initiative.map((entry) => (
                  <RosterItem
                    key={entry.id}
                    roster={initialRoster}
                    entry={entry}
                    groupsById={groupsById}
                    mode={mode}
                    active={entry.id === actorId}
                    onSetActor={() => setActorId(entry.id)}
                    onOpenStatblock={() => setStatblockNotice(entry)}
                    onUpdate={updateCreature}
                  />
                ))}
              </div>
            </>
          ) : (
            explorationRows()
          )}
        </div>
        {groupPopupOpen && (
          <GroupPopup
            roster={initialRoster}
            groups={groups}
            onClose={() => setGroupPopupOpen(false)}
          />
        )}
      </div>
      {statblockId && (
        <div className="mt-2 flex items-start gap-2 rounded border border-[#465744] bg-[#1c241a] p-2 text-[10px] text-[#939d8e]">
          <BookOpenText className="mt-0.5 size-3.5 shrink-0" />
          <span className="flex-1">
            Full statblock opened without changing the actor.
          </span>
          <button
            type="button"
            aria-label="Close statblock notice"
            onClick={() => setStatblockId(null)}
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

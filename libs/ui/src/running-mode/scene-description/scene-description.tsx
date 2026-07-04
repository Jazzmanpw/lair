import {BellRing, Feather, List, Map, X} from 'lucide-react';
import {type ReactNode, useState} from 'react';
import type {Scene} from '@lair/domain/prep';

export type SceneDescriptionProps = {
  scene: Scene;
  showSceneTitle?: boolean;
  hasMap?: boolean;
  reminderStartsOpen?: boolean;
  compact?: boolean;
};

function RailButton({
  label,
  active,
  attention,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  attention?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={active}
      onClick={onClick}
      className={`grid size-9 place-items-center rounded-md border transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d1a55e] ${
        attention
          ? 'border-[#c7933e] bg-[#a36f24] text-[#fff4dc] shadow-[0_0_14px_rgba(200,148,62,0.38)]'
          : active
            ? 'border-[#78866d] bg-[#344130] text-[#f0eadb]'
            : 'border-[#4b5545] bg-[#151c12] text-[#aeb7a7] hover:border-[#78866d] hover:text-[#f0eadb]'
      }`}
    >
      {children}
    </button>
  );
}

function CloseButton({label, onClick}: {label: string; onClick: () => void}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-8 place-items-center rounded text-[#9da697] hover:bg-[#262e23] hover:text-[#e8e4d8] focus-visible:outline-2 focus-visible:outline-[#d1a55e]"
    >
      <X className="size-4" />
    </button>
  );
}

function SceneDetails({scene}: {scene: Scene}) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-[#9db087]">
      {scene.details.map((text) => (
        <li key={text} className="pl-1 text-sm leading-5 text-[#dcd8cc]">
          {text}
        </li>
      ))}
    </ul>
  );
}

function FlavorText({text}: {text: string}) {
  return <p className="text-[15px] leading-6 text-[#dcd8cc]">{text}</p>;
}

function BrazierHallSketch() {
  return (
    <svg
      role="img"
      aria-labelledby="brazier-map-title brazier-map-description"
      viewBox="0 0 260 230"
      className="mx-auto w-full max-w-72 text-[#b8c2ae]"
    >
      <title id="brazier-map-title">Схема зала с жаровнями</title>
      <desc id="brazier-map-description">
        Круглая комната с центральной ямой, четырьмя жаровнями и проходами по
        сторонам света.
      </desc>
      <circle
        cx="130"
        cy="115"
        r="83"
        fill="#151c12"
        stroke="currentColor"
        strokeWidth="3"
      />
      <circle
        cx="130"
        cy="115"
        r="20"
        fill="#090d08"
        stroke="#8b6c3e"
        strokeWidth="3"
      />
      <path
        d="M118 32h24M118 198h24M47 103v24M213 103v24"
        stroke="#090d08"
        strokeWidth="9"
      />
      <path
        d="M118 32h24M118 198h24M47 103v24M213 103v24"
        stroke="#dcd8cc"
        strokeWidth="2"
      />
      {[
        [88, 73],
        [172, 73],
        [88, 157],
        [172, 157],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          <circle r="10" fill="#332619" stroke="#b8944a" strokeWidth="2" />
          <path d="M-3 3C-8-4 0-10 1-14c6 7 7 12 2 17" fill="#d39a42" />
        </g>
      ))}
      <text x="130" y="120" textAnchor="middle" fill="#9a9080" fontSize="10">
        яма
      </text>
      <text x="130" y="17" textAnchor="middle" fill="#abacb5" fontSize="11">
        питомник
      </text>
      <text x="130" y="222" textAnchor="middle" fill="#abacb5" fontSize="11">
        вход
      </text>
      <text x="24" y="118" textAnchor="middle" fill="#abacb5" fontSize="11">
        морг
      </text>
      <text x="236" y="108" textAnchor="middle" fill="#abacb5" fontSize="10">
        комната
      </text>
      <text x="236" y="120" textAnchor="middle" fill="#abacb5" fontSize="10">
        отдыха
      </text>
    </svg>
  );
}

export default function SceneDescription({
  scene,
  showSceneTitle = false,
  hasMap = false,
  reminderStartsOpen = false,
  compact = false,
}: SceneDescriptionProps) {
  const [mainContent, setMainContent] = useState<'details' | 'flavor'>(
    scene.flavorText ? 'flavor' : 'details',
  );
  const [reminderOpen, setReminderOpen] = useState(
    Boolean(scene.entranceReminder && reminderStartsOpen),
  );
  const [mapOpen, setMapOpen] = useState(false);
  const hasRail = Boolean(scene.flavorText || scene.entranceReminder || hasMap);

  return (
    <section
      aria-label={`Сцена: ${scene.title}`}
      className={`relative flex h-52 w-full flex-col overflow-hidden rounded-lg border border-[#2c3428] bg-[#172015] font-(--lair-font) ${
        compact
          ? hasRail
            ? 'py-3 pl-3 pr-14'
            : 'p-3'
          : hasRail
            ? 'py-4 pl-5 pr-16'
            : 'p-4'
      }`}
    >
      {showSceneTitle && (
        <h2 className="mb-3 text-base font-bold text-[#e8e4d8]">
          {scene.title}
        </h2>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-2">
        {mainContent === 'flavor' && scene.flavorText ? (
          <FlavorText text={scene.flavorText} />
        ) : (
          <SceneDetails scene={scene} />
        )}
      </div>

      {hasRail && (
        <div
          aria-label="Инструменты сцены"
          className="absolute inset-y-0 right-3 w-10"
        >
          {scene.entranceReminder && (
            <div className="absolute top-3">
              <RailButton
                label="Напоминание при входе"
                active={reminderOpen}
                attention={!reminderStartsOpen && !reminderOpen}
                onClick={() => setReminderOpen((current) => !current)}
              >
                <BellRing className="size-4.5" />
              </RailButton>
            </div>
          )}

          {scene.flavorText && (
            <div className="absolute top-1/2 grid -translate-y-1/2 grid-rows-2 gap-1">
              <RailButton
                label="Вводный текст"
                active={mainContent === 'flavor'}
                onClick={() => setMainContent('flavor')}
              >
                <Feather className="size-4.5" />
              </RailButton>
              <RailButton
                label="Детали сцены"
                active={mainContent === 'details'}
                onClick={() => setMainContent('details')}
              >
                <List className="size-4.5" />
              </RailButton>
            </div>
          )}

          {hasMap && (
            <div className="absolute bottom-3">
              <RailButton
                label="Схема сцены"
                active={mapOpen}
                onClick={() => setMapOpen((current) => !current)}
              >
                <Map className="size-4.5" />
              </RailButton>
            </div>
          )}
        </div>
      )}

      {reminderOpen && scene.entranceReminder && (
        <aside className="absolute right-15 top-3 z-20 flex w-[min(27rem,calc(100%-5rem))] items-start gap-2 border border-[#9b7435] bg-[#2a2115] px-3 py-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.5)]">
          <BellRing className="mt-0.5 size-4 shrink-0 text-[#e0ae5e]" />
          <p className="min-w-0 flex-1 text-sm leading-5 text-[#f0e5cd]">
            {scene.entranceReminder}
          </p>
          <CloseButton
            label="Закрыть напоминание"
            onClick={() => setReminderOpen(false)}
          />
        </aside>
      )}

      {mapOpen && hasMap && (
        <aside className="absolute bottom-3 right-15 z-20 w-[min(21rem,calc(100%-5rem))] border border-[#4b5545] bg-[#172015] p-3 shadow-[0_12px_30px_rgba(0,0,0,0.5)]">
          <div className="mb-1 flex items-center">
            <span className="flex-1 text-xs font-bold text-[#e8e4d8]">
              Черновая схема
            </span>
            <CloseButton
              label="Закрыть схему"
              onClick={() => setMapOpen(false)}
            />
          </div>
          <BrazierHallSketch />
        </aside>
      )}
    </section>
  );
}

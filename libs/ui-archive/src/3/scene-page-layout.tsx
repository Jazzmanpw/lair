import {useState} from 'react';
import type {CreatureStatblock} from '@lair/domain-archive/legacy-creature';
import type {Scene, SceneMeta} from '@lair/domain-archive/legacy-scene';
import Fpo from './fpo.tsx';
import LegacyEncounterRunner from './legacy-encounter-runner.tsx';
import LegacyEncounterTab from './legacy-encounter-tab.tsx';
import ScenePreviewCard from './scene-preview-card.tsx';

export type LinkedSceneData = {
  meta: SceneMeta;
  creatureCount?: number;
  trapCount?: number;
};

export type ScenePageLayoutProps = {
  scene: Scene;
  linkedScenes?: LinkedSceneData[];
  statblocks?: Record<string, CreatureStatblock>;
};

type TabId = 'encounter' | 'skillChecks' | 'traps' | 'treasures';

type TabDef = {
  id: TabId;
  label: string;
  count: number;
};

export default function ScenePageLayout({
  scene,
  linkedScenes = [],
  statblocks = {},
}: ScenePageLayoutProps) {
  const {
    meta,
    flavorText,
    roomDescription,
    skillChecks,
    encounter,
    traps,
    treasures,
  } = scene;

  const tabs: TabDef[] = [
    ...(encounter
      ? [
          {
            id: 'encounter' as const,
            label: 'Encounter',
            count: encounter.creatures.length,
          },
        ]
      : []),
    ...(skillChecks.length > 0
      ? [
          {
            id: 'skillChecks' as const,
            label: 'Skills',
            count: skillChecks.length,
          },
        ]
      : []),
    ...(traps.length > 0
      ? [{id: 'traps' as const, label: 'Traps', count: traps.length}]
      : []),
    ...(treasures.length > 0
      ? [
          {
            id: 'treasures' as const,
            label: 'Treasures',
            count: treasures.length,
          },
        ]
      : []),
  ];

  const [activeTab, setActiveTab] = useState<TabId>(
    tabs[0]?.id ?? 'skillChecks',
  );
  const [isRunning, setIsRunning] = useState(false);

  const tabContent: Record<TabId, string> = {
    encounter: `Encounter — ${encounter?.threatLevel ?? ''} (${encounter?.creatures.length ?? 0} creature types)`,
    skillChecks: `Skill Checks (${skillChecks.length})`,
    traps: `Traps (${traps.length})`,
    treasures: `Treasures (${treasures.length})`,
  };

  return (
    <div className="grid grid-cols-[1fr_200px] grid-rows-[auto_1fr] h-screen bg-[#12170f] text-(--lair-text) font-(--lair-font) overflow-hidden">
      {/* Header zone */}
      <div className="flex gap-4 px-5 py-3.5 border-b border-[#2c3428] bg-[#172015]">
        {/* Left: title + flavor + room description */}
        <div className="flex-1 min-w-0">
          <div className="text-[11px] text-(--lair-text-dim) tracking-[0.06em] mb-[3px]">
            {meta.setting.label} › {meta.location.label}
          </div>
          <h1 className="m-0 text-xl font-bold text-[#e8e4d8] tracking-[0.02em]">
            {meta.title}
          </h1>
          <div className="grid grid-cols-[2fr_1fr]">
            <ul className="mt-2 mb-0 ml-0 pl-4 text-[13px] leading-relaxed text-(--lair-text) list-disc">
              {roomDescription.map((line) => (
                <li key={line} className="mb-0.5">
                  {line}
                </li>
              ))}
            </ul>
            <blockquote className="m-0 mt-1 ml-3 py-2 px-3 border-l-[3px] border-l-[#8b6c3e] italic text-[13px] leading-relaxed text-(--lair-text-dim) bg-[#1d231a] rounded-r-[3px]">
              {flavorText}
            </blockquote>
          </div>
        </div>

        {/* Right: tab strip */}
        <div className="flex flex-col gap-1 min-w-[110px]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id !== 'encounter') setIsRunning(false);
              }}
              className={`rounded-[3px] cursor-pointer text-[11px] font-semibold tracking-[0.04em] px-3 py-1.5 text-left font-(--lair-font) transition-all duration-150 ${
                activeTab === tab.id
                  ? 'bg-[#262e23] border border-[#8b6c3e] text-[#b8944a]'
                  : 'bg-transparent border border-[#2c3428] text-(--lair-text-dim) hover:border-[#384236]'
              }`}
            >
              {tab.label}
              <span
                className={`ml-1.5 text-[10px] ${activeTab === tab.id ? 'text-[#8b6c3e]' : 'text-[#4a4840]'}`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Sidebar rail — spans both rows */}
      <div className="row-span-full col-start-2 flex flex-col gap-2 p-3 border-l border-[#2c3428] bg-[#151c12] overflow-auto">
        <div className="text-[10px] font-semibold tracking-[0.1em] uppercase text-(--lair-text) py-1">
          Linked Scenes
        </div>
        {linkedScenes.map((ls) => (
          <ScenePreviewCard
            key={ls.meta.id}
            meta={ls.meta}
            creatureCount={ls.creatureCount}
            trapCount={ls.trapCount}
          />
        ))}
        <div className="flex-1" />
        <Fpo className="min-h-[120px] flex-1">Map</Fpo>
      </div>

      {/* Content area */}
      <div className="overflow-auto">
        {activeTab === 'encounter' && encounter && isRunning ? (
          <LegacyEncounterRunner
            encounter={encounter}
            statblocks={statblocks}
            onEnd={() => setIsRunning(false)}
          />
        ) : activeTab === 'encounter' && encounter ? (
          <LegacyEncounterTab
            encounter={encounter}
            statblocks={statblocks}
            onRun={() => setIsRunning(true)}
          />
        ) : (
          <div className="p-4 px-5">
            <Fpo className="h-full min-h-[300px]">{tabContent[activeTab]}</Fpo>
          </div>
        )}
      </div>
    </div>
  );
}

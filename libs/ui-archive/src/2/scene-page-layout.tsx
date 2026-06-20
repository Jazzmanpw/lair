import {useState} from 'react';
import type {Scene} from '@lair/domain-archive/legacy-scene';
import Fpo from './fpo.tsx';

export type ScenePageLayoutProps = {
  scene: Scene;
};

type TabId = 'encounter' | 'skillChecks' | 'traps' | 'treasures';

type TabDef = {
  id: TabId;
  label: string;
  count: number;
};

export default function ScenePageLayout({scene}: ScenePageLayoutProps) {
  const {
    meta,
    flavorText,
    roomDescription,
    skillChecks,
    encounter,
    traps,
    treasures,
    linkedSceneIds,
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
  const [showFlavor, setShowFlavor] = useState(false);
  const [showRoom, setShowRoom] = useState(false);

  const tabContent: Record<TabId, string> = {
    encounter: `Encounter — ${encounter?.threatLevel ?? ''} (${encounter?.creatures.length ?? 0} creature types)`,
    skillChecks: `Skill Checks (${skillChecks.length})`,
    traps: `Traps (${traps.length})`,
    treasures: `Treasures (${treasures.length})`,
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 200px',
        gridTemplateRows: 'auto 1fr',
        height: '100vh',
        background: '#12170f',
        color: 'var(--lair-text, #d4cbb8)',
        fontFamily: 'var(--lair-font, "Rubik", sans-serif)',
        overflow: 'hidden',
      }}
    >
      {/* Header zone */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          padding: '14px 20px',
          borderBottom: '1px solid #2c3428',
          background: '#172015',
        }}
      >
        {/* Left: title + collapsible text */}
        <div style={{flex: 1, minWidth: 0}}>
          <div
            style={{
              fontSize: '11px',
              color: 'var(--lair-text-dim, #7a7e88)',
              letterSpacing: '0.06em',
              marginBottom: '3px',
            }}
          >
            {meta.setting.label} › {meta.location.label}
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: 700,
              color: '#e8e4d8',
              letterSpacing: '0.02em',
            }}
          >
            {meta.title}
          </h1>

          <button
            type="button"
            onClick={() => setShowFlavor(!showFlavor)}
            style={{
              background: 'none',
              border: 'none',
              color: '#8b6c3e',
              cursor: 'pointer',
              fontSize: '12px',
              padding: '4px 0',
              fontFamily: 'inherit',
            }}
          >
            {showFlavor ? '▾' : '▸'} Flavor text
          </button>
          {showFlavor && (
            <p
              style={{
                margin: '4px 0 0 12px',
                fontSize: '13px',
                lineHeight: 1.5,
                color: 'var(--lair-text-dim, #7a7e88)',
                fontStyle: 'italic',
              }}
            >
              {flavorText}
            </p>
          )}

          <button
            type="button"
            onClick={() => setShowRoom(!showRoom)}
            style={{
              background: 'none',
              border: 'none',
              color: '#8b6c3e',
              cursor: 'pointer',
              fontSize: '12px',
              padding: '4px 0',
              display: 'block',
              fontFamily: 'inherit',
            }}
          >
            {showRoom ? '▾' : '▸'} Room description
          </button>
          {showRoom && (
            <ul
              style={{
                margin: '4px 0 0 12px',
                paddingLeft: '16px',
                fontSize: '13px',
                lineHeight: 1.5,
                color: 'var(--lair-text-dim, #7a7e88)',
              }}
            >
              {roomDescription.map((line) => (
                <li key={line} style={{marginBottom: '2px'}}>
                  {line}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right: tab strip */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            minWidth: '110px',
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? '#262e23' : 'transparent',
                border:
                  activeTab === tab.id
                    ? '1px solid #8b6c3e'
                    : '1px solid #2c3428',
                borderRadius: '3px',
                color:
                  activeTab === tab.id
                    ? '#b8944a'
                    : 'var(--lair-text-dim, #7a7e88)',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                padding: '6px 12px',
                textAlign: 'left',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
              }}
            >
              {tab.label}
              <span
                style={{
                  marginLeft: '6px',
                  color: activeTab === tab.id ? '#8b6c3e' : '#4a4840',
                  fontSize: '10px',
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Sidebar rail — spans both rows */}
      <div
        style={{
          gridRow: '1 / -1',
          gridColumn: '2',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          padding: '12px',
          borderLeft: '1px solid #2c3428',
          background: '#151c12',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--lair-text-dim, #7a7e88)',
            padding: '4px 0',
          }}
        >
          Linked Scenes
        </div>
        {linkedSceneIds.map((id) => (
          <Fpo key={id} style={{height: '64px', fontSize: '9px'}}>
            Scene: {id}
          </Fpo>
        ))}
        <div style={{flex: 1}} />
        <Fpo style={{minHeight: '120px', flex: 1}}>Map</Fpo>
      </div>

      {/* Content area */}
      <div style={{overflow: 'auto', padding: '16px 20px'}}>
        <Fpo style={{height: '100%', minHeight: '300px'}}>
          {tabContent[activeTab]}
        </Fpo>
      </div>
    </div>
  );
}

import {useState} from 'react';
import type {Encounter} from '@lair/domain/scene';
import Fpo from './fpo.tsx';

export type EncounterRunnerProps = {
  encounter: Encounter;
};

export default function EncounterRunner({encounter}: EncounterRunnerProps) {
  const creatureTabs = encounter.creatures.flatMap(({creature, count}) =>
    Array.from({length: count}, (_, i) => ({
      id: `${creature.id}-${i}`,
      label: count > 1 ? `${creature.label} ${i + 1}` : creature.label,
    })),
  );

  const [activeCreature, setActiveCreature] = useState(
    creatureTabs[0]?.id ?? '',
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#12170f',
        color: 'var(--lair-text, #d4cbb8)',
        fontFamily: 'var(--lair-font, "Rubik", sans-serif)',
        overflow: 'hidden',
      }}
    >
      {/* Metadata bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '10px 20px',
          background: '#172015',
          borderBottom: '1px solid #2c3428',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            padding: '3px 10px',
            borderRadius: '3px',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            background: '#2d2218',
            color: '#b8944a',
            border: '1px solid #8b6c3e',
          }}
        >
          {encounter.threatLevel}
        </span>
        <span
          style={{
            fontSize: '13px',
            fontStyle: 'italic',
            color: 'var(--lair-text-dim, #7a7e88)',
            flex: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {encounter.dramaticQuestion}
        </span>
      </div>

      {/* Creature tabs */}
      <div
        style={{
          display: 'flex',
          gap: '2px',
          padding: '0 20px',
          background: '#151c12',
          borderBottom: '1px solid #2c3428',
          overflow: 'auto',
          flexShrink: 0,
        }}
      >
        {creatureTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveCreature(tab.id)}
            style={{
              background: activeCreature === tab.id ? '#1d231a' : 'transparent',
              border: 'none',
              borderBottom:
                activeCreature === tab.id
                  ? '2px solid #5ca64c'
                  : '2px solid transparent',
              color:
                activeCreature === tab.id
                  ? '#e8e4d8'
                  : 'var(--lair-text-dim, #7a7e88)',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              padding: '10px 14px',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active creature detail + side zones */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 240px',
          overflow: 'hidden',
        }}
      >
        {/* Creature detail */}
        <div style={{overflow: 'auto', padding: '16px 20px'}}>
          <Fpo style={{height: '200px', marginBottom: '12px'}}>
            Creature Statblock —{' '}
            {creatureTabs.find((t) => t.id === activeCreature)?.label}
          </Fpo>
          <Fpo style={{height: '120px'}}>Creature Actions & Abilities</Fpo>
        </div>

        {/* Side zones */}
        <div
          style={{
            borderLeft: '1px solid #2c3428',
            overflow: 'auto',
            padding: '16px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <Fpo style={{height: '160px'}}>Condition Tracker</Fpo>
          <Fpo style={{flex: 1, minHeight: '120px'}}>
            Passive Event Reminders
          </Fpo>
        </div>
      </div>
    </div>
  );
}

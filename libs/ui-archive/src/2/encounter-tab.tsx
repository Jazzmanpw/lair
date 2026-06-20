import type {Encounter} from '@lair/domain-archive/legacy-scene';
import Fpo from './fpo.tsx';

export type EncounterTabProps = {
  encounter: Encounter;
};

export default function EncounterTab({encounter}: EncounterTabProps) {
  return (
    <div
      style={{
        fontFamily: 'var(--lair-font, "Rubik", sans-serif)',
        color: 'var(--lair-text, #d4cbb8)',
        padding: '20px',
      }}
    >
      {/* Threat badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '3px',
            fontSize: '11px',
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
      </div>

      {/* Dramatic question */}
      <blockquote
        style={{
          margin: '0 0 16px',
          padding: '10px 16px',
          borderLeft: '3px solid #8b6c3e',
          fontStyle: 'italic',
          fontSize: '14px',
          color: 'var(--lair-text-dim, #7a7e88)',
          background: '#1d231a',
          borderRadius: '0 3px 3px 0',
        }}
      >
        {encounter.dramaticQuestion}
      </blockquote>

      {/* Conflict sources */}
      {encounter.conflictSources.length > 0 && (
        <ul
          style={{
            margin: '0 0 16px',
            paddingLeft: '20px',
            fontSize: '13px',
            lineHeight: 1.6,
            color: 'var(--lair-text-dim, #7a7e88)',
          }}
        >
          {encounter.conflictSources.map((src) => (
            <li key={src} style={{marginBottom: '2px'}}>
              {src}
            </li>
          ))}
        </ul>
      )}

      {/* Creature list */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          marginBottom: '20px',
        }}
      >
        {encounter.creatures.map(({creature, count}) => (
          <div
            key={creature.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              background: '#1e2e20',
              borderRadius: '3px',
              border: '1px solid #2d3d2e',
              fontSize: '13px',
            }}
          >
            <span
              style={{
                fontWeight: 700,
                color: 'var(--lair-text, #d4cbb8)',
                cursor: 'pointer',
                borderBottom: '1px dashed #5ca64c',
              }}
            >
              {creature.label}
            </span>
            <span
              style={{
                color: '#5ca64c',
                fontSize: '11px',
                fontWeight: 600,
              }}
            >
              ×{count}
            </span>
          </div>
        ))}
      </div>

      {/* Run button */}
      <button
        type="button"
        style={{
          display: 'block',
          width: '100%',
          padding: '12px',
          background: '#2a4a2c',
          border: '1px solid #5ca64c',
          borderRadius: '4px',
          color: '#7dd868',
          fontSize: '14px',
          fontWeight: 700,
          fontFamily: 'inherit',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Run!
      </button>

      {/* Tactical notes FPO */}
      <Fpo style={{height: '120px'}}>Tactical notes / encounter map</Fpo>
    </div>
  );
}

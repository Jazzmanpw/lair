import type {CSSProperties} from 'react';
import type {Encounter} from '@lair/domain/scene';
import Fpo from './fpo.tsx';

export type EncounterSummaryProps = {
  encounter: Encounter;
  compact?: boolean;
};

const badgeColors: Record<string, {bg: string; fg: string}> = {
  low: {bg: '#e8f0dc', fg: '#4a6b2a'},
  mid: {bg: '#faecd4', fg: '#8b5e1a'},
  high: {bg: '#f5dcd8', fg: '#9b2c1c'},
};

function threatTier(level: string) {
  const lower = level.toLowerCase();
  if (lower.includes('низк') || lower.includes('low')) return 'low';
  if (lower.includes('выс') || lower.includes('high')) return 'high';
  return 'mid';
}

export default function EncounterSummary({
  encounter,
  compact = false,
}: EncounterSummaryProps) {
  const tier = threatTier(encounter.threatLevel);
  const colors = badgeColors[tier] ?? badgeColors.mid;

  const badgeStyle: CSSProperties = {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '2px',
    fontSize: '11px',
    fontFamily: '"Cinzel", Georgia, serif',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    background: colors.bg,
    color: colors.fg,
    border: `1px solid ${colors.fg}33`,
  };

  const headerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: compact ? '8px' : '16px',
  };

  const sectionTitle: CSSProperties = {
    fontFamily: '"Cinzel", Georgia, serif',
    fontSize: compact ? '14px' : '16px',
    fontWeight: 600,
    letterSpacing: '0.04em',
    color: '#2c1810',
  };

  return (
    <div
      style={{
        fontFamily: '"Crimson Text", "Times New Roman", serif',
        color: '#2c1810',
        padding: compact ? '12px' : '20px',
        background: '#fdfaf2',
        border: '1px solid #d4c9a8',
        borderRadius: '4px',
      }}
    >
      <div style={headerStyle}>
        <span style={badgeStyle}>{encounter.threatLevel}</span>
        <span style={sectionTitle}>Encounter</span>
      </div>

      {!compact && (
        <blockquote
          style={{
            margin: '0 0 16px',
            padding: '10px 16px',
            borderLeft: '3px solid #c4a96a',
            fontStyle: 'italic',
            fontSize: '15px',
            color: '#5a4a3a',
            background: '#faf6ee',
          }}
        >
          {encounter.dramaticQuestion}
        </blockquote>
      )}

      {!compact && encounter.conflictSources.length > 0 && (
        <ul
          style={{
            margin: '0 0 16px',
            paddingLeft: '20px',
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#4a3a2a',
          }}
        >
          {encounter.conflictSources.map((src) => (
            <li key={src}>{src}</li>
          ))}
        </ul>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          marginBottom: compact ? '8px' : '16px',
        }}
      >
        {encounter.creatures.map(({creature, count}) => (
          <div
            key={creature.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 10px',
              background: '#f5ecd7',
              borderRadius: '2px',
              fontSize: '14px',
            }}
          >
            <span
              style={{
                fontWeight: 600,
                color: '#6b3a1a',
                cursor: 'pointer',
                borderBottom: '1px dashed #c4a96a',
              }}
            >
              {creature.label}
            </span>
            <span style={{color: '#96783a', fontSize: '12px'}}>×{count}</span>
            {!compact && (
              <Fpo
                style={{
                  marginLeft: 'auto',
                  height: '20px',
                  width: '60px',
                  fontSize: '8px',
                  padding: '2px',
                }}
              >
                Preview
              </Fpo>
            )}
          </div>
        ))}
      </div>

      {!compact && (
        <Fpo style={{height: '80px'}}>Tactical notes / encounter map</Fpo>
      )}
    </div>
  );
}

import type {SceneMeta} from '@lair/domain-archive/legacy-scene';
import Fpo from './fpo.tsx';

export type ScenePreviewCardProps = {
  meta: SceneMeta;
  creatureCount?: number;
  trapCount?: number;
};

export default function ScenePreviewCard({
  meta,
  creatureCount = 0,
  trapCount = 0,
}: ScenePreviewCardProps) {
  const counts = [
    creatureCount > 0 ? `${creatureCount} creatures` : 'No creatures',
    trapCount > 0 ? `${trapCount} traps` : null,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <div
      style={{
        width: '240px',
        fontFamily: '"Crimson Text", "Times New Roman", serif',
        color: '#2c1810',
        background: '#faf6ee',
        border: '1px solid #d4c9a8',
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(44, 24, 16, 0.08)',
      }}
    >
      <Fpo style={{height: '48px', borderRadius: 0, border: 'none'}}>
        Thumbnail
      </Fpo>

      <div style={{padding: '12px 14px'}}>
        <div
          style={{
            fontFamily: '"Cinzel", Georgia, serif',
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '4px',
            letterSpacing: '0.02em',
          }}
        >
          {meta.title}
        </div>

        <div
          style={{
            fontSize: '12px',
            color: '#8b7355',
            marginBottom: '8px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {meta.setting.label} › {meta.location.label}
        </div>

        {(creatureCount > 0 || trapCount > 0) && (
          <div
            style={{
              fontSize: '12px',
              color: '#6b5b47',
              marginBottom: '8px',
            }}
          >
            {counts}
          </div>
        )}

        <Fpo style={{height: '24px', fontSize: '9px'}}>Connection type</Fpo>
      </div>
    </div>
  );
}

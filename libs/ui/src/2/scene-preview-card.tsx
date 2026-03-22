import type {SceneMeta} from '@lair/domain/scene';

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
  return (
    <div
      style={{
        width: '200px',
        background: '#1d231a',
        border: '1px solid #2c3428',
        borderRadius: '4px',
        padding: '10px 12px',
        cursor: 'pointer',
        fontFamily: 'var(--lair-font, "Rubik", sans-serif)',
        color: 'var(--lair-text, #d4cbb8)',
        transition: 'border-color 0.15s',
      }}
    >
      <div
        style={{
          fontSize: '13px',
          fontWeight: 700,
          color: '#e8e4d8',
          marginBottom: '3px',
        }}
      >
        {meta.title}
      </div>
      <div
        style={{
          fontSize: '11px',
          color: 'var(--lair-text-dim, #7a7e88)',
          marginBottom: creatureCount > 0 || trapCount > 0 ? '6px' : 0,
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
            display: 'flex',
            gap: '10px',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {creatureCount > 0 && (
            <span style={{color: '#b8944a'}}>
              {creatureCount} creature{creatureCount !== 1 ? 's' : ''}
            </span>
          )}
          {trapCount > 0 && (
            <span style={{color: '#8b6c3e'}}>
              {trapCount} trap{trapCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

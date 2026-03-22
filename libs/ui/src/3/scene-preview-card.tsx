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
  const hasCounts = creatureCount > 0 || trapCount > 0;

  return (
    <div className="w-full bg-[#1d231a] border border-[#2c3428] rounded p-2.5 px-3 cursor-pointer font-(--lair-font) text-(--lair-text) transition-[border-color] duration-150 hover:border-[#8b6c3e]">
      <div className="text-[13px] font-bold text-[#e8e4d8] mb-0.5">
        {meta.title}
      </div>
      <div
        className={`text-[11px] text-(--lair-text-dim) whitespace-nowrap overflow-hidden text-ellipsis ${hasCounts ? 'mb-1.5' : ''}`}
      >
        {meta.setting.label} › {meta.location.label}
      </div>
      {hasCounts && (
        <div className="flex gap-2.5 text-[10px] font-semibold tracking-[0.04em] uppercase">
          {creatureCount > 0 && (
            <span className="text-[#5ca64c]">
              {creatureCount} creature{creatureCount !== 1 ? 's' : ''}
            </span>
          )}
          {trapCount > 0 && (
            <span className="text-[#8b6c3e]">
              {trapCount} trap{trapCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

import type {CSSProperties, ReactNode} from 'react';

export type FpoProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function Fpo({
  children = 'For placement only',
  className = '',
  style,
}: FpoProps) {
  return (
    <div
      className={`flex items-center justify-center bg-[#1d231a] text-(--lair-text-dim) text-[10px] font-semibold tracking-[0.14em] uppercase border-[1.5px] border-dashed border-[#384236] rounded-[3px] p-3 min-h-10 ${className}`}
      style={{
        backgroundImage: `repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 10px,
          rgba(139, 108, 62, 0.05) 10px,
          rgba(139, 108, 62, 0.05) 11px
        )`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

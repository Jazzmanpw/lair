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
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 10px,
            rgba(139, 108, 62, 0.05) 10px,
            rgba(139, 108, 62, 0.05) 11px
          ),
          #1d231a
        `,
        color: 'var(--lair-text-dim, #7a7e88)',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        border: '1.5px dashed #384236',
        borderRadius: '3px',
        padding: '12px',
        minHeight: '40px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
